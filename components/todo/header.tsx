import Image from "next/image";

export default function ToDoHeader() {
    return (
        <header className="h-[50px] bg-todo-blue-4 align-middle">
            <div className="absolute grid grid-cols-[60px_1fr] z-[3]">
                <Image
                    className="m-[4px_0_0_8px]"
                    src={"/todo/header/TickGreen_blur.svg"}
                    alt="Icon"
                    width={43}
                    height={40}
                />
                <h1 className="text-[38px] h-[50px] leading-[50px] header-blur">
                    ToDo_
                </h1>
            </div>
            <div className="absolute w-[100%] h-[50px] bg-[url('/todo/ScanLines.svg')] z-[2]"></div>
            <div className="absolute grid grid-cols-[60px_1fr] z-[1]">
                <Image
                    className="m-[7px_0_0_13px]"
                    src={"/todo/header/TickGreen.svg"}
                    alt="Icon"
                    width={38}
                    height={35}
                />
                <h1 className="text-white text-[38px] h-[50px] leading-[50px]">
                    ToDo_
                </h1>
            </div>
        </header>
    );
}
