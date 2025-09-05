import api from "@/lib/api";

export async function getTasks(page = 1, limit = 10) {
    const res = await api.get(`/tasks?page=${page}&limit=${limit}`);
    return res.data;
}

export async function createTask(task: any) {
    const res = await api.post("/tasks", task);
    return res.data;
}

export async function updateTask(id: number, task: any) {
    const res = await api.put(`/tasks/${id}`, task);
    return res.data;
}

export async function deleteTask(id: number) {
    const res = await api.delete(`/tasks/${id}`);
    return res.data;
}
