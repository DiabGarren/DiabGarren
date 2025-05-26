"use client";
import Header from "@/components/DiabMotors/header";
import ImageFallback from "@/components/DiabMotors/imageFallback";
import { useEffect, useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
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

    const driveType = [
        { key: "Front Wheel", label: "Front Wheel Drive" },
        { key: "Rear Wheel", label: "Rear Wheel Drive" },
        { key: "Four Wheel", label: "Four Wheel Drive" },
        { key: "All Wheel", label: "All Wheel Drive" },
    ];
    const config = [
        { key: "Inline", label: "Inline" },
        { key: "V", label: "V" },
        { key: "Flat", label: "Flat" },
        { key: "W", label: "W" },
        { key: "Wankel", label: "Wankel (Rotary)" },
    ];
    const cylinders = [
        { key: "1", label: "1" },
        { key: "2", label: "2" },
        { key: "3", label: "3" },
        { key: "4", label: "4" },
        { key: "5", label: "5" },
        { key: "6", label: "6" },
        { key: "8", label: "8" },
    ];
    const size = [
        { key: "1.0", label: "1.0 Litre" },
        { key: "1.2", label: "1.2 Litre" },
        { key: "1.3", label: "1.3 Litre" },
        { key: "1.4", label: "1.4 Litre" },
        { key: "1.5", label: "1.5 Litre" },
        { key: "1.6", label: "1.6 Litre" },
        { key: "1.8", label: "1.8 Litre" },
        { key: "2.0", label: "2.0 Litre" },
        { key: "2.2", label: "2.2 Litre" },
        { key: "2.4", label: "2.4 Litre" },
        { key: "3.0", label: "3.0 Litre" },
        { key: "3.4", label: "3.4 Litre" },
    ];
    const fuel = [
        { key: "Petrol", label: "Petrol" },
        { key: "Diesel", label: "Diesel" },
    ];

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
                            <>
                                <form
                                    onSubmit={async (event) => {
                                        event.preventDefault();
                                        const res = await fetch(
                                            process.env.NEXT_PUBLIC_API_URL +
                                                "/DiabMotors/car/" +
                                                params.id,
                                            {
                                                method: "PUT",
                                                body: JSON.stringify(car),
                                            }
                                        );

                                        if (res.status === 201) {
                                            setUpdate(false);
                                        }
                                    }}
                                >
                                    <Input
                                        label="Make"
                                        placeholder="Nissan"
                                        value={car.make}
                                        onChange={(event: any) =>
                                            setCar({
                                                ...car,
                                                make: event.target.value,
                                            })
                                        }
                                    />
                                    <Input
                                        label="Model"
                                        placeholder="180sx"
                                        value={car.model}
                                        onChange={(event: any) =>
                                            setCar({
                                                ...car,
                                                model: event.target.value,
                                            })
                                        }
                                    />
                                    <Input
                                        label="Year"
                                        placeholder="1990"
                                        value={car.year}
                                        onChange={(event: any) =>
                                            setCar({
                                                ...car,
                                                year: event.target.value,
                                            })
                                        }
                                    />
                                    <Input
                                        label="Colour"
                                        placeholder="Silver"
                                        value={car.colour}
                                        onChange={(event: any) =>
                                            setCar({
                                                ...car,
                                                colour: event.target.value,
                                            })
                                        }
                                    />
                                    <Input
                                        label="Registration"
                                        placeholder="ABC 132 XX"
                                        value={car.registration}
                                        onChange={(event: any) =>
                                            setCar({
                                                ...car,
                                                registration:
                                                    event.target.value,
                                            })
                                        }
                                    />
                                    <Select
                                        label="Drive Type"
                                        placeholder="Front Wheel Drive"
                                        className="block"
                                        defaultSelectedKeys={[
                                            driveType[
                                                driveType.findIndex(
                                                    (i) =>
                                                        i.key == car.driveType
                                                )
                                            ].key,
                                        ]}
                                        onChange={(event: any) =>
                                            setCar({
                                                ...car,
                                                driveType: event.target.value,
                                            })
                                        }
                                    >
                                        {driveType.map(
                                            (type: {
                                                key: string;
                                                label: string;
                                            }) => (
                                                <SelectItem key={type.key}>
                                                    {type.label}
                                                </SelectItem>
                                            )
                                        )}
                                    </Select>

                                    <h3 className="text-center mt-[15px]">
                                        Engine
                                    </h3>
                                    <Select
                                        label="Configuration"
                                        placeholder="Inline"
                                        className="block"
                                        defaultSelectedKeys={[
                                            config[
                                                config.findIndex(
                                                    (i) =>
                                                        i.key ==
                                                        car.engine.config
                                                )
                                            ].key,
                                        ]}
                                        onChange={(event: any) =>
                                            setCar({
                                                ...car,
                                                engine: {
                                                    config: event.target.value,
                                                    cylinders:
                                                        car.engine.cylinders,
                                                    size: car.engine.size,
                                                    fuel: car.engine.fuel,
                                                },
                                            })
                                        }
                                    >
                                        {config.map(
                                            (type: {
                                                key: string;
                                                label: string;
                                            }) => (
                                                <SelectItem key={type.key}>
                                                    {type.label}
                                                </SelectItem>
                                            )
                                        )}
                                    </Select>
                                    <Select
                                        label="Cyliners"
                                        placeholder="4"
                                        className="block"
                                        defaultSelectedKeys={[
                                            cylinders[
                                                cylinders.findIndex(
                                                    (i) =>
                                                        i.key ==
                                                        car.engine.cylinders
                                                )
                                            ].key,
                                        ]}
                                        onChange={(event: any) =>
                                            setCar({
                                                ...car,
                                                engine: {
                                                    config: car.engine.config,
                                                    cylinders:
                                                        event.target.value,
                                                    size: car.engine.size,
                                                    fuel: car.engine.fuel,
                                                },
                                            })
                                        }
                                    >
                                        {cylinders.map(
                                            (type: {
                                                key: string;
                                                label: string;
                                            }) => (
                                                <SelectItem key={type.key}>
                                                    {type.label}
                                                </SelectItem>
                                            )
                                        )}
                                    </Select>
                                    <Select
                                        label="Size (l)"
                                        placeholder="1.8"
                                        className="block"
                                        defaultSelectedKeys={[
                                            size[
                                                size.findIndex(
                                                    (i) =>
                                                        i.key == car.engine.size
                                                )
                                            ].key,
                                        ]}
                                        onChange={(event: any) =>
                                            setCar({
                                                ...car,
                                                engine: {
                                                    config: car.engine.config,
                                                    cylinders:
                                                        car.engine.cylinders,
                                                    size: event.target.value,
                                                    fuel: car.engine.fuel,
                                                },
                                            })
                                        }
                                    >
                                        {size.map(
                                            (type: {
                                                key: string;
                                                label: string;
                                            }) => (
                                                <SelectItem key={type.key}>
                                                    {type.label}
                                                </SelectItem>
                                            )
                                        )}
                                    </Select>
                                    <Select
                                        label="Fuel Type"
                                        placeholder="Petrol"
                                        className="block"
                                        defaultSelectedKeys={[
                                            fuel[
                                                fuel.findIndex(
                                                    (i) =>
                                                        i.key == car.engine.fuel
                                                )
                                            ].key,
                                        ]}
                                        onChange={(event: any) =>
                                            setCar({
                                                ...car,
                                                engine: {
                                                    config: car.engine.config,
                                                    cylinders:
                                                        car.engine.cylinders,
                                                    size: car.engine.size,
                                                    fuel: event.target.value,
                                                },
                                            })
                                        }
                                    >
                                        {fuel.map(
                                            (type: {
                                                key: string;
                                                label: string;
                                            }) => (
                                                <SelectItem key={type.key}>
                                                    {type.label}
                                                </SelectItem>
                                            )
                                        )}
                                    </Select>
                                    <Button
                                        className="green w-[100%]"
                                        type="submit"
                                    >
                                        Update Car Info
                                    </Button>
                                </form>
                            </>
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
                                <Button
                                    className="green w-[100%]"
                                    onPress={() => setUpdate(true)}
                                >
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
