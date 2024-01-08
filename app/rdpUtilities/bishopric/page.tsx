/* eslint-disable react/jsx-key */
"use client";
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

    const page = () => {
        const currDate = new Date();
        const newDocs: any[] = [];
        const oldDocs: any[] = [];

        docs.map((doc) => {
            const date = new Date(doc.date);

            const dateStr =
                date.getDate() +
                " " +
                date.toLocaleString("default", { month: "long" }) +
                " " +
                date.getFullYear();

            if (
                (currDate.getDate() === date.getDate() &&
                    currDate.getMonth() === date.getMonth() &&
                    currDate.getFullYear() === date.getFullYear()) ||
                currDate < date
            ) {
                newDocs.push(
                    <a
                        className={`button my-[10px] text-[1.2rem] text-left ${
                            currDate.getDate() === date.getDate() &&
                            currDate.getMonth() === date.getMonth() &&
                            currDate.getFullYear() === date.getFullYear()
                                ? "bg-green border-green hover:text-green"
                                : currDate < date
                                ? "bg-blue border-blue hover:text-blue"
                                : ""
                        }`}>
                        {dateStr}
                    </a>
                );
            } else {
                oldDocs.push(
                    <a
                        className={`button my-[10px] text-[1.2rem] text-left ${
                            currDate.getDate() === date.getDate() &&
                            currDate.getMonth() === date.getMonth() &&
                            currDate.getFullYear() === date.getFullYear()
                                ? "bg-green border-green hover:text-green"
                                : currDate > date
                                ? "bg-grey border-grey hover:text-grey"
                                : "bg-blue border-blue hover:text-blue"
                        }`}>
                        {dateStr}
                    </a>
                );
            }
        });
        return (
            <div className="w-[350px]">
                {newDocs}{" "}
                <Popup
                    trigger={
                        <button>
                            <svg
                                className={`inline w-[10px] h-[20px] ${past ? "rotate-90" : ""}`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="41"
                                height="52"
                                viewBox="0 0 41 52"
                                fill="none">
                                <path
                                    d="M7.7735 1.18233L38.7596 21.8397C41.7283 23.8188 41.7283 28.1811 38.7596 30.1602L7.7735 50.8176C4.45073 53.0328 0 50.6509 0 46.6574L0 5.34258C0 1.34911 4.45073 -1.03285 7.7735 1.18233Z"
                                    fill="black"
                                />
                            </svg>{" "}
                            Past Docs
                        </button>
                    }
                    position={"bottom left"}
                    onOpen={() => setPast(true)}
                    onClose={() => setPast(false)}>
                    <div className="w-[350px]">{oldDocs}</div>
                </Popup>
            </div>
        );
    };

    return (
        <>
            <Header
                title={"Bishopric"}
                user={user}
            />
            <main className="w-[770px] mx-auto mt-[25px]">{connected ? page() : <Spinner />}</main>
        </>
    );
}
