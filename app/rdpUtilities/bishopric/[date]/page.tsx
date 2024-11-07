/* eslint-disable react/jsx-key */
"use client";
import DocPage from "@/components/rdpUtilites/docPage";
import DocsList from "@/components/rdpUtilites/docsList";
import Header from "@/components/rdpUtilites/header";
import Spinner from "@/components/rdpUtilites/spinner";
import { useEffect, useState } from "react";
export default function BishopricDoc({ params }: { params: { date: string } }) {
    const [user, setUser] = useState({
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        level: 1,
    });
    const [docData, setDocData] = useState({
        bishopric: { time: "", day: "" },
        wardcouncil: { time: "", day: "" },
    });
    const [doc, setDoc] = useState({
        date: "",
        openingPrayer: "",
        spiritualThought: "",
        training: "",
        agenda: [""],
        closingPrayer: "",
        notes: "",
        createdBy: { name: "", date: "" },
        updatedBy: [{ name: "", date: "" }],
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
        const getDocData = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/rdpUtilities/docData")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "fail") {
                        window.location.href = "/rdpUtilities/";
                    }
                    setDocData(data.data);
                });
        };
        const getDocs = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/rdpUtilities/bishopric")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status !== "fail") {
                        data.data.forEach((data: any) => {
                            if (data.date == params.date) setDoc(data.data);
                        });
                    }
                });
        };
        getUser();
        getDocData();
        getDocs();
        setConnected(true);
    }, []);
    return (
        <>
            <Header title={"Bishopric"} user={user} />
            <main className="w-[770px] mx-auto mt-[25px]">
                {connected ? (
                    <DocPage
                        title={"Bishopric"}
                        time={docData.bishopric.time}
                        date={params.date}
                    />
                ) : (
                    <Spinner />
                )}
            </main>
        </>
    );
}
