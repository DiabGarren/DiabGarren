/* eslint-disable react/jsx-key */
"use client";
import CarCard from "@/components/DiabMotors/carCard";
import Header from "@/components/DiabMotors/header";
import { useEffect, useState } from "react";

export default function Home() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const getCars = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/DiabMotors/cars")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status == "success") {
                        setCars(data.data);
                    }
                });
        };
        getCars();
    }, []);
    console.log(cars);

    return (
        <>
            <Header />
            <main>
                {cars.length > 0 ? (
                    <div className="flex gap-[5px]">
                        {cars.map((car: any) => {
                            return <CarCard {...car} />;
                        })}
                    </div>
                ) : (
                    <h2>No cars added</h2>
                )}
                <a href="/DiabMotors/AddCar" className="button green">
                    Add New Car
                </a>
            </main>
        </>
    );
}
