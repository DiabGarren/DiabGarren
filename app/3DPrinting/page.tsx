/* eslint-disable react/jsx-key */
"use client";
import PrintBody from "@/components/3DPrinting/body";
import ImageFallback from "@/components/3DPrinting/imageFallback";
import ItemCard from "@/components/3DPrinting/itemCard";
import { Item } from "@/lib/3DPrinting/item";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
    const [user, setUser] = useState();
    const [items, setItems] = useState<Array<Item>>();
    const [email, setEmail] = useState("");
    const [itemInfo, setItemInfo] = useState("");
    const [size, setSize] = useState("");
    const [colour, setColour] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const getUser = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/user")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setUser(data.data);
                        setEmail(data.data.email);
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

    const sendMessage = async (event: any) => {
        event.preventDefault();

        fetch(process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                info: itemInfo,
                size: size,
                colour: colour,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "success") {
                    setMessage(data.message);
                    setItemInfo("");
                    setSize("");
                    setColour("");
                }
            });
    };

    return (
        <PrintBody
            user={user}
            cart={null}
            mainClass={""}>
            <div className="relative w-[100%] h-[150px] md:h-[250px] bg-[url('/3DPrinting/hero.jpg')] bg-cover bg-center">
                <h1
                    className="text-white text-[30px] md:text-[40px] font-[700] text-center pt-[20px] md:pt-[70px]"
                    style={{ textShadow: "0 0 5px black, 0 0 210px black, 0 0 20px black" }}>
                    Custom 3D Printing
                    <br />
                    by Garren Diab
                </h1>
            </div>
            <div className="w-[90%] mx-auto my-[50px]">
                <div className="mx-auto mb-[50px] md:max-w-[400px] md:w-[400px] border-2 border-print-blue rounded-lr pt-[10px]">
                    <h2 className="font-[600] text-center mb-[10px]">Want a custom print?</h2>
                    <h2 className="text-center text-print-green">{message}</h2>
                    <form onSubmit={sendMessage}>
                        <label
                            htmlFor="email"
                            className="mx-[10px]">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="form-input mx-[10px] w-[calc(100%-20px)]"
                            placeholder="myemail@example.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                        <label
                            htmlFor="info"
                            className="mx-[10px]">
                            Item information
                        </label>
                        <textarea
                            name="info"
                            className="form-input mx-[10px] w-[calc(100%-20px)]"
                            placeholder="I'm looking for a cute little dragon"
                            onChange={(event) => setItemInfo(event.target.value)}>
                            {itemInfo}
                        </textarea>
                        <label
                            htmlFor="size"
                            className="mx-[10px]">
                            Approx. size (mm)
                        </label>
                        <input
                            type="text"
                            name="size"
                            className="form-input mx-[10px] !w-[calc(100%-20px)]"
                            placeholder="Height: 60 (Max 200)"
                            value={size}
                            onChange={(event) => setSize(event.target.value)}
                        />
                        <label
                            htmlFor="colour"
                            className="mx-[10px]">
                            Colour
                        </label>
                        <input
                            type="text"
                            name="colour"
                            className="form-input mx-[10px] !w-[calc(100%-20px)]"
                            placeholder="Blue, Orange, Red..."
                            value={colour}
                            onChange={(event) => setColour(event.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-[100%] text-center text-[20px] text-white bg-print-blue hover:bg-print-blue-light rounded-b-md mt-[10px]">
                            Send message
                        </button>
                    </form>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-auto-300 justify-center gap-[10px]">
                    {items?.map((item) => {
                        return <ItemCard {...item} />;
                    })}
                </div>
            </div>
        </PrintBody>
    );
}
