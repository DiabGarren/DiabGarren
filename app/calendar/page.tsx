export default function Calendar() {
    let today = new Date();
    return (<main className="max-w-[900px] mx-auto my-[50px]">
        <h1 className="text-center text-[34px]">Calendar</h1>
        <p>{today.getFullYear()}</p>
    </main>);
}
