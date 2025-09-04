import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../prisma/prisma.service';
import {CreateErrorLogging} from "./interface/CreateErrorLogging";

@Injectable()
export class ErrorLoggingService {
    constructor(private readonly prisma: PrismaService) {
    }

    async logError(log: CreateErrorLogging): Promise<void> {
        await this.prisma.errorLog.create({
            data: log
        })
    }
}