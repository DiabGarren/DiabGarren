/* eslint-disable react/jsx-key */
"use client";
import Back from "@/components/3DPrinting/back";
import PrintBody from "@/components/3DPrinting/body";
import CheckoutItem from "@/components/3DPrinting/checkoutItem";
import ImageFallback from "@/components/3DPrinting/imageFallback";
import { useEffect, useState } from "react";

export default function OrderPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState();
  const [order, setOrder] = useState({
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
  });

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
    const getOrder = async () => {
      fetch(process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/orders/" + params.id)
        .then((res) => res.json())
        .then((data: any) => {
          if (data.status === "success") {
            setOrder(data.data);
          }
        });
    };
    getUser();
    getOrder();
  }, [params.id]);

  return (
    <PrintBody
      user={user}
      cart={null}
      mainClass={"w-[90%] md:w-[350px] mx-auto my-[50px]"}
    >
      <Back href="/orders" />
      <h2 className="text-[25px] font-[600]">
        Order{" "}
        {new Date(order.date).toLocaleString("default", { weekday: "short" })},{" "}
        {new Date(order.date).getDate()}{" "}
        {new Date(order.date).toLocaleString("default", { month: "short" })}{" "}
        {new Date(order.date).getFullYear()}
      </h2>
      <div>
        {order.order.map((item: any) => {
          return <CheckoutItem {...item} />;
        })}
      </div>
      <p>
        Shipping: {order.shipping[0].toUpperCase()}
        {order.shipping.substring(1)}
      </p>
      {order.shipping === "deliver" ? <p>Shipping cost: R60</p> : <></>}
      <p></p>
      <p className="text-right mt-[10px]">Total: R{order.total}</p>
    </PrintBody>
  );
}
