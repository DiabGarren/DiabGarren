"use client";
import Header from "@/components/3DPrinting/header";
import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const login = async (event: any) => {
        event.preventDefault();

        if (username.includes("@")) {
            setEmail(username);
            setUsername("");
        }

        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        });
        console.log(res);

        const data = await res.json();

        if (data.status === "error") setError(data.message);
        else window.location.href = "/3DPrinting";
    };

    return (
        <>
            <Header title="Login" />
            <main className="w-[400px] mx-auto">
                <form
                    onSubmit={login}
                    className="mt-[50px] shadow-2xl rounded-lr p-[20px]">
                    <p className="text-print-red text-[1.1rem]">{error}</p>
                    <label>Username/Email</label>
                    <input
                        type="text"
                        name="usernameEmail"
                        className="form-input"
                        placeholder="Username/Email"
                        onChange={(event) => setUsername(event.target.value.toLowerCase())}
                        required
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-input"
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    <a className="block text-print-blue-dark hover:underline cursor-pointer">
                        Forgot password?
                    </a>
                    <button
                        type="submit"
                        className="form-button">
                        Login
                    </button>
                    <p>
                        Don&apos;t have an account?{" "}
                        <a
                            href="/3DPrinting/register"
                            className="text-print-blue-dark hover:underline cursor-pointer">
                            Sign Up
                        </a>
                    </p>
                </form>
            </main>
        </>
    );
}
