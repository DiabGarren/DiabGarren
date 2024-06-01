"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";

export default function Home() {
    const [face, setFace] = useState("front");

    const xPlane = ["front", "right", "back", "left"];
    const yPlane = ["front", "top", "back", "bottom"];
    return (
        <main className="w-[350px] mx-auto">
            <a
                className="button bg-blue hover:text-blue text-center"
                href="/rdpUtilities"
            >
                RdpUtilities
            </a>
            <a
                className="button bg-blue hover:text-blue text-center"
                href="/3DPrinting"
            >
                3D Printing
            </a>
            <a
                className="button bg-blue hover:text-blue text-center"
                href="/calendar"
            >
                Calendar
            </a>
        </main>
    );
}
