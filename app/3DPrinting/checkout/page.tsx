"use client";
import Header from "@/components/3DPrinting/header";
import { User } from "@/lib/3DPrinting/user";
import { useEffect, useState } from "react";

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
                    <h2>Shipping method:</h2>
                    <div className="flex justify-evenly">
                        <div>
                            <label htmlFor="collect">Collect</label>
                            <input
                                type="radio"
                                name="shipping"
                                id="collect"
                                onClick={() => setShipping("collect")}
                            />
                        </div>
                        <div>
                            <label htmlFor="deliver">Deliver</label>
                            <input
                                type="radio"
                                name="shipping"
                                id="deliver"
                                onClick={() => setShipping("deliver")}
                            />
                        </div>
                    </div>
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
            </main>
        </>
    );
}
