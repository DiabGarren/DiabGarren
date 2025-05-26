"use client";
import Image from "next/image";

export default function ImageFallback(props: {
    className: string;
    src: string | undefined;
    name: string;
}) {
    return (
        <Image
            className={`object-cover ${props.className}`}
            src={`/DiabMotors/cars/${props.src ? props.src : "NoImage.png"}`}
            alt={`Thumbnail for ${props.name}`}
            fill={true}
        />
    );
}
