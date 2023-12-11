/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [user, setUser] = useState({
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        level: "1",
    });

    useEffect(() => {
        const getUser = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/rdpUtilities/user")
                .then((res) => res.json())
                .then((data) => {
                    setUser(data.data);
                });
        };
        getUser();
    }, []);

    return (
        <>
            <header>
                <h1>Dashboard</h1>
                <a className="bg-primary rounded-[50%] p-[5px] text-white border-2 border-primary hover:text-primary hover:bg-white">
                    {user.firstName[0].toUpperCase()}
                    {user.lastName[0].toUpperCase()}
                </a>
            </header>
            <main></main>
        </>
    );
}
