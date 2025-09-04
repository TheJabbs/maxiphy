import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../prisma/prisma.service';
import {CreateTasksDto} from './dto/CreateTasks.dto';
import {UpdateTasksDto} from './dto/UpdateTasks.dto';
import {ResponseInterface} from '../../shared/interface/ResponseInterface';
import {GetTasks} from './interface/GetTasks';
import {toGetTask} from './util/toGetTask.parser';
import {AuthUser} from "../../auth/interface/AuthUser";
import {priorityTask} from "./util/priorityTask";

@Injectable()
export class TasksService {
    constructor(private readonly prisma: PrismaService) {
    }

    async create(data: CreateTasksDto, user: AuthUser): Promise<ResponseInterface> {
        const validation = this.validate(data);

        if (!validation.success) {
            return {success: false, message: validation.message};
        }

        const record = await this.prisma.tasks.create({
            data: {...data, userId: user.userId},
        });

        return {success: true, message: '{Name} created successfully', data: toGetTask(record)};
    }

    async update(
        id: number,
        data: UpdateTasksDto,
        user: AuthUser
    ): Promise<ResponseInterface> {
        const existingTask = await this.prisma.tasks.findUnique({
            where: {taskId: id},
        });

        if (!existingTask) {
            return {success: false, message: `Task with ID ${id} not found`};
        }

        const validation = this.validate(data, toGetTask(existingTask));
        if (!validation.success) {
            return {success: false, message: validation.message};
        }

        const record = await this.prisma.tasks.update({
            where: {
                taskId: id,
                ...(user.userId === 0 ? undefined : {userId: user.userId}),
            },
            data,
        });

        return {success: true, message: '{Name} updated successfully', data: toGetTask(record)};
    }


    async findAll(
        user: AuthUser,
        page ?: number,
        limit ?: number
    ): Promise<{
        data: GetTasks[];
        success: boolean;
        meta: { total: number; limit: number; totalPages: number; page: number };
        message: string
    }> {
        const skip = (page - 1) * limit;

        const records = await this.prisma.tasks.findMany({
            where: user.userId === 0 ? undefined : {userId: user.userId},
            skip,
            take: limit || undefined,
            orderBy: {taskCreation: 'desc'},
        });

        const total = await this.prisma.tasks.count({
            where: user.userId === 0 ? undefined : {userId: user.userId},
        });

        return {
            success: true,
            message: '{Name} list retrieved successfully',
            data: records.map(toGetTask),
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }


    async findOne(id: number, user: AuthUser): Promise<ResponseInterface<GetTasks>> {
        const record = await this.prisma.tasks.findUnique({
            where: {
                taskId: id,
                ...(user.userId === 0 ? undefined : {userId: user.userId})
            }
        });
        if (!record) {
            return {success: false, message: `{Name} with ID ${id} not found`};
        }
        return {success: true, message: '{Name} retrieved successfully', data: toGetTask(record)};
    }

    async remove(id: number, user: AuthUser): Promise<ResponseInterface> {
        await this.prisma.tasks.delete({
            where: {
                taskId: id,
                ...(user.userId === 0 ? undefined : {userId: user.userId})
            }
        });
        return {success: true, message: '{Name} deleted successfully'};
    }

    async findAllSorted(user: AuthUser) {
        const record = await this.findAll(user);
        let recordSorted: GetTasks[];

        if (record.success && record.data) {
            recordSorted = priorityTask(record.data)
        }

        return {
            success: true,
            message: 'Tasks sorted successfully',
            data: recordSorted
        };
    }

    async findAllClassified(user: AuthUser) {
        const recordFinishPromise = this.prisma.tasks.findMany({
            where: {
                userId: user.userId,
                taskAccomplished: {
                    not: null
                }
            }
        })

        const recordLatePromise = this.prisma.tasks.findMany({
            where: {
                userId: user.userId,
                taskAccomplished: null,
                taskFinish: {
                    lt: new Date()
                }
            }
        })

        const recordOnTrackPromise = this.prisma.tasks.findMany({
            where: {
                userId: user.userId,
                taskAccomplished: null,
                taskFinish: {
                    gte: new Date()
                }
            }
        })

        const [recordFinish, recordLate, recordOnTrack] = await Promise.all([recordFinishPromise, recordLatePromise, recordOnTrackPromise])

        return {
            success: true,
            message: 'Tasks classified successfully',
            data: {
                finished: recordFinish.map(toGetTask),
                late: recordLate.map(toGetTask),
                onTrack: recordOnTrack.map(toGetTask)
            }
        }
    }

    //-------------------------------------------------------------------------------------------------------------
    validate(dto: CreateTasksDto | UpdateTasksDto, data?: GetTasks) {
        if (!data && typeof dto.progress === 'undefined') {
            return {
                success: false,
                message: 'Invalid input: progress is required when creating a task',
            };
        }

        const progress = dto.progress ?? data?.progress ?? null;
        const progressMax = dto.progressMax ?? data?.progressMax ?? null;

        if (data?.taskAccomplished && dto.progress !== undefined) {
            return {
                success: false,
                message: 'Cannot update progress after task is accomplished',
            };
        }

        if (progress !== null && progressMax !== null) {
            if (progress > progressMax) {
                return { success: false, message: 'Progress cannot exceed Progress Max' };
            }

            if (progress === progressMax && !dto.taskAccomplished) {
                dto.taskAccomplished = new Date();
            }
        }

        if (dto.taskStart && dto.taskFinish && dto.taskStart > dto.taskFinish) {
            return {
                success: false,
                message: 'Task Start cannot be after Task Finish',
            };
        }

        if (
            data &&
            dto.progress !== undefined &&
            dto.progress !== data.progress
        ) {
            dto.lastProgress = new Date();
        }

        return { success: true };
    }
}
