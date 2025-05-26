"use client";
import Header from "@/components/DiabMotors/header";
import { useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Page() {
    const { push } = useRouter();
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

    return (
        <>
            <Header />
            <main>
                <h2 className="text-center">Add a New Car</h2>
                <form
                    onSubmit={async (event) => {
                        event.preventDefault();
                        const res = await fetch(
                            process.env.NEXT_PUBLIC_API_URL +
                                "/DiabMotors/cars",
                            { method: "POST", body: JSON.stringify(car) }
                        );

                        if (res.status === 201) {
                            push("/DiabMotors");
                        }
                    }}
                >
                    <Input
                        label="Make"
                        placeholder="Nissan"
                        className="block"
                        onChange={(event: any) =>
                            setCar({ ...car, make: event.target.value })
                        }
                    />
                    <Input
                        label="Model"
                        placeholder="180sx"
                        className="block"
                        onChange={(event: any) =>
                            setCar({ ...car, model: event.target.value })
                        }
                    />
                    <Input
                        label="Year"
                        placeholder="1990"
                        className="block"
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
                        className="block"
                        onChange={(event: any) =>
                            setCar({ ...car, colour: event.target.value })
                        }
                    />
                    <Input
                        label="Registration"
                        placeholder="ABC 132 XX"
                        className="block"
                        onChange={(event: any) =>
                            setCar({ ...car, registration: event.target.value })
                        }
                    />
                    <Select
                        label="Drive Type"
                        placeholder="Front Wheel Drive"
                        className="block"
                        onChange={(event: any) =>
                            setCar({ ...car, driveType: event.target.value })
                        }
                    >
                        {driveType.map(
                            (type: { key: string; label: string }) => (
                                <SelectItem key={type.key}>
                                    {type.label}
                                </SelectItem>
                            )
                        )}
                    </Select>

                    <h3 className="text-center mt-[15px]">Engine</h3>
                    <Select
                        label="Configuration"
                        placeholder="Inline"
                        className="block"
                        onChange={(event: any) =>
                            setCar({
                                ...car,
                                engine: {
                                    config: event.target.value,
                                    cylinders: car.engine.cylinders,
                                    size: car.engine.size,
                                    fuel: car.engine.fuel,
                                },
                            })
                        }
                    >
                        {config.map((type: { key: string; label: string }) => (
                            <SelectItem key={type.key}>{type.label}</SelectItem>
                        ))}
                    </Select>
                    <Select
                        label="Cyliners"
                        placeholder="4"
                        className="block"
                        onChange={(event: any) =>
                            setCar({
                                ...car,
                                engine: {
                                    config: car.engine.config,
                                    cylinders: event.target.value,
                                    size: car.engine.size,
                                    fuel: car.engine.fuel,
                                },
                            })
                        }
                    >
                        {cylinders.map(
                            (type: { key: string; label: string }) => (
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
                        onChange={(event: any) =>
                            setCar({
                                ...car,
                                engine: {
                                    config: car.engine.config,
                                    cylinders: car.engine.cylinders,
                                    size: event.target.value,
                                    fuel: car.engine.fuel,
                                },
                            })
                        }
                    >
                        {size.map((type: { key: string; label: string }) => (
                            <SelectItem key={type.key}>{type.label}</SelectItem>
                        ))}
                    </Select>
                    <Select
                        label="Fuel Type"
                        placeholder="Petrol"
                        className="block"
                        onChange={(event: any) =>
                            setCar({
                                ...car,
                                engine: {
                                    config: car.engine.config,
                                    cylinders: car.engine.cylinders,
                                    size: car.engine.size,
                                    fuel: event.target.value,
                                },
                            })
                        }
                    >
                        {fuel.map((type: { key: string; label: string }) => (
                            <SelectItem key={type.key}>{type.label}</SelectItem>
                        ))}
                    </Select>
                    <Button className="green w-[100%]" type="submit">
                        Add Car
                    </Button>
                </form>
            </main>
        </>
    );
}
