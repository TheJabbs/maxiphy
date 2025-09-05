"use client";

import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/auth";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const mutation = useMutation({
        mutationFn: () => login(email, password),
        onSuccess: (data) => {
            localStorage.setItem("token", data.accessToken);
            window.location.href = "/tasks";
        },
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    mutation.mutate();
                }}
                className="p-6 bg-white rounded shadow-md space-y-4 w-80"
            >
                <h1 className="text-xl font-bold text-center">Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded"
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? "Logging in..." : "Login"}
                </button>

                {/* 🔹 Register Button */}
                <div className="text-center">
                    <p className="text-sm text-gray-500">Don’t have an account?</p>
                    <Link
                        href="/register"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Register here
                    </Link>
                </div>
            </form>
        </div>
    );
}
