"use client";

import Header from "@/components/rdpUtilites/header";
import Spinner from "@/components/rdpUtilites/spinner";
import { useEffect, useState } from "react";

export default function Login() {
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [connected, setConnected] = useState(false);

    const logIn = async (event: any) => {
        event.preventDefault();
        let email = "";
        if (username.includes("@")) {
            email = username;
            setUsername("");
        }

        const res = await fetch(
            process.env.NEXT_PUBLIC_API_URL + "/rdpUtilities/users/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                }),
            }
        );
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
        setConnected(true);
    }, []);

    const page = (
        <form onSubmit={logIn}>
            <h3 className="text-warning">{error}</h3>
            <h3>Username/Email</h3>
            <input
                onChange={(event) =>
                    setUsername(event.target.value.toLowerCase())
                }
                type="text"
            />
            <h3 className="mt-[10px]">Password</h3>
            <input
                onChange={(event) => setPassword(event.target.value)}
                type="password"
            />
            <a>Forgot password?</a>
            <input
                className="w-[100%] bg-green hover:bg-green-light text-white hover:text-green border-green py-[5px] rounded mt-[10px]"
                type="submit"
                value="Login"
            />
        </form>
    );

    return (
        <>
            <Header title={"Login"} />
            <main className="w-[350px] mx-auto mt-[25px]">
                {connected ? page : <Spinner />}
            </main>
        </>
    );
}
