/* eslint-disable react/jsx-key */
"use client";
import CartItem from "@/components/3DPrinting/cartItem";
import Header from "@/components/3DPrinting/header";
import { User } from "@/lib/3DPrinting/user";
import { useEffect, useState } from "react";

export default function Cart() {
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

    const getTotal = () => {
        let total = 0;
        user?.cart.forEach((item) => {
            total += item.price * item.qty;
        });

        return total;
    };

    return (
        <>
            <Header user={user} />
            <main className="mx-auto mt-[50px] md:w-[600px]">
                {user?.cart.map((item) => {
                    return <CartItem {...item} />;
                })}
                <h2>Total:</h2>
                <p>R{getTotal()}</p>
            </main>
        </>
    );
}
