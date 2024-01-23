/* eslint-disable react/jsx-key */
"use client";
import PrintBody from "@/components/3DPrinting/body";
import CartItem from "@/components/3DPrinting/cartItem";
import { User } from "@/lib/3DPrinting/user";
import { useEffect, useState } from "react";

export default function Cart() {
    const [user, setUser] = useState<User>();
    const [cart, setCart] = useState([
        {
            _id: "",
            name: "",
            size: "",
            price: 0,
            colour: "",
            image: "",
            qty: 0,
        },
    ]);

    useEffect(() => {
        const getUser = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/user")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setUser(data.data);
                        setCart(data.data.cart);
                    }
                });
        };
        getUser();
    }, []);

    const getTotal = () => {
        let total = 0;
        user?.cart.forEach((item) => {
            total += item.price * item.qty;
        });

        return total;
    };

    return (
        <PrintBody
            user={user}
            cart={null}
            mainClass={"mx-auto my-[50px] w-[90%] md:w-[600px]"}>
            {cart.length > 0 ? (
                cart.map((item: any) => {
                    return (
                        <CartItem
                            item={item}
                            cart={cart}
                        />
                    );
                })
            ) : (
                <h2 className="text-center">Your cart is empty</h2>
            )}
            <div className="text-right max-w-[250px] md:max-w-[70%] mx-auto">
                <h2>Cart total:</h2>
                <p className="text-[18px]">R{getTotal()}</p>
            </div>
            {cart.length > 0 ? (
                <a
                    href="/3DPrinting/checkout"
                    className="block bg-print-blue hover:bg-print-blue-light text-white rounded w-[288px] md:w-[70%] md:w-[350px] h-[35px] py-[5px] mx-auto mt-[15px] text-center cursor-pointer">
                    Checkout
                </a>
            ) : (
                <></>
            )}
        </PrintBody>
    );
}
