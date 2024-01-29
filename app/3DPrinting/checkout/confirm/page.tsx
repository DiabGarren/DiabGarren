"use client";
import PrintBody from "@/components/3DPrinting/body";
import { User } from "@/lib/3DPrinting/user";
import { useEffect, useState } from "react";

export default function Confirm() {
    const [user, setUser] = useState<User>();
    useEffect(() => {
        const getUser = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/user")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setUser(data.data);
                    }
                });
        };
        getUser();
    }, []);

    return (
        <PrintBody
            user={user}
            cart={null}
            mainClass={"w-[90%] md:w-[350px] mx-auto my-[50px]"}>
            <h2 className="text-center mb-[10px]">Order Confirmed</h2>
            <a
                href="/3DPrinting/"
                className="block bg-print-blue hover:bg-print-blue-light text-white rounded p-[5px_10px] w-[100%] text-center text-[18px]">
                Continue shopping
            </a>
        </PrintBody>
    );
}
