"use client";
import Image from "next/image";

export default function ImageFallback(props: any) {
    return (
        <Image
            className={`${props.round == "t" ? "rounded-t-[12px]" : "rounded-[12px]"}`}
            src={`/3DPrinting/items/${props.src ? props.src : "NoImage.png"}`}
            alt={`Thumbnail for ${props.name}`}
            width={props.width}
            height={props.width * (2 / 3)}
        />
    );
}
