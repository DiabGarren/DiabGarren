"use client";
import Header from "@/components/DiabMotors/header";
import ImageFallback from "@/components/DiabMotors/imageFallback";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";

export default function Car({ params }: { params: { id: string } }) {
    const [car, setCar] = useState({
        make: "",
        model: "",
        year: "",
        colour: "",
        engine: { config: "", cylinders: "", size: "", fuel: "" },
        driveType: "",
        image: "",
        registration: "",
    });

    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const getCar = async () => {
            fetch(
                process.env.NEXT_PUBLIC_API_URL + "/DiabMotors/car/" + params.id
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data.status == "success") {
                        setCar(data.data);
                    }
                });
        };
        getCar();
    }, []);

    return (
        <>
            <Header />
            <main className="w-[80%] mx-auto">
                {car.make == "" ? (
                    <div className="flex justify-center items-center gap-[10px]">
                        <h2>Loading Car...</h2>
                        <Image
                            src="/DiabMotors/loading.gif"
                            alt="loading icon"
                            width={100}
                            height={30}
                        />
                    </div>
                ) : (
                    <>
                        <h2 className="text-center">
                            {car.make} {car.model}
                        </h2>
                        <div className="relative h-[120px]">
                            <ImageFallback
                                className={"rounded"}
                                name={`${car.make} ${car.model}`}
                                src={car.image}
                            />
                        </div>
                        {update ? (
                            <></>
                        ) : (
                            <>
                                <div className="car-details mt-[20px]">
                                    <div className="car-details-row">
                                        <p className="car-details-column">
                                            Make:
                                        </p>
                                        <p className="car-details-column">
                                            {car.make}
                                        </p>
                                    </div>
                                    <div className="car-details-row">
                                        <p className="car-details-column">
                                            Model:
                                        </p>
                                        <p className="car-details-column">
                                            {car.model}
                                        </p>
                                    </div>
                                    <div className="car-details-row">
                                        <p className="car-details-column">
                                            Year:
                                        </p>
                                        <p className="car-details-column">
                                            {car.year}
                                        </p>
                                    </div>
                                    <div className="car-details-row">
                                        <p className="car-details-column">
                                            Colour:
                                        </p>
                                        <p className="car-details-column">
                                            {car.colour}
                                        </p>
                                    </div>
                                    <div className="car-details-row">
                                        <p className="car-details-column">
                                            Registration:
                                        </p>
                                        <p className="car-details-column">
                                            {car.registration}
                                        </p>
                                    </div>
                                    <div className="car-details-row">
                                        <p className="car-details-column">
                                            Drive Type:
                                        </p>
                                        <p className="car-details-column">
                                            {car.driveType}
                                        </p>
                                    </div>
                                </div>
                                <h2 className="text-center my-[5px]">Engine</h2>
                                <div className="car-details mb-[20px]">
                                    <div className="car-details-row">
                                        <p className="car-details-column">
                                            Config
                                        </p>
                                        <p className="car-details-column">
                                            {car.engine.config}
                                        </p>
                                    </div>
                                    <div className="car-details-row">
                                        <p className="car-details-column">
                                            Cylinders
                                        </p>
                                        <p className="car-details-column">
                                            {car.engine.cylinders}
                                        </p>
                                    </div>
                                    <div className="car-details-row">
                                        <p className="car-details-column">
                                            Size (l)
                                        </p>
                                        <p className="car-details-column">
                                            {car.engine.size}
                                        </p>
                                    </div>
                                    <div className="car-details-row">
                                        <p className="car-details-column">
                                            Fuel Type
                                        </p>
                                        <p className="car-details-column">
                                            {car.engine.fuel}
                                        </p>
                                    </div>
                                </div>
                                <Button className="green w-[100%]">
                                    Update Car Info
                                </Button>
                            </>
                        )}
                    </>
                )}
            </main>
        </>
    );
}
