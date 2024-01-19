/* eslint-disable react/jsx-key */
"use client";
import CheckoutItem from "@/components/3DPrinting/checkoutItem";
import Header from "@/components/3DPrinting/header";
import { User } from "@/lib/3DPrinting/user";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";

export default function Checkout(props: any) {
    const [user, setUser] = useState<User>();
    const [shipping, setShipping] = useState("");

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
        let items = 0;

        user?.cart.forEach((item: any) => {
            items += item.qty;
            total += item.price * item.qty;
        });

        return { total: total, items: items };
    };

    return (
        <>
            <Header user={user} />
            <main className="w-[90%] md:w-[500px] mx-auto">
                <div className="w-[100%] md:w-[350px]">
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
                    <h2 className="mt-[15px]">
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
                                    determined via your preferred method of communication after an
                                    order has been placed.
                                </p>
                            </div>
                        </Popup>{" "}
                        :
                    </h2>
                    <div className="flex justify-evenly">
                        <div>
                            <label
                                htmlFor="collect"
                                className="mr-[5px]">
                                Collect
                            </label>
                            <input
                                type="radio"
                                name="shipping"
                                id="collect"
                                onClick={() => setShipping("collect")}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="deliver"
                                className="mr-[5px]">
                                Deliver
                            </label>
                            <input
                                type="radio"
                                name="shipping"
                                id="deliver"
                                onClick={() => setShipping("deliver")}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
