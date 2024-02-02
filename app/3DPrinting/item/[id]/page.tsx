/* eslint-disable react/jsx-key */
"use client";
import Back from "@/components/3DPrinting/back";
import PrintBody from "@/components/3DPrinting/body";
import ImageFallback from "@/components/3DPrinting/imageFallback";
import { Item } from "@/lib/3DPrinting/item";
import { useEffect, useState } from "react";

export default function ItemPage({ params }: { params: { id: string } }) {
    const [user, setUser] = useState();
    const [cart, setCart] = useState(0);
    const [item, setItem] = useState<Item>({
        _id: "",
        name: "",
        colours: [""],
        options: [{ size: "", price: 0, other: "" }],
        bases: undefined,
        images: [""],
    });
    const [choice, setChoice] = useState<{
        size: string;
        price: number;
        colour: string;
        base: string;
    }>({
        size: "",
        price: 0,
        colour: "",
        base: "",
    });
    const [notify, setNotify] = useState<{ status: string; message: string }>();

    const [img, setImg] = useState<{ img: string | undefined; pos: number }>({
        img: undefined,
        pos: 0,
    });

    useEffect(() => {
        const getUser = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/user")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setUser(data.data);
                        let cartLength = 0;
                        data.data.cart.forEach((item: any) => {
                            cartLength += item.qty;
                        });
                        setCart(cartLength);
                    }
                });
        };
        const getItems = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/item/" + params.id)
                .then((res) => res.json())
                .then((data: any) => {
                    if (data.status === "success") {
                        setItem(data.data);
                        let base = "";
                        if (data.data.bases) {
                            base = data.data.bases[0];
                        }
                        setChoice({
                            size: data.data.options[0].size,
                            price: data.data.options[0].price,
                            colour: data.data.colours[0],
                            base: base,
                        });
                        setImg({ img: data.data.images[0], pos: 0 });
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
                size: choice.size,
                price: choice.price,
                colour: choice.colour,
                base: choice.base,
                image: item?.images[0],
            }),
        });

        const data = await res.json();
        if (data.message.includes("login")) window.location.href = "/3DPrinting/login";
        setNotify({ status: data.status, message: data.message });
        if (data.status == "success") setCart(cart + 1);
    };

    return (
        <PrintBody
            user={user}
            cart={cart}
            mainClass={
                "my-[50px] mx-auto w-[90%] md:w-[85%] xl:w-[900px] md:grid md:grid-cols-[2fr_1fr]"
            }>
            <div className="md:w-[90%]">
                <Back href="/" />
                <div className="relative border-[3px] border-print-blue-light rounded-lr aspect-[3/2]">
                    <ImageFallback
                        name={item?.name}
                        src={img?.img}
                        width={740}
                    />
                    <button
                        className="absolute flex h-[50px] w-[30px] items-center justify-center top-[calc(50%-25px)] left-0 text-white bg-print-grey bg-opacity-[0.45] rounded-r"
                        onClick={() => {
                            const pos = img.pos === 0 ? item?.images.length - 1 : img.pos - 1;
                            setImg({ img: item?.images[pos], pos: pos });
                        }}>
                        {"<"}
                    </button>
                    <button
                        className="absolute flex h-[50px] w-[30px] items-center justify-center top-[calc(50%-25px)] right-0 text-white bg-print-grey bg-opacity-[0.45] rounded-l"
                        onClick={() => {
                            const pos = img.pos + 1 === item?.images.length ? 0 : img.pos + 1;
                            setImg({ img: item?.images[pos], pos: pos });
                        }}>
                        {">"}
                    </button>
                </div>
                <p className="mt-[10px] hidden md:block">
                    All sizes are in the format: <br /> <b>Length x Width x Height</b>
                </p>
            </div>

            <div>
                <h1 className="text-[25px] xsm:text-[30px] font-[700]">{item?.name}</h1>
                <h2>
                    Size (cm) <span className="text-[15px]">(length x width x height)</span>:
                </h2>
                <div className="flex flex-wrap gap-[10px]">
                    {item?.options.map((option, index) => {
                        return (
                            <div className="bg-print-blue-light-1 w-fit p-[2px_5px] rounded [&:has(input:checked)]:bg-print-blue [&:has(input:checked)]:text-white cursor-pointer">
                                <input
                                    className="appearance-none"
                                    type="radio"
                                    name="size"
                                    id={`${option.size}-${index}`}
                                    onClick={() => {
                                        setChoice({
                                            size: option.size,
                                            price: option.price,
                                            colour: choice.colour,
                                            base: choice.base,
                                        });
                                    }}
                                    checked={option.size === choice.size}
                                />
                                <label
                                    htmlFor={`${option.size}-${index}`}
                                    className="cursor-pointer">
                                    {option.size.split("x").map((x, index) => {
                                        return `${x.substring(0, x.length - 1)}${
                                            index == option.size.split("x").length - 1 ? "" : "x"
                                        }`;
                                    })}
                                </label>
                            </div>
                        );
                    })}
                </div>
                <h2>Price:</h2>
                <p>{choice ? `R${choice.price}` : <br />}</p>
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
                                        setChoice({
                                            size: choice.size,
                                            price: choice.price,
                                            colour: colour,
                                            base: choice.base,
                                        });
                                    }}
                                    checked={colour === choice.colour}
                                />
                                <label
                                    htmlFor={colour}
                                    style={{ backgroundColor: colour }}
                                    className="absolute block w-[46px] h-[46px] top-[2px] left-[2px] rounded-[50%] cursor-pointer"></label>
                            </div>
                        );
                    })}
                </div>
                {item?.bases ? (
                    <>
                        <h2>Base:</h2>
                        <div className="flex gap-[10px]">
                            {item?.bases.map((base) => {
                                return (
                                    <div className="flex flex-col items-center">
                                        <div className="relative bg-print-blue-light-1 w-[50px] h-[50px] rounded-[50%] [&:has(input:checked)]:bg-print-blue cursor-pointer">
                                            <input
                                                className="appearance-none"
                                                type="radio"
                                                name="base"
                                                id={base}
                                                onClick={() => {
                                                    setChoice({
                                                        size: choice.size,
                                                        price: choice.price,
                                                        colour: choice.colour,
                                                        base: base,
                                                    });
                                                }}
                                                checked={base === choice.base}
                                            />
                                            <label
                                                htmlFor={base}
                                                style={{
                                                    backgroundImage: `url('/3DPrinting/wood/${base}.jpg')`,
                                                    backgroundSize: "cover",
                                                    backgroundRepeat: "no-repeat no-repeat",
                                                }}
                                                className="absolute block w-[46px] h-[46px] top-[2px] left-[2px] rounded-[50%] cursor-pointer"></label>
                                        </div>
                                        <p>{base[0].toUpperCase() + base.substring(1)}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <></>
                )}
                <h2
                    className={`${
                        notify?.status === "success" ? "text-print-green" : "text-print-red"
                    } text-center mt-[30px] w-[300px]`}>
                    {notify?.message}
                </h2>
                <div className="w-[300px] mx-auto md:mx-0">
                    <button
                        className="bg-print-blue hover:bg-print-blue-light text-white py-[10px] rounded w-[100%]"
                        onClick={addToCart}>
                        Add to cart
                    </button>
                </div>
            </div>
        </PrintBody>
    );
}
