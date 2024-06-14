"use client";
import PrintBody from "@/components/3DPrinting/body";
import { User } from "@/lib/3DPrinting/user";
import { useEffect, useState } from "react";

export default function CreateOrder() {
    const [user, setUser] = useState<User>();
    const [cart, setCart] = useState(0);

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
        getUser();
    }, []);

    return (
        <PrintBody cart={cart} user={user} mainClass={undefined}>
            <></>
        </PrintBody>
    );
}
