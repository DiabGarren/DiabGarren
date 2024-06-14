/* eslint-disable react/jsx-key */
"use client";
import PrintBody from "@/components/3DPrinting/body";
import { Item } from "@/lib/3DPrinting/item";
import { User } from "@/lib/3DPrinting/user";
import { Select, SelectItem, select } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function CreateOrder() {
    const [user, setUser] = useState<User>();
    const [cart, setCart] = useState(0);
    const [items, setItems] = useState<Item[]>([]);

    const [colours, setColours] = useState<
        {
            name: string;
            value: string;
        }[]
    >([]);
    const [selectedItem, setSelectedItem] = useState<Item>();
    const [choice, setChoice] = useState<{
        _id: string | undefined;
        name: string | undefined;
        size: string | undefined;
        colour: string | undefined;
        price: number | undefined;
    }>();

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
        const getItems = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/items")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        let dataItems = data.data.sort((a: Item, b: Item) => {
                            if (a.name.localeCompare(b.name) === 1) return 1;
                            else return -1;
                        });
                        dataItems = [
                            {
                                _id: "Custom",
                                name: undefined,
                                colours: undefined,
                                options: undefined,
                                bases: undefined,
                                images: [""],
                            },
                            ...dataItems,
                        ];

                        setItems(dataItems);
                    }
                });
        };
        const getColours = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/colours")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setColours(data.data);
                    }
                });
        };
        getUser();
        getItems();
        getColours();
    }, []);

    return (
        <PrintBody cart={cart} user={user} mainClass={undefined}>
            <>
                <Select
                    label="Select an item"
                    onChange={(item) => {
                        setSelectedItem(
                            items![
                                items!.findIndex(
                                    (i) => i._id === item.target.value
                                )
                            ]
                        );

                        if (item.target.value == "") {
                            setChoice({
                                _id: undefined,
                                name: undefined,
                                size: undefined,
                                colour: undefined,
                                price: undefined,
                            });
                        } else {
                            setChoice({
                                _id: items![
                                    items!.findIndex(
                                        (i) => i._id === item.target.value
                                    )
                                ]._id,
                                name: items![
                                    items!.findIndex(
                                        (i) => i._id === item.target.value
                                    )
                                ].name,
                                size: undefined,
                                colour: undefined,
                                price: undefined,
                            });
                        }
                    }}
                >
                    {items!.map((item: Item) => (
                        <SelectItem
                            className={`${
                                item._id == "Custom" ? "text-print-green" : ""
                            }`}
                            key={item._id}
                        >
                            {item.name || "Custom Item"}
                        </SelectItem>
                    ))}
                </Select>

                {selectedItem ? (
                    <>
                        <div className="my-[15px]">
                            <h2>Name</h2>
                            {selectedItem.name ? (
                                <p>{choice?.name}</p>
                            ) : (
                                <input
                                    type="text"
                                    className="form-input"
                                    value={choice?.name}
                                    onChange={(event) => {
                                        if (choice?._id === "Custom") {
                                            setChoice({
                                                ...choice,
                                                name: event.target.value,
                                            });
                                        }
                                    }}
                                />
                            )}
                        </div>
                        <div className="my-[15px]">
                            <h2>
                                Size (
                                {selectedItem?._id == "Custom" ? "mm" : "cm"}){" "}
                                <span className="text-[15px]">
                                    (length x width x height)
                                </span>
                            </h2>
                            <div className="flex flex-wrap gap-[10px]">
                                {selectedItem.options ? (
                                    selectedItem.options.map(
                                        (option, index) => {
                                            return (
                                                <div className="bg-print-blue-light-1 w-fit p-[2px_5px] rounded [&:has(input:checked)]:bg-print-blue [&:has(input:checked)]:text-white cursor-pointer">
                                                    <input
                                                        className="appearance-none"
                                                        type="radio"
                                                        name="size"
                                                        id={`${option?.size}-${index}`}
                                                        onClick={() =>
                                                            setChoice({
                                                                ...choice,
                                                                size: option?.size,
                                                                price: option?.price,
                                                            })
                                                        }
                                                        checked={
                                                            option?.size ===
                                                            choice?.size
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={`${option?.size}-${index}`}
                                                        className="cursor-pointer"
                                                    >
                                                        {option?.size
                                                            .split("x")
                                                            .map((x, index) => {
                                                                return `${x.substring(
                                                                    0,
                                                                    x.length - 1
                                                                )}${
                                                                    index ==
                                                                    option?.size.split(
                                                                        "x"
                                                                    ).length -
                                                                        1
                                                                        ? ""
                                                                        : "x"
                                                                }`;
                                                            })}
                                                    </label>
                                                </div>
                                            );
                                        }
                                    )
                                ) : (
                                    <input
                                        type="text"
                                        className="form-input"
                                        onChange={(event) =>
                                            setChoice({
                                                ...choice,
                                                size: event.target.value,
                                            })
                                        }
                                    />
                                )}
                            </div>
                        </div>
                        <div className="my-[15px]">
                            <h2>Colour</h2>
                            <div className="flex flex-wrap gap-[10px]">
                                {selectedItem.colours &&
                                selectedItem.colours.length > 0
                                    ? selectedItem.colours.map((colour) => {
                                          return (
                                              <div className="relative bg-print-blue-light-1 w-[50px] h-[50px] rounded-[50%] [&:has(input:checked)]:bg-print-blue cursor-pointer">
                                                  <input
                                                      className="appearance-none"
                                                      type="radio"
                                                      name="colour"
                                                      id={colour?.name}
                                                      onClick={() => {
                                                          setChoice({
                                                              ...choice,
                                                              colour: colour?.name,
                                                          });
                                                      }}
                                                      checked={
                                                          colour?.name ===
                                                          choice?.colour
                                                      }
                                                  />
                                                  <label
                                                      htmlFor={colour?.name}
                                                      style={{
                                                          backgroundColor:
                                                              colour?.value,
                                                      }}
                                                      className={`absolute block w-[46px] h-[46px] top-[2px] left-[2px] rounded-[50%] cursor-pointer`}
                                                  ></label>
                                              </div>
                                          );
                                      })
                                    : colours.map((colour) => {
                                          return (
                                              <div className="relative bg-print-blue-light-1 w-[50px] h-[50px] rounded-[50%] [&:has(input:checked)]:bg-print-blue cursor-pointer">
                                                  <input
                                                      className="appearance-none"
                                                      type="radio"
                                                      name="colour"
                                                      id={colour?.name}
                                                      onClick={() => {
                                                          setChoice({
                                                              ...choice,
                                                              colour: colour?.name,
                                                          });
                                                      }}
                                                      checked={
                                                          colour?.name ===
                                                          choice?.colour
                                                      }
                                                  />
                                                  <label
                                                      htmlFor={colour?.name}
                                                      style={{
                                                          backgroundColor:
                                                              colour?.value,
                                                      }}
                                                      className={`absolute block w-[46px] h-[46px] top-[2px] left-[2px] rounded-[50%] cursor-pointer`}
                                                  ></label>
                                              </div>
                                          );
                                      })}
                            </div>
                        </div>
                        <div className="my-[15px]">
                            <h2>Price</h2>
                            {selectedItem?._id == "Custom" ? (
                                <input
                                    type="number"
                                    className="form-input"
                                    onChange={(event) =>
                                        setChoice({
                                            ...choice,
                                            price: parseInt(event.target.value),
                                        })
                                    }
                                />
                            ) : (
                                <>
                                    {choice?.price ? (
                                        <p>R{choice?.price}</p>
                                    ) : (
                                        "R0"
                                    )}
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </>
        </PrintBody>
    );
}
