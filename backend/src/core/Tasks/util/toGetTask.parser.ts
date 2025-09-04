import { GetTasks } from '../interface/GetTasks';
import { Tasks } from '@prisma/client';

export function toGetTask(task: Tasks): GetTasks {
    return {
        taskId: task.taskId,
        taskName: task.taskName,
        taskDescription: task.taskDescription,
        taskPinned: task.taskPinned ?? false,
        taskPriority: task.taskPriority ?? 10,
        taskCreation: task.taskCreation,
        taskStart: task.taskStart,
        taskFinish: task.taskFinish,
        progressMax: task.progressMax,
        progress: task.progress ,
        taskAccomplished: task.taskAccomplished,
        lastProgress: task.lastProgress,
    };
}
