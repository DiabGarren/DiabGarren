"use client";

import { useState } from "react";
import Popup from "reactjs-popup";
import NavMenu from "./navMenu";

export default function Header(props: any) {
    const [nav, setNav] = useState(false);
    return (
        <header className="grid grid-cols-[70px_1fr_70px] bg-gradient-to-r from-blue to-blue-light h-[65px] items-center px-[20px]">
            {props.user ? (
                <Popup
                    trigger={
                        <button
                            className={`${
                                nav
                                    ? "bg-[url('/rdpUtilities/cross.svg')]"
                                    : "bg-[url('/rdpUtilities/hamburger.svg')]"
                            } bg-[length:80%_70%] bg-no-repeat bg-center h-[calc(100%-10px)] w-[60px] rounded-[10px]
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
                    <NavMenu {...props.user} />
                </Popup>
            ) : (
                <></>
            )}
            <h1 className="text-[2.5rem] font-[700] text-white col-[2]">{props.title}</h1>
            {props.user ? (
                <a
                    className="flex bg-primary h-[calc(100%-10px)] aspect-[1/1] rounded-[50%] p-[5px] text-white border-2 border-primary justify-self-end items-center justify-center cursor-pointer
                hover:text-primary hover:bg-transparent">
                    <p className="text-[1.5rem]">
                        {props.user.firstName[0]}
                        {props.user.lastName[0]}
                    </p>
                </a>
            ) : (
                <></>
            )}
        </header>
    );
}
