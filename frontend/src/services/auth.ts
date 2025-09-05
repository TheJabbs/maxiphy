import api from "@/lib/api";

export async function login(userEmail: string, userPassword: string) {
    const res = await api.post("/auth/login", { userEmail, userPassword });
    return res.data;
}

export async function register(userName: string, userEmail: string, userPassword: string, userPhone : string) {
    const res = await api.post("/auth/register", { userName, userEmail, userPassword, userPhone });
    return res.data;
}
