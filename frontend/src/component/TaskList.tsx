"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import api from "@/lib/api"; // your fetch wrapper with JWT token

interface Task {
    taskId: number;
    taskName: string;
    taskDescription?: string;
    taskPinned: boolean;
    taskPriority: number;
    progressMax?: number;
    progress?: number;
}

export default function TaskList() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const res = await api.get("/tasks");
            if (res.status !== 200) throw new Error("Failed to fetch tasks");
            return res.data; // Access the response data directly
        },
    });

    if (isLoading) return <div>Loading tasks...</div>;
    if (error) return <div>Error loading tasks</div>;

    return (
        <div className="space-y-4">
            {data.data.map((task: Task) => (
                <Link key={task.taskId} href={`/tasks/${task.taskId}`}>
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg">{task.taskName}</h3>
                                {task.taskPinned && (
                                    <span className="text-sm bg-yellow-300 text-yellow-800 px-2 py-1 rounded">
                    Pinned
                  </span>
                                )}
                            </div>

                            {task.taskDescription && <p className="mt-2">{task.taskDescription}</p>}

                            {task.progressMax && task.progress !== undefined && (
                                <div className="mt-2">
                                    <Progress
                                        value={(task.progress / task.progressMax) * 100}
                                        className="h-2 rounded"
                                    />
                                    <div className="text-sm mt-1">
                                        {task.progress} / {task.progressMax}
                                    </div>
                                </div>
                            )}

                            <div className="text-sm text-gray-500 mt-2">
                                Priority: {task.taskPriority}
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
