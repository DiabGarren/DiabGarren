/* eslint-disable react/jsx-key */
"use client";
import PrintBody from "@/components/3DPrinting/body";
import CheckoutItem from "@/components/3DPrinting/checkoutItem";
import { User } from "@/lib/3DPrinting/user";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";

export default function Checkout() {
    const [message, setMessage] = useState({ status: "success", message: "" });
    const [user, setUser] = useState<User>();
    const [shipping, setShipping] = useState("");
    const [address, setAddress] = useState({
        street: "",
        suburb: "",
        city: "",
        postalCode: "1234",
    });

    useEffect(() => {
        const getUser = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/user")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setUser(data.data);
                        setAddress(data.data.address);
                    }
                });
        };
        getUser();
    }, []);

    const getTotal = () => {
        let total = 0;
        let items = 0;

        user?.cart.forEach((item: any) => {
            items += item.qty;
            total += item.price * item.qty;
        });

        return { total: total, items: items };
    };

    return (
        <PrintBody
            user={user}
            cart={null}
            mainClass={"w-[90%] md:w-[350px] mx-auto my-[50px]"}>
            <h2>Cart Summary:</h2>
            <div>
                {user?.cart.map((item: any) => {
                    return <CheckoutItem {...item} />;
                })}
            </div>
            <div>
                <h2>Subtotal:</h2>
                <p>
                    R{getTotal().total}
                    {" ("}
                    {getTotal().items}
                    {" items)"}
                </p>
            </div>
            <h2 className="my-[15px]">
                Shipping method{" "}
                <Popup
                    trigger={
                        <button className="border-2 border-black rounded-[50%] w-[25px] h-[25px] text-center text-[15px] font-[700]">
                            i
                        </button>
                    }
                    position="bottom center">
                    <div className="w-[250px] md:w-[300px] ml-[-35px] md:ml-0 bg-white rounded-lr p-[10px] shadow-xl border-2 border-print-blue">
                        <p>
                            With {'"Custom 3D Printing"'} just starting out, we have not yet
                            determined a standard form for deliveries.
                            <br />
                            Because of this, the final price and method of delivery will be
                            communicated with you after an order has been placed.
                        </p>
                    </div>
                </Popup>{" "}
                :
            </h2>
            <div className="flex justify-evenly">
                <div>
                    <label
                        htmlFor="collect"
                        className="mr-[5px] cursor-pointer">
                        Collect
                    </label>
                    <input
                        type="radio"
                        name="shipping"
                        id="collect"
                        className="cursor-pointer"
                        onClick={() => setShipping("collect")}
                    />
                </div>
                <div>
                    <label
                        htmlFor="deliver"
                        className="mr-[5px] cursor-pointer">
                        Deliver
                    </label>
                    <input
                        type="radio"
                        name="shipping"
                        id="deliver"
                        className="cursor-pointer"
                        onClick={() => setShipping("deliver")}
                    />
                </div>
            </div>
            <div className={`${shipping === "deliver" ? "block" : "hidden"} my-[15px]`}>
                <h2>Shipping address</h2>
                <input
                    type="text"
                    name="street"
                    className="form-input"
                    value={address.street}
                    placeholder="Street address"
                    onChange={(event) => {
                        setAddress({
                            street: event.target.value,
                            suburb: address.suburb,
                            city: address.city,
                            postalCode: address.postalCode,
                        });
                    }}
                />
                <input
                    type="text"
                    name="suburb"
                    className="form-input"
                    value={address.suburb}
                    placeholder="Suburb"
                    onChange={(event) => {
                        setAddress({
                            street: address.street,
                            suburb: event.target.value,
                            city: address.city,
                            postalCode: address.postalCode,
                        });
                    }}
                />
                <input
                    type="text"
                    name="city"
                    className="form-input"
                    value={address.city}
                    placeholder="City"
                    onChange={(event) => {
                        setAddress({
                            street: address.street,
                            suburb: address.suburb,
                            city: event.target.value,
                            postalCode: address.postalCode,
                        });
                    }}
                />
                <input
                    type="number"
                    name="postalCode"
                    className="form-input w-[75px]"
                    value={address.postalCode}
                    placeholder="Postal code"
                    onChange={(event) => {
                        setAddress({
                            street: address.street,
                            suburb: address.suburb,
                            city: address.city,
                            postalCode: event.target.value,
                        });
                    }}
                />
            </div>
            <h2
                className={`${
                    message.status == "success" ? "text-print-green" : "text-print-red"
                } text-center`}>
                {message.message}
            </h2>
            <button
                className="bg-print-blue hover:bg-print-blue-light text-white rounded p-[5px_10px] w-[100%]"
                onClick={async () =>
                    await fetch(process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/checkout", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            shipping: shipping,
                            address: address,
                        }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            setMessage(data);
                            console.log(data);

                            if (data.status === "success") window.location.href = "/3DPrinting";
                        })
                }>
                Place Order
            </button>
        </PrintBody>
    );
}
