export function priorityTask(data: any[]): any[] {
    return data.sort((a, b) => {
        if (a.taskPinned && !b.taskPinned) return -1;
        if (!a.taskPinned && b.taskPinned) return 1;
        if (a.taskPriority !== b.taskPriority) return a.taskPriority - b.taskPriority;
        return new Date(a.taskCreation).getTime() - new Date(b.taskCreation).getTime();
    });
}