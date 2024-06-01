/* eslint-disable react/jsx-key */
export default function Calendar() {
    let today = new Date();
    let amtime = [12];
    let pmtime = [12];

    for (let i = 1; i <= 11; i++) {
        amtime.push(i);
        pmtime.push(i);
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
                        <p className="w-[60px]">{time}am</p>
                        <button className="border-b-4 w-[100%] h-[32px]"></button>
                    </div>);
                })}
                {pmtime.map((time) => {
                    return (<div className="flex my-[16px]">
                        <p className="w-[60px]">{time}pm</p>
                        <button className="border-b-4 w-[100%] h-[32px]"></button>
                    </div>);
                })}
            </div>
        </main>
    );
}
