"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface CreateTaskFormProps {
    initialData?: any;
}

export default function CreateTaskForm({ initialData }: CreateTaskFormProps) {
    const [form, setForm] = useState({
        taskName: initialData?.taskName || "",
        taskDescription: initialData?.taskDescription || "",
        taskPinned: initialData?.taskPinned || false,
        taskPriority: initialData?.taskPriority || 1,
        taskStart: initialData?.taskStart?.slice(0, 16) || "",
        taskFinish: initialData?.taskFinish?.slice(0, 16) || "",
        progressMax: initialData?.progressMax || 100,
        progress: initialData?.progress || 0,
        taskAccomplished: initialData?.taskAccomplished?.slice(0, 16) || "",
        lastProgress: initialData?.lastProgress?.slice(0, 16) || "",
    });

    const mutation = useMutation({
        mutationFn: async () => {
            const url = initialData ? `/tasks/${initialData.taskId}` : "/tasks";
            const method = initialData ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error("Failed to save task");
            return res.json();
        },
        onSuccess: () => alert(`Task ${initialData ? "updated" : "created"} successfully!`),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement; // Explicitly cast to HTMLInputElement
        const { name, value, type, checked } = target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate();
            }}
            className="space-y-4"
        >
            <input
                type="text"
                name="taskName"
                placeholder="Task Name"
                value={form.taskName}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
            />

            <textarea
                name="taskDescription"
                placeholder="Task Description"
                value={form.taskDescription}
                onChange={handleChange}
                className="border p-2 rounded w-full"
            />

            <label className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    name="taskPinned"
                    checked={form.taskPinned}
                    onChange={handleChange}
                />
                <span>Pinned</span>
            </label>

            <input
                type="number"
                name="taskPriority"
                placeholder="Priority"
                value={form.taskPriority}
                onChange={handleChange}
                className="border p-2 rounded w-full"
            />

            <label>Start Date:</label>
            <input
                type="datetime-local"
                name="taskStart"
                value={form.taskStart}
                onChange={handleChange}
                className="border p-2 rounded w-full"
            />

            <label>Finish Date:</label>
            <input
                type="datetime-local"
                name="taskFinish"
                value={form.taskFinish}
                onChange={handleChange}
                className="border p-2 rounded w-full"
            />

            {/* Progress Section (optional) */}
            {(form.progressMax !== undefined || form.progress !== undefined) && (
                <>
                    <label>Progress:</label>
                    <input
                        type="number"
                        name="progress"
                        value={form.progress}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        min={0}
                        max={form.progressMax || 100}
                    />

                    <label>Progress Max:</label>
                    <input
                        type="number"
                        name="progressMax"
                        value={form.progressMax}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        min={1}
                    />

                    {form.progressMax && (
                        <Progress
                            value={(form.progress / form.progressMax) * 100}
                            className="h-2 rounded"
                        />
                    )}
                </>
            )}


            {form.progressMax && (
                <Progress value={(form.progress / form.progressMax) * 100} className="h-2 rounded" />
            )}

            <label>Accomplished Date:</label>
            <input
                type="datetime-local"
                name="taskAccomplished"
                value={form.taskAccomplished}
                onChange={handleChange}
                className="border p-2 rounded w-full"
            />

            <label>Last Progress Date:</label>
            <input
                type="datetime-local"
                name="lastProgress"
                value={form.lastProgress}
                onChange={handleChange}
                className="border p-2 rounded w-full"
            />

            <Button type="submit">{initialData ? "Update Task" : "Create Task"}</Button>
        </form>
    );
}
