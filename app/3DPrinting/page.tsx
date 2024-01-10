"use client";
import Header from "@/components/3DPrinting/header";
import { useEffect, useState } from "react";

export default function Page() {
    const [user, setUser] = useState();

    useEffect(() => {
        const getUser = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/user")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setUser(data.data);
                    }
                });
        };
        getUser();
    }, []);

    return (
        <>
            <Header user={user} />
            <main></main>
        </>
    );
}
