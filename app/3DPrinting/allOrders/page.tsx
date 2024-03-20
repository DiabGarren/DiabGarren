/* eslint-disable react/jsx-key */
"use client";
import Back from "@/components/3DPrinting/back";
import PrintBody from "@/components/3DPrinting/body";
import OrderItem from "@/components/3DPrinting/orderItem";
import { User } from "@/lib/3DPrinting/user";
import { useEffect, useState } from "react";

export default function AllOrders() {
  const [user, setUser] = useState<User>();
  const [allOrders, setAllOrders] = useState([]);
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
      fetch(process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/orders/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data: any) => {
          if (data.status === "success") {
            setAllOrders(data.data);
          }
        });
    };
    getUser();
    getOrders();
  }, []);

  return (
    <PrintBody
      cart={null}
      user={user}
      mainClass={"w-[90%] md:w-[350px] mx-auto my-[50px]"}
    >
      <div>
        <Back href="/" />
        <h2>Web Sales:</h2>
        {allOrders.map((item: any) => {
          if (item.userId) return <OrderItem {...item} />;
          else return <></>;
        })}
      </div>
    </PrintBody>
  );
}
