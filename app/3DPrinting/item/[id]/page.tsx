/* eslint-disable react/jsx-key */
"use client";
import Header from "@/components/3DPrinting/header";
import ImageFallback from "@/components/3DPrinting/imageFallback";
import { Item } from "@/lib/3DPrinting/item";
import { useEffect, useState } from "react";

export default function ItemPage({ params }: { params: { id: string } }) {
    const [user, setUser] = useState();
    const [item, setItem] = useState<Item>();
    const [choice, setChoice] = useState<{ size: string; price: number; other: string }>();
    const [colour, setColour] = useState<string>();
    const [notify, setNotify] = useState<{ status: string; message: string }>();

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
            fetch(process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/item/" + params.id)
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setItem(data.data[0]);
                    }
                });
        };
        getUser();
        getItems();
    }, [params.id]);

    const addToCart = async () => {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                _id: item?._id,
                name: item?.name,
                size: choice?.size,
                price: choice?.price,
                colour: colour,
                image: item?.images[0],
            }),
        });

        const data = await res.json();
        setNotify({ status: data.status, message: data.message });
    };

    return (
        <>
            <Header user={user} />
            <main className="mt-[50px] mx-auto w-[450px]">
                <div className="border-[3px] border-print-blue-light rounded-lr w-[450px]">
                    <ImageFallback
                        name={item?.name}
                        src={item?.images[0]}
                        width={450}
                    />
                </div>
                <div>
                    <h1 className="text-[30px] font-[700]">{item?.name}</h1>
                    <h2>Size (mm):</h2>
                    <div className="flex gap-[10px]">
                        {item?.options.map((option, index) => {
                            return (
                                <div className="bg-print-blue-light-1 w-fit p-[2px_5px] rounded [&:has(input:checked)]:bg-print-blue [&:has(input:checked)]:text-white cursor-pointer">
                                    <input
                                        className="appearance-none"
                                        type="radio"
                                        name="size"
                                        id={`${option.size}-${index}`}
                                        onClick={() => {
                                            setChoice(option);
                                        }}
                                    />
                                    <label
                                        htmlFor={`${option.size}-${index}`}
                                        className="cursor-pointer">
                                        {`${option.size}${option.other ? "*" : ""}`}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                    <h2>Price:</h2>
                    <p>{choice ? `R${choice?.price}` : ""}</p>
                    <p>{choice && choice.other ? `Includes: ${choice.other}` : ""}</p>
                    <h2>Colour:</h2>
                    <div className="flex gap-[10px]">
                        {item?.colours.map((colour) => {
                            return (
                                <div className="relative bg-print-blue-light-1 w-[50px] h-[50px] rounded-[50%] [&:has(input:checked)]:bg-print-blue cursor-pointer">
                                    <input
                                        className="appearance-none"
                                        type="radio"
                                        name="colour"
                                        id={colour}
                                        onClick={() => {
                                            setColour(colour);
                                        }}
                                    />
                                    <label
                                        htmlFor={colour}
                                        style={{ backgroundColor: colour }}
                                        className="absolute block w-[46px] h-[46px] top-[2px] left-[2px] rounded-[50%] cursor-pointer"></label>
                                </div>
                            );
                        })}
                    </div>
                    <h2
                        className={`text-print-${
                            notify?.status === "success" ? "green" : "red"
                        } text-center mt-[30px]`}>
                        {notify?.message}
                    </h2>
                    <div className="w-[300px] mx-auto">
                        <button
                            className="bg-print-blue hover:bg-print-blue-light text-white py-[10px] rounded w-[100%]"
                            onClick={addToCart}>
                            Add to cart
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}
