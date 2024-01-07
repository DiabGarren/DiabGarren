"use client";
import Header from "@/components/rdpUtilites/header";
import Spinner from "@/components/rdpUtilites/spinner";
import { useEffect, useState } from "react";

export default function Bishopric() {
    const [user, setUser] = useState({
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        level: 1,
    });
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/rdpUtilities/user")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "fail") {
                        window.location.href = "/rdpUtilities/";
                    }
                    setUser(data.data);
                });
        };
        getUser();
        setConnected(true);
    }, []);

    return (
        <>
            <Header
                title={"Bishopric"}
                user={user}
            />
            <main className="w-[770px] mx-auto mt-[25px]">{connected ? "page" : <Spinner />}</main>
        </>
    );
}
