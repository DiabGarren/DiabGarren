/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Header from "@/components/rdpUtilites/header";
import NavMenu from "@/components/rdpUtilites/navMenu";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";

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
                    if (data.status === "fail") {
                        window.location.href = "/rdpUtilities/";
                    }
                    setUser(data.data);
                });
        };
        getUser();
    }, []);

    return (
        <>
            <Header
                title={"Dashboard"}
                user={user}
            />
            <main></main>
        </>
    );
}
