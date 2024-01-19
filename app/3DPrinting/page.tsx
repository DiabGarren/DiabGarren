/* eslint-disable react/jsx-key */
"use client";
import Footer from "@/components/3DPrinting/footer";
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
                        setItems(
                            data.data.sort((a: Item, b: Item) => {
                                if (a.name.localeCompare(b.name) === 1) return 1;
                                else return -1;
                            })
                        );
                    }
                });
        };
        getUser();
        getItems();
    }, []);

    return (
        <>
            <Header user={user} />
            <main className="grid grid-cols-1 md:grid-cols-auto-300 justify-center gap-[10px] my-[50px] w-[90%] mx-auto">
                {items?.map((item) => {
                    return <ItemCard {...item} />;
                })}
            </main>
            <Footer />
        </>
    );
}
