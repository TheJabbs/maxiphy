"use client";

import Link from "next/link";
import TaskList from "@/component/TaskList";

export default function TasksPage() {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Your Tasks</h1>
                <Link
                    href="/tasks/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Create Task
                </Link>
            </div>
            <TaskList />
        </div>
    );
}
