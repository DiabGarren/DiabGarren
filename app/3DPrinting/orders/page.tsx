/* eslint-disable react/jsx-key */
"use client";
import PrintBody from "@/components/3DPrinting/body";
import OrderItem from "@/components/3DPrinting/orderItem";
import { useEffect, useState } from "react";

export default function OrdersPage() {
    const [user, setUser] = useState();
    const [orders, setOrders] = useState([
        {
            _id: "",
            userId: "",
            name: "",
            date: "",
            order: [
                {
                    name: "",
                    size: "",
                    colour: "",
                    base: "",
                    image: "",
                    price: 0,
                    qty: 0,
                },
            ],
            shipping: "",
            total: 0,
            status: "",
        },
    ]);

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
        const getOrders = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/orders/")
                .then((res) => res.json())
                .then((data: any) => {
                    if (data.status === "success") {
                        setOrders(data.data);
                    }
                });
        };
        getUser();
        getOrders();
    }, []);

    return (
        <PrintBody
            user={user}
            cart={null}
            mainClass={"w-[90%] md:w-[350px] mx-auto my-[50px]"}>
            <h2 className="text-[25px] font-[600]">Orders</h2>
            <div className="flex flex-col gap-[10px] mt-[15px]">
                {orders.map((item: any) => {
                    return <OrderItem {...item} />;
                })}
            </div>
        </PrintBody>
    );
}