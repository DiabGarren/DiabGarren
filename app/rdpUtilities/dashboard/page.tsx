/* eslint-disable react-hooks/exhaustive-deps */
"use client";
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

    const [nav, setNav] = useState(false);

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

    const navMenu = () => {
        switch (user.level) {
            case "1":
            default:
                return <></>;
            case "2":
                return (
                    <>
                        <a
                            href=""
                            className="button">
                            Ward Council
                        </a>
                    </>
                );
            case "3":
                return (
                    <>
                        <a
                            href=""
                            className="button">
                            Ward Council
                        </a>
                        <a
                            href=""
                            className="button">
                            Youth
                        </a>
                    </>
                );
            case "4":
            case "5":
                return (
                    <>
                        <a
                            href=""
                            className="button">
                            Bishopric
                        </a>
                        <a
                            href=""
                            className="button">
                            Sacrament
                        </a>
                        <a
                            href=""
                            className="button">
                            Ward Council
                        </a>
                        <a
                            href=""
                            className="button">
                            Youth
                        </a>
                    </>
                );
        }
    };

    return (
        <>
            <header className="grid grid-cols-[70px_1fr_70px] bg-gradient-to-r from-blue-dark to-blue-light h-[65px] items-center px-[20px]">
                <Popup
                    trigger={
                        <button
                            className={`${
                                nav
                                    ? "bg-[url('/rdpUtilities/cross.svg')]"
                                    : "bg-[url('/rdpUtilities/hamburger.svg')]"
                            } bg-[length:80%_70%] bg-no-repeat bg-center h-[calc(100%-10px)] w-[60px] rounded
                            ${
                                nav
                                    ? "hover:bg-[url('/rdpUtilities/cross-hover.svg')]"
                                    : "hover:bg-[url('/rdpUtilities/hamburger-hover.svg')]"
                            } hover:bg-blue-light`}></button>
                    }
                    position={"bottom left"}
                    onOpen={() => {
                        setNav(true);
                    }}
                    onClose={() => {
                        setNav(false);
                    }}>
                    <div className="w-[150px]">{navMenu()}</div>
                </Popup>

                <h1 className="text-[2.5rem] font-[700] text-white">Dashboard</h1>
                <a
                    className="flex bg-primary h-[calc(100%-10px)] aspect-[1/1] rounded-[50%] p-[5px] text-white border-2 border-primary justify-self-end items-center justify-center cursor-pointer
                hover:text-primary hover:bg-white">
                    <p className="text-[1.2rem]">
                        {user.firstName[0]}
                        {user.lastName[0]}
                    </p>
                </a>
            </header>
            <main></main>
        </>
    );
}
