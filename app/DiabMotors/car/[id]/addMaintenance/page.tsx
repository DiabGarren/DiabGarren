"use client";
import Header from "@/components/DiabMotors/header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page({ params }: { params: { id: string } }) {
    const { push } = useRouter();

    useEffect(() => {
        push("/DiabMotors/car/" + params.id);
    }, []);
    return (
        <>
            <Header /> <main></main>
        </>
    );
}
