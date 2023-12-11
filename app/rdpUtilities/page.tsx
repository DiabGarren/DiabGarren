"use client";

import { useEffect, useState } from "react";

export default function Login() {
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const logIn = async () => {
        let email = "";
        if (username.includes("@")) {
            email = username;
            setUsername("");
        }

        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/rdpUtilities/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        });
        const data = await res.json();

        if (data.status === "error") setError(data.message);
        else window.location.href = "/rdpUtilities/dashboard";
    };

    useEffect(() => {
        const getUser = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/rdpUtilities/user")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        window.location.href = "/rdpUtilities/dashboard";
                    }
                });
        };
        getUser();
    }, []);

    return (
        <>
            <header>
                <h1>Login</h1>
            </header>
            <main className="w-[350px] mx-auto">
                <h3 className="text-warning">{error}</h3>
                <h3>Username/Email</h3>
                <input
                    onChange={(event) => setUsername(event.target.value)}
                    type="text"
                />
                <h3>Password</h3>
                <input
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                />
                <a>Forgot password?</a>
                <button
                    className="w-[100%] bg-green border-green hover:text-green"
                    onClick={logIn}>
                    Login
                </button>
            </main>
        </>
    );
}
