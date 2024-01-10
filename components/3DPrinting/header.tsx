import Image from "next/image";

export default function Header(props: any) {
    let profile = (
        <a
            href="/3DPrinting/login"
            className="flex items-center justify-center w-[60px] h-[60px] rounded-[50%] border-2 p-[5px] hover:bg-print-blue-light cursor-pointer">
            <svg
                className="w-[93%] h-[100%]"
                xmlns="http://www.w3.org/2000/svg"
                width="69"
                height="67"
                viewBox="0 0 69 67"
                fill="none">
                <path
                    d="M2 67C2 59.591 8.09375 50.4981 16.2187 50.4982C30.4973 50.4982 38.901 50.4982 52.7812 50.4982C61.3136 50.4981 67 58.9175 67 67M14.1875 22.8828C14.4633 33.9465 23.3763 42.5733 34.5 42.7524C46.0907 42.939 55.7769 33.4006 55.4896 21.8725C55.2091 10.6198 45.8137 1.81613 34.5 2.00292C23.0948 2.19122 13.9047 11.5391 14.1875 22.8828Z"
                    stroke="white"
                    stroke-width="4"
                />
            </svg>
        </a>
    );
    if (props.user) {
        profile = (
            <a
                href="/3DPrinting/profile"
                className="flex items-center justify-center w-[60px] h-[60px] rounded-[50%] border-2 p-[5px] hover:bg-print-blue-light cursor-pointer">
                <svg
                    className="w-[93%] h-[100%]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="69"
                    height="67"
                    viewBox="0 0 69 67"
                    fill="none">
                    <path
                        d="M2 67C2 59.591 8.09375 50.4981 16.2187 50.4982C30.4973 50.4982 38.901 50.4982 52.7812 50.4982C61.3136 50.4981 67 58.9175 67 67M14.1875 22.8828C14.4633 33.9465 23.3763 42.5733 34.5 42.7524C46.0907 42.939 55.7769 33.4006 55.4896 21.8725C55.2091 10.6198 45.8137 1.81613 34.5 2.00292C23.0948 2.19122 13.9047 11.5391 14.1875 22.8828Z"
                        stroke="white"
                        stroke-width="4"
                    />
                </svg>
            </a>
        );
    }

    return (
        <header className="grid grid-cols-[70px_1fr_70px] h-[80px] items-center bg-gradient-to-r from-print-red to-print-blue">
            <a
                href="/3DPrinting"
                className="block">
                <Image
                    className="mx-[20px]"
                    src="/3DPrinting/LogoGlow.png"
                    alt="3D Printing Logo"
                    width={60}
                    height={60}
                />
            </a>
            <h1 className="text-white text-[30px] font-[700] text-center">
                {props.title || "Custom 3D Printing"}
            </h1>
            {profile}
        </header>
    );
}
