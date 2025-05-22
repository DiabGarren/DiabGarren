import Image from "next/image";

export default function Header() {
    return (
        <header className="grid grid-cols-[60px_1fr_60px] p-[5px_10px]">
            <a href="/DiabMotors">
                <Image
                    src={"/DiabMotors/icon.webp"}
                    alt={"Icon for Diab Motors"}
                    width={60}
                    height={60}
                />
            </a>
            <h1 className="w-100 self-center text-white text-center">
                Diab Motors
            </h1>
        </header>
    );
}
