/* eslint-disable react/jsx-key */
"use client";
import CarCard from "@/components/DiabMotors/carCard";
import Header from "@/components/DiabMotors/header";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
    const { push } = useRouter();
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const getCars = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/DiabMotors/cars")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status == "success") {
                        setCars(
                            data.data.sort((a: any, b: any) => {
                                if (a.make == b.make)
                                    return a.model > b.model ? 1 : -1;
                                else return a.make > b.make ? 1 : -1;
                            })
                        );
                    }
                });
        };
        getCars();
    }, []);

    return (
        <>
            <Header />
            <main>
                {cars.length > 0 ? (
                    <div className="flex flex-wrap gap-[5px] justify-center">
                        {cars.map((car: any) => {
                            return <CarCard {...car} />;
                        })}
                    </div>
                ) : (
                    <div className="flex justify-center items-center gap-[10px]">
                        <h2>Loading Cars...</h2>
                        <Image
                            src="/DiabMotors/loading.gif"
                            alt="loading icon"
                            width={100}
                            height={30}
                        />
                    </div>
                )}
                <Button
                    className="green w-[100%] mt-[20px]"
                    onPress={() => push("/DiabMotors/addCar")}
                >
                    Add New Car
                </Button>
            </main>
        </>
    );
}
