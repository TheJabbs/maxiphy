export interface GetTasks {
    taskId: number;
    taskName: string;
    taskDescription?: string | null;
    taskPinned: boolean;
    taskPriority: number;
    taskCreation: Date;
    taskStart: Date;
    taskFinish?: Date | null;
    progressMax?: number | null;
    progress?: number | null;
    taskAccomplished?: Date | null;
    lastProgress?: Date | null;
}
