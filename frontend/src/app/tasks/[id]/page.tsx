"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CreateTaskForm from "@/component/TaskCreateForm";

export default function EditTaskPage() {
    const params = useParams();
    const taskId = params?.id;
    const router = useRouter();
    const [taskData, setTaskData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!taskId) return;
        fetch(`http://localhost:4000/tasks/${taskId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setTaskData(data.data);
                setLoading(false);
            });
    }, [taskId]);

    if (loading) return <div>Loading task...</div>;
    if (!taskData) return <div>Task not found</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
            <CreateTaskForm initialData={taskData} />
        </div>
    );
}
