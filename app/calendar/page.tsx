"use client"
import Popup from "reactjs-popup";

/* eslint-disable react/jsx-key */
export default function Calendar() {
    let today = new Date();
    let amtime = [{ time: 12, clock: "am" }];

    let eventTypes = ["Study", "Meeting", "Meal", "Exercise", "Other"]

    for (let i = 1; i <= 12; i++) {
        if (i == 12) amtime.push({ time: i, clock: "pm" });
        else amtime.push({ time: i, clock: "am" });
    }
    for (let i = 1; i <= 11; i++) {
        amtime.push({ time: i, clock: "pm" });
    }

    return (
        <main className="max-w-[900px] mx-auto my-[50px] px-[20px]">
            <h1 className="text-center text-[34px] font-[800]">Daily Schedule</h1>
            <p className="text-center text-[22px] font-[700]">{today.toLocaleString("default", { weekday: "short" })},{" "}
                {today.getDate()}{" "}
                {today.toLocaleString("default", { month: "short" })}{" "}
                {today.getFullYear()}</p>

            <div className="max-h-[650px] overflow-auto">
                {amtime.map((time) => {
                    return (<div className="flex my-[16px]">
                        <p className="w-[60px]">{time.time}{time.clock}</p>

                        <Popup
                            trigger={<button className="border-b-4 w-[100%] h-[32px]"></button>}
                            position={"bottom center"}>
                            <div className="bg-white p-[15px]">
                                {eventTypes.map((event) => {
                                    return <a  href="/calendar/newEvent" className="block text-[24px] px-[5px] rounded hover:bg-blue hover:text-white">{event}</a>
                                })}
                            </div>
                        </Popup>
                    </div>);
                })}
            </div>
        </main>
    );
}
