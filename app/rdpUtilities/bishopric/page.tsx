/* eslint-disable react/jsx-key */
"use client";
import DocsList from "@/components/rdpUtilites/docsList";
import Header from "@/components/rdpUtilites/header";
import Spinner from "@/components/rdpUtilites/spinner";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";

export default function Bishopric() {
    const [user, setUser] = useState({
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        level: 1,
    });
    const [docs, setDocs] = useState([
        {
            date: "",
            openingPrayer: "",
            spiritualThought: "",
            training: "",
            agenda: [""],
            closingPrayer: "",
            notes: "",
            createdBy: { name: "", date: "" },
            updatedBy: [{ name: "", date: "" }],
        },
    ]);
    const [connected, setConnected] = useState(false);
    const [past, setPast] = useState(false);

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
        const getDocs = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/rdpUtilities/bishopric")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status !== "fail") {
                        setDocs(data.data.reverse());
                    }
                });
        };
        getUser();
        getDocs();
        setConnected(true);
    }, []);

    return (
        <>
            <Header title={"Bishopric"} user={user} />
            <main className="w-[770px] mx-auto mt-[25px]">
                {connected ? (
                    <DocsList
                        title={"bishopric"}
                        docs={docs}
                        past={past}
                        setPast={setPast}
                    />
                ) : (
                    <Spinner />
                )}
            </main>
        </>
    );
}
