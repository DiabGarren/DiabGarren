/* eslint-disable react/jsx-key */
"use client";
import Header from "@/components/3DPrinting/header";
import ItemCard from "@/components/3DPrinting/itemCard";
import { Item } from "@/lib/3DPrinting/item";
import { useEffect, useState } from "react";

export default function Page() {
    const [user, setUser] = useState();
    const [items, setItems] = useState<Array<Item>>();

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
        const getItems = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/items")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setItems(data.data);
                    }
                });
        };
        getUser();
        getItems();
    }, []);

    return (
        <>
            <Header user={user} />
            <main className="grid grid-cols-4 gap-[10px] mt-[50px] w-fit mx-auto">
                {items?.map((item) => {
                    return <ItemCard {...item} />;
                })}
            </main>
        </>
    );
}
