"use client";

import { useState } from "react";
import Popup from "reactjs-popup";
import NavMenu from "./navMenu";

export default function Header(props: any) {
    const [nav, setNav] = useState(false);
    return (
        <header className="grid grid-cols-[70px_1fr_80px] bg-gradient-to-r from-blue to-blue-light h-[80px] items-center">
            {props.user ? (
                <Popup
                    trigger={
                        <button
                            className={`${
                                nav
                                    ? "bg-[url('/rdpUtilities/cross.svg')]"
                                    : "bg-[url('/rdpUtilities/hamburger.svg')]"
                            } bg-[length:35px] bg-no-repeat bg-center h-[55px] aspect-[1/1] rounded-[10px] p-[10px] mx-auto
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
            <h1 className="text-[50px] font-[700] text-white col-[2]">{props.title}</h1>
            {props.user ? (
                <a
                    className="flex bg-primary h-[65px] aspect-[1/1] rounded-[50%] p-[5px] mx-auto text-white border-2 border-primary justify-self-end items-center justify-center cursor-pointer
                hover:text-primary hover:bg-transparent">
                    <p className="text-[33px] h-[47px]">
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
