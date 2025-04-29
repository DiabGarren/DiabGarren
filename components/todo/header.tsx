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
            <svg
                className="absolute z-[2]"
                xmlns="http://www.w3.org/2000/svg"
                width="320"
                height="47"
                viewBox="0 0 320 47"
                fill="none"
            >
                <path
                    d="M0 7H320M320 40H0M320 10H0M320 13H0M320 16H0M320 19H0M320 22H0M320 25H0M320 28H0M320 31H0M320 34H0M320 37H0M320 43H0M320 4H0M320 1H0M320 46H0"
                    stroke="#002855"
                />
            </svg>
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
