"use client";
import Image from "next/image";
import { useState } from "react";

export default function ImageFallback(props: any) {
    return (
        <Image
            className="rounded-[12px]"
            src={`/3DPrinting/${props.src ? props.src : "NoImage.png"}`}
            alt={`Thumbnail for ${props.name}`}
            width={props.width}
            height={props.width}
        />
    );
}
