"use client";
import PrintBody from "@/components/3DPrinting/body";
import { User } from "@/lib/3DPrinting/user";
import { useEffect, useState } from "react";

export default function CostCalculator() {
    const [user, setUser] = useState<User>();
    const [cart, setCart] = useState(0);

    const [itemHours, setItemHours] = useState(0);
    const [itemMin, setItemMin] = useState(0);
    const [itemWeight, setItemWeight] = useState(0);

    const [filamentCost, setFilamentCost] = useState(0);
    const [filamentWeight, setFilamentWeight] = useState(0);
    const [filamentMarkup, setFilamentMarkup] = useState(0);
    const [printerCost, setPrinterCost] = useState(0);
    const [repairCost, setRepairCost] = useState(0);
    const [returnTerm, setReturnTerm] = useState(0);
    const [dailyUsage, setDailyUsage] = useState(0);
    const [VAT, setVAT] = useState(0);
    const [itemCost, setItemCost] = useState("");

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
        const getExtras = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/extras")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setFilamentCost(data.data.filamentCost);
                        setFilamentWeight(data.data.filamentWeight);
                        setFilamentMarkup(data.data.filamentMarkup);
                        setPrinterCost(data.data.printerCost);
                        setRepairCost(data.data.repairCost);
                        setReturnTerm(data.data.returnTerm);
                        setDailyUsage(data.data.dailyUsage);
                        setVAT(data.data.VAT);
                        setItemCost(data.data.itemCost);
                    }
                });
        };
        getUser();
        getExtras();
    }, []);

    return (
        <PrintBody
            user={user}
            cart={cart}
            mainClass={"my-[50px] mx-auto md:w-[500px]"}
        >
            <form
                onSubmit={(e) => e.preventDefault()}
                className="shadow-2xl rounded-lr p-[20px]"
            >
                <div className="grid grid-cols-3 gap-[5px] mb-[30px]">
                    <h2 className="col-[1/4]">Print</h2>
                    <div>
                        <label>Hours</label>
                        <div className="bg-print-grey-light rounded p-[2px_7px] mb-[5px] w-[100%] border-b-[2px] border-grey">
                            <input
                                type="number"
                                name="itemHours"
                                id="itemHours"
                                className="bg-print-grey-light w-[100%]"
                                placeholder="Item Hours"
                                value={itemHours}
                                onChange={(event) =>
                                    setItemHours(parseInt(event.target.value))
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <label>Minutes</label>
                        <div className="bg-print-grey-light rounded p-[2px_7px] mb-[5px] w-[100%] border-b-[2px] border-grey">
                            <input
                                type="number"
                                name="itemMin"
                                id="itemMin"
                                className="bg-print-grey-light w-[100%]"
                                placeholder="Item Min"
                                value={itemMin}
                                onChange={(event) =>
                                    setItemMin(parseInt(event.target.value))
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <label>Weight (g)</label>
                        <div className="bg-print-grey-light rounded p-[2px_7px] mb-[5px] w-[100%] border-b-[2px] border-grey">
                            <input
                                type="number"
                                name="itemWeight"
                                id="itemWeight"
                                className="bg-print-grey-light w-[100%]"
                                placeholder="Item Weight"
                                value={itemWeight}
                                onChange={(event) =>
                                    setItemWeight(parseInt(event.target.value))
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-[5px] mb-[30px]">
                    <h2 className="col-[1/3]">Filament</h2>
                    <div>
                        <label>Filament Cost</label>
                        <div className="bg-print-grey-light rounded p-[2px_7px] mb-[5px] w-[100%] border-b-[2px] border-grey">
                            <span>R</span>
                            <input
                                type="number"
                                name="filamentCost"
                                id="filamentCost"
                                className="bg-print-grey-light ml-[5px] w-[60px]"
                                placeholder="Filament Cost"
                                value={filamentCost}
                                onChange={(event) =>
                                    setFilamentCost(
                                        parseInt(event.target.value)
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <label>Filament Weight (g)</label>
                        <div className="bg-print-grey-light rounded p-[2px_7px] mb-[5px] w-[100%] border-b-[2px] border-grey">
                            <input
                                type="number"
                                name="filamentWeight"
                                id="filamentWeight"
                                className="bg-print-grey-light w-[60px]"
                                placeholder="Filament Weight"
                                value={filamentWeight}
                                onChange={(event) =>
                                    setFilamentWeight(
                                        parseInt(event.target.value)
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div className="col-[1/3]">
                        <label>Markup</label>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            className="w-[100%]"
                            value={filamentMarkup * 100}
                            onChange={(event) =>
                                setFilamentMarkup(
                                    parseInt(event.target.value) / 100
                                )
                            }
                        />
                        <p className="w-[100%] text-center">
                            {Math.floor(filamentMarkup * 100)}%
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-[5px] mb-[30px]">
                    <h2 className="col-[1/4]">Maintenance</h2>
                    <div>
                        <label>Printer Cost</label>
                        <div className="bg-print-grey-light rounded p-[2px_7px] mb-[5px] w-[100%] border-b-[2px] border-grey">
                            <input
                                type="number"
                                name="printerCost"
                                id="printerCost"
                                className="bg-print-grey-light w-[100%]"
                                placeholder="Filament Cost"
                                value={printerCost}
                                onChange={(event) =>
                                    setPrinterCost(parseInt(event.target.value))
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <label>Return Term (y)</label>
                        <div className="bg-print-grey-light rounded p-[2px_7px] mb-[5px] w-[100%] border-b-[2px] border-grey">
                            <input
                                type="number"
                                name="returnTerm"
                                id="returnTerm"
                                className="bg-print-grey-light w-[100%]"
                                placeholder="Return Term"
                                value={returnTerm}
                                onChange={(event) =>
                                    setReturnTerm(parseInt(event.target.value))
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <label>Avg Daily Usage (h)</label>
                        <div className="bg-print-grey-light rounded p-[2px_7px] mb-[5px] w-[100%] border-b-[2px] border-grey">
                            <input
                                type="number"
                                name="dailyUsage"
                                id="dailyUsage"
                                className="bg-print-grey-light w-[100%]"
                                placeholder="Ave Daily Usage"
                                value={dailyUsage}
                                onChange={(event) =>
                                    setDailyUsage(parseInt(event.target.value))
                                }
                            />
                        </div>
                    </div>
                    <div className="col-[1/4]">
                        <label>Repair Cost</label>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            className="w-[100%]"
                            value={repairCost * 100}
                            onChange={(event) =>
                                setRepairCost(
                                    parseInt(event.target.value) / 100
                                )
                            }
                        />
                        <p className="w-[100%] text-center">
                            {Math.floor(repairCost * 100)}%
                        </p>
                    </div>
                </div>
                <div>
                    <h2>VAT</h2>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        className="w-[100%]"
                        value={VAT * 100}
                        onChange={(event) =>
                            setVAT(parseInt(event.target.value) / 100)
                        }
                    />
                    <p className="w-[100%] text-center">
                        {Math.floor(VAT * 100)}%
                    </p>
                </div>
                <p>Item Cost: R {Math.round(eval(itemCost) * 100) / 100}</p>
            </form>
        </PrintBody>
    );
}
