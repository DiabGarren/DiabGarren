/* eslint-disable react/jsx-key */
"use client";
import Header from "@/components/DiabMotors/header";
import ImageFallback from "@/components/DiabMotors/imageFallback";
import { useEffect, useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { DatePicker } from "@heroui/react";
import Image from "next/image";
import Back from "@/components/DiabMotors/back";
import { useRouter } from "next/navigation";

export default function Car({ params }: { params: { id: string } }) {
    const { push } = useRouter();
    const [car, setCar] = useState({
        _id: "",
        make: "",
        model: "",
        year: "",
        colour: "",
        engine: { config: "", cylinders: "", size: "", fuel: "" },
        driveType: "",
        image: "",
        registration: "",
    });

    const [maintenance, setMaintenance] = useState<
        {
            _id: string;
            carId: string;
            date: string;
            odometer: string;
            name: string;
            description: string;
        }[]
    >([]);
    const [newMaintenance, setNewMaintenance] = useState({
        carId: params.id,
        date: "",
        odometer: "",
        name: "",
        description: "",
    });

    const [update, setUpdate] = useState(false);
    const [add, setAdd] = useState(false);

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
        const getMaintenance = async () => {
            fetch(
                process.env.NEXT_PUBLIC_API_URL +
                    "/DiabMotors/maintenance/" +
                    params.id
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data.status == "success") setMaintenance(data.data);
                });
        };
        getCar();
        getMaintenance();
    }, []);

    console.log(maintenance);

    return (
        <>
            <Header />
            <main className="w-[90%] xsm:w-[85%] sm:w-[80%] mx-auto">
                <Back href={""} />
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
                                    className="mt-[20px]"
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
                                        className="green w-[100%] m-[10px_0px_5px_0px]"
                                        type="submit"
                                    >
                                        Update Car Info
                                    </Button>
                                    <Button
                                        className="red w-[100%] my-[5px]"
                                        onPress={() => setUpdate(false)}
                                    >
                                        Cancel
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

                                <div>
                                    <h2 className="text-center mt-[20px]">
                                        Maintenance History
                                    </h2>
                                    {maintenance.length == 0 ? (
                                        <h3 className="text-center">
                                            No past maintenance
                                        </h3>
                                    ) : (
                                        <div>
                                            {maintenance.map((item: any) => {
                                                return (
                                                    <div className="maintenance-card">
                                                        <div className="maintenance-card-title">
                                                            <p>{item.date}</p>
                                                            <p>
                                                                {item.odometer}{" "}
                                                                km
                                                            </p>
                                                        </div>
                                                        <div className="maintenance-card-details">
                                                            <h3>{item.name}</h3>
                                                            <p>
                                                                {
                                                                    item.description
                                                                }
                                                            </p>
                                                            <button
                                                                className="red maintenance-card-delete"
                                                                onClick={async () => {
                                                                    const res =
                                                                        await fetch(
                                                                            process
                                                                                .env
                                                                                .NEXT_PUBLIC_API_URL +
                                                                                "/DiabMotors/maintenance/delete/" +
                                                                                item._id,
                                                                            {
                                                                                method: "DELETE",
                                                                            }
                                                                        );

                                                                    console.log(
                                                                        res
                                                                    );

                                                                    if (
                                                                        res.status ==
                                                                        200
                                                                    ) {
                                                                        push(
                                                                            "/DiabMotors/car/" +
                                                                                params.id +
                                                                                "/deleteMaintenance"
                                                                        );
                                                                    }
                                                                }}
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="20"
                                                                    height="20"
                                                                    viewBox="0 0 226 256"
                                                                    fill="none"
                                                                >
                                                                    <path
                                                                        d="M158.5 30.0001C158.5 30.0001 154 0.00012207 134.5 0.00012207C134.5 0.00012207 106.5 0.00012207 91.5002 0.00012207C72.0002 0.00012207 67.5002 30.0001 67.5002 30.0001H83.5002C83.5002 30.0001 85.5002 15.0001 92.5002 15.0001H133.5C139.5 15.0001 143 30.0001 143 30.0001H158.5Z"
                                                                        fill="black"
                                                                    />
                                                                    <path
                                                                        d="M0.500126 50C0.500116 57.6264 0.50013 62 0.500126 67.5C0.500122 73 3.70767 75 7.5 75C13 75 212 75 218.5 75C222.5 75 225.5 71.5 225.5 68.5C225.5 60.5 225.5 57 225.5 48.5C225.5 43.3159 217.5 30.0001 205 30.0001C188 30.0001 158.5 30.0001 158.5 30.0001H143H83.5002H67.5002C67.5002 30.0001 39 30.0001 20.5 30.0001C7 31.5 0.500134 44 0.500126 50Z"
                                                                        fill="black"
                                                                    />
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        clip-rule="evenodd"
                                                                        d="M17.5001 90.9999H208.5C208.5 90.9999 200 197 196.366 240C192.5 249.5 185 255.5 176.5 256H49.0001C39.5001 255.5 29.6523 246 29.0001 236C27.5001 213 17.5001 90.9999 17.5001 90.9999ZM113 225.5C105.5 225.5 105.5 220 105.5 220V112C105.5 112 105.5 106.5 113 106.5C120.5 106.5 120.5 112 120.5 112V220C120.5 220 120.5 225.5 113 225.5ZM60.5001 220C60.5001 220 60.5002 225.5 68.0002 225.5C75.5002 225.5 75.5002 220 75.5002 220V112C75.5002 112 75.5002 106.5 68.0002 106.5C60.5002 106.5 60.5001 112 60.5001 112V220ZM158 225.5C150.5 225.5 150.5 220 150.5 220V112C150.5 112 150.5 106.5 158 106.5C165.5 106.5 165.5 112 165.5 112V220C165.5 220 165.5 225.5 158 225.5Z"
                                                                        fill="black"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                    {add ? (
                                        <form
                                            className="w-[80%] mx-auto"
                                            onSubmit={async (event) => {
                                                event.preventDefault();
                                                const res = await fetch(
                                                    process.env
                                                        .NEXT_PUBLIC_API_URL +
                                                        "/DiabMotors/maintenance/" +
                                                        params.id,
                                                    {
                                                        method: "POST",
                                                        body: JSON.stringify(
                                                            newMaintenance
                                                        ),
                                                    }
                                                );

                                                if (res.status === 201) {
                                                    push(
                                                        "/DiabMotors/car/" +
                                                            params.id +
                                                            "/addMaintenance"
                                                    );
                                                }
                                            }}
                                        >
                                            <DatePicker
                                                label="Maintenance Date"
                                                showMonthAndYearPickers
                                                firstDayOfWeek="mon"
                                                onChange={(event: any) => {
                                                    setNewMaintenance({
                                                        ...newMaintenance,
                                                        date: `${event.day}/${event.month}/${event.year}`,
                                                    });
                                                }}
                                            />
                                            <Input
                                                label="Odometer (km)"
                                                placeholder="125000"
                                                onChange={(event) =>
                                                    setNewMaintenance({
                                                        ...newMaintenance,
                                                        odometer:
                                                            event.target.value,
                                                    })
                                                }
                                            />
                                            <Input
                                                label="Title"
                                                placeholder="Oil Change"
                                                onChange={(event) =>
                                                    setNewMaintenance({
                                                        ...newMaintenance,
                                                        name: event.target
                                                            .value,
                                                    })
                                                }
                                            />
                                            <Input
                                                label="Description"
                                                placeholder="Castrol Magnatec 20W40"
                                                onChange={(event) =>
                                                    setNewMaintenance({
                                                        ...newMaintenance,
                                                        description:
                                                            event.target.value,
                                                    })
                                                }
                                            />

                                            <Button
                                                className="green w-[100%] mt-[20px]"
                                                type="submit"
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                className="red w-[100%] mt-[20px]"
                                                onPress={() => setAdd(false)}
                                            >
                                                Cancel
                                            </Button>
                                        </form>
                                    ) : (
                                        <></>
                                    )}
                                    <Button
                                        className="green w-[100%] mt-[20px]"
                                        onPress={() => setAdd(true)}
                                    >
                                        Add Maintenace
                                    </Button>
                                </div>
                            </>
                        )}
                    </>
                )}
            </main>
        </>
    );
}
