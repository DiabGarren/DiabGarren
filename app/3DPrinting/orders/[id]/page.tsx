/* eslint-disable react/jsx-key */
"use client";
import Back from "@/components/3DPrinting/back";
import PrintBody from "@/components/3DPrinting/body";
import CheckoutItem from "@/components/3DPrinting/checkoutItem";
import ImageFallback from "@/components/3DPrinting/imageFallback";
import { User } from "@/lib/3DPrinting/user";
import { useEffect, useState } from "react";

export default function OrderPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User>();
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
    shipping: "collect",
    total: 0,
    status: "",
  });

  const [orderUser, setOrderUser] = useState<User>();

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

            const getOrderUser = async () => {
              fetch(
                process.env.NEXT_PUBLIC_API_URL +
                  "/3DPrinting/user/" +
                  data.data.userId
              )
                .then((res) => res.json())
                .then((data: any) => {
                  if (data.status === "success") {
                    setOrderUser(data.data);
                  }
                });
            };

            getOrderUser();
          }
        });
    };
    getUser();
    getOrder();
  }, [params.id]);

  return (
    <PrintBody user={user} cart={null} mainClass={""}>
      <div className="no-print w-[90%] md:w-[350px] mx-auto my-[50px]">
        <Back href={user?.level == 2 ? "/allOrders" : "/orders"} />
        <h2 className="text-[25px] font-[600]">
          Order{" "}
          {new Date(order.date).toLocaleString("default", { weekday: "short" })}
          , {new Date(order.date).getDate()}{" "}
          {new Date(order.date).toLocaleString("default", { month: "short" })}{" "}
          {new Date(order.date).getFullYear()}
        </h2>
        <div>
          <h2 className="text-[20px] font-[600]">{order.name}</h2>
          {order.order.map((item: any) => {
            return <CheckoutItem {...item} admin={true} />;
          })}
        </div>
        <p>
          Shipping: {order.shipping[0].toUpperCase()}
          {order.shipping.substring(1)}
        </p>
        {order.shipping === "deliver" ? <p>Shipping cost: R60</p> : <></>}
        <p></p>
        <p className="text-right mt-[10px]">Total: R{order.total}</p>

        <button
          onClick={() => window.print()}
          className="bg-print-blue hover:bg-print-blue-light text-white rounded p-[5px_10px] w-[100%] mt-[15px]"
        >
          Print Invoice
        </button>
      </div>

      <div
        style={{ color: "#717610" }}
        className="max-w-[767px] py-[46px] px-[42px] mx-auto overflow-auto"
      >
        <div className="min-w-[450px]">
          <h1 className="text-[40px] font-[Calibri] font-[800]">
            DIAB DESIGNS & CONSULTING
          </h1>
          <h2 className="text-[22px] font-[700]">CUSTOM 3D PRINTING</h2>
          <div className="mt-[36px] grid grid-cols-2">
            <p style={{ color: "#4B4F0B" }} className="col-[1/3] font-[700]">
              DATE: {new Date(order.date).toLocaleDateString("en-GB")}
            </p>
            <div>
              <h2 className="text-[20px] font-[700]">BILLED TO</h2>
              <div className="text-black">
                <p>{order.name}</p>
                <p>{orderUser?.phone}</p>
                <a
                  href={`mailto:${orderUser?.email}`}
                  className="underline text-print-blue"
                >
                  {orderUser?.email}
                </a>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-[20px] font-[700]">PAYMENT INFO</h2>
              <div className="text-black">
                <p>Account Name: Garren Diab</p>
                <p>Account Number: 62880826684</p>
                <p>Bank: FNB</p>
              </div>
            </div>
            <div className="my-[18px]">
              <h2 className="text-[20px] font-[700]">SHIPPING</h2>
              <p style={{ color: "#4B4F0B" }} className="col-[1/3] font-[700]">
                {order.shipping[0].toUpperCase()}
                {order.shipping.substring(1)}
              </p>
              {order.shipping === "deliver" ? (
                <div className="text-black">
                  <p>{orderUser?.address.street}</p>
                  <p>{orderUser?.address.suburb}</p>
                  <p>{orderUser?.address.city}</p>
                  <p>{orderUser?.address.postalCode}</p>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="w-[100%] border border-print-inv-yellow [&>div]:grid [&>div]:grid-cols-[1fr_152px] [&>div>div]:border [&>div>div]:border-print-inv-yellow [&>div>div]:p-[5px_5px]">
            <div>
              <div>
                <p className="block text-center font-[700] text-print-inv-green-dark">
                  DESCRIPTION
                </p>
              </div>
              <div>
                <p className="block text-center font-[700] text-print-inv-green-dark">
                  TOTAL
                </p>
              </div>
            </div>
            {order.order.map((order) => {
              return (
                <div className="text-black">
                  <div>
                    <p className="font-[600]">{order.name}</p>
                    <div className="ml-[50px]">
                      <p>Size: {order.size}</p>
                      <p>Colour: {order.colour}</p>
                      <p>Price: R{order.price}</p>
                      <p>Qty: {order.qty}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-center">R{order.price * order.qty}</p>
                  </div>
                </div>
              );
            })}
            {order.shipping === "deliver" ? (
              <div className="text-black">
                <div>
                  <p className="font-[600]">Shipping</p>
                  <p className="ml-[50px]">Price: R60</p>
                </div>
                <div className="text-center">R60</div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="grid grid-cols-[1fr_154px] text-black">
            <p className="font-[600] text-right mr-[8px] py-[10px] text-print-inv-green-dark">
              TOTAL DUE
            </p>
            <div className="border-t-0 border-2 border-print-inv-yellow">
              <p className="text-center py-[10px]">R{order.total}</p>
            </div>
          </div>
        </div>
      </div>
    </PrintBody>
  );
}
