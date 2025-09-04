import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ErrorLoggingService } from '../core/ErrorLogging/ErrorLogging.service';
import { CreateErrorLogging } from '../core/ErrorLogging/interface/CreateErrorLogging';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(private readonly errorLoggingService: ErrorLoggingService) {}

    async catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let errorDetails: any = null;

        // Handle NestJS HttpExceptions
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message;
        }
        else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
            if (exception.code === 'P2002') {
                status = HttpStatus.CONFLICT;
                const target = exception.meta?.target as string[] | undefined;
                message = `Unique constraint violation on: ${target?.join(', ') || 'unknown field'}`;
                errorDetails = { code: exception.code, target };
            } else {
                status = HttpStatus.BAD_REQUEST;
                message = 'Database error';
                errorDetails = { code: exception.code };
            }
        }

        const errorResponse = {
            success: false,
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
            error: errorDetails,
        };

        const log: CreateErrorLogging = {
            service: 'GlobalExceptionFilter',
            method: request.method,
            message: exception.message,
            metadata: JSON.stringify({
                url: request.url,
                body: request.body,
                stack: exception.stack,
            }),
        };
        await this.errorLoggingService.logError(log);

        response.status(status).json(errorResponse);
    }
}
