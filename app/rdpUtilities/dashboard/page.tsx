/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Header from "@/components/rdpUtilites/header";
import Spinner from "@/components/rdpUtilites/spinner";
import { useEffect, useState } from "react";

export default function Dashboard() {
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

    const buttons = [];
    if (user.level) {
        if (user.level >= 2) {
            buttons.push({ name: "Ward Council", value: "wardCouncil" });
            if (user.level >= 3) {
                buttons.push({ name: "Youth", value: "youth" });
                if (user.level >= 4) {
                    buttons.push(
                        { name: "Bishopric", value: "bishopric" },
                        { name: "Sacrament", value: "sacrament" }
                    );
                }
            }
        }
        buttons.sort((a, b) => {
            if (a.name > b.name) return 1;
            else return -1;
        });
    }
    const page = (
        <>
            <div className="w-[350px]">
                <h2>Resources</h2>
                {buttons.map((button: any) => {
                    return (
                        <a
                            href={`/rdpUtilities/${button.value}`}
                            className="button bg-blue hover:text-blue border-blue my-[10px] text-[1.2rem] text-left">
                            {button.name}
                        </a>
                    );
                })}
            </div>
        </>
    );

    return (
        <>
            <Header
                title={"Dashboard"}
                user={user}
            />
            <main className="w-[770px] mx-auto mt-[25px]">{connected ? page : <Spinner />}</main>
        </>
    );
}
