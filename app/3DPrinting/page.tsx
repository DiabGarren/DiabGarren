import Image from "next/image";

export default function Page() {
    return (
        <>
            <header className="grid grid-cols-[70px_1fr_50px] h-[80px] items-center bg-gradient-to-r from-[#d81a00] to-[#0156f6]">
                <Image
                    className="mx-[20px]"
                    src="/3DPrinting/LogoGlow.png"
                    alt="3D Printing Logo"
                    width={60}
                    height={60}
                />
                <h1 className="text-white text-[30px] font-[700] text-center">
                    Custom 3D Printing
                </h1>
            </header>
            <main></main>
        </>
    );
}
