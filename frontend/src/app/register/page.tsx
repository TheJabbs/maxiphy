"use client";

import { useMutation } from "@tanstack/react-query";
import { register } from "@/services/auth";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");      // 👈 phone state
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const mutation = useMutation({
        mutationFn: () => register(name, email, phone, password),
        onSuccess: (data) => {
            localStorage.setItem("token", data.accessToken);
            window.location.href = "/tasks";
        },
        onError: (e: any) => {
            setError(e?.response?.data?.message || "Registration failed");
        },
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setError(null);
                    // (optional) quick client-side check
                    if (!phone.trim()) {
                        setError("Phone number is required");
                        return;
                    }
                    mutation.mutate();
                }}
                className="p-6 bg-white rounded shadow-md space-y-4 w-80"
            >
                <h1 className="text-xl font-bold text-center">Register</h1>

                {error && (
                    <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                        {error}
                    </div>
                )}

                <input
                    type="text"
                    placeholder="Name"
                    className="w-full border p-2 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="tel"
                    placeholder="Phone (e.g. +15551234567)"
                    className="w-full border p-2 rounded"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-2 rounded"
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? "Registering..." : "Register"}
                </button>

                <div className="text-center">
                    <p className="text-sm text-gray-500">Already have an account?</p>
                    <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                        Back to Login
                    </Link>
                </div>
            </form>
        </div>
    );
}
