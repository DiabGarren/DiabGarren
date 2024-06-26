import Image from "next/image";
import Popup from "reactjs-popup";

export default function Header(props: any) {
    let profile = (
        <a
            href="/3DPrinting/login"
            className="flex items-center justify-center w-[40px] md:w-[60px] h-[40px] md:h-[60px] rounded-[50%] border-2 p-[5px] hover:bg-print-blue-light cursor-pointer justify-self-end mr-[10px]"
        >
            <svg
                className="w-[93%] h-[100%]"
                xmlns="http://www.w3.org/2000/svg"
                width="69"
                height="67"
                viewBox="0 0 69 67"
                fill="none"
            >
                <path
                    d="M2 67C2 59.591 8.09375 50.4981 16.2187 50.4982C30.4973 50.4982 38.901 50.4982 52.7812 50.4982C61.3136 50.4981 67 58.9175 67 67M14.1875 22.8828C14.4633 33.9465 23.3763 42.5733 34.5 42.7524C46.0907 42.939 55.7769 33.4006 55.4896 21.8725C55.2091 10.6198 45.8137 1.81613 34.5 2.00292C23.0948 2.19122 13.9047 11.5391 14.1875 22.8828Z"
                    stroke="white"
                    stroke-width="4"
                />
            </svg>
        </a>
    );
    if (props.user) {
        let cartLength = 0;
        props.user.cart.forEach((item: any) => {
            cartLength += item.qty;
        });
        profile = (
            <div className="flex justify-end items-center">
                <a
                    href="/3DPrinting/cart"
                    className="cursor-pointer relative [&_p]:hover:bg-print-blue-light w-[50px] md:w-[60px] h-[50px] md:h-[60px] mr-[10px]"
                >
                    <svg
                        className="w-[93%] h-[100%]"
                        xmlns="http://www.w3.org/2000/svg"
                        width="69"
                        height="54"
                        viewBox="0 0 132 117"
                        fill="none"
                    >
                        <path
                            d="M2 2L18.5 4L24.125 20.5M41 70C41 70 37 75.5 34 80.5C31.9983 83.8361 34 90 37 90C65 90 114 90 114 90M41 70H63.5M41 70L35.5 53.8667M24.125 20.5H46.8125M24.125 20.5L29.8125 37.1833M91.5 20.5H129.5L124.276 37.1833M91.5 20.5L108 70M91.5 20.5H69.5M108 70H114L119.052 53.8667M108 70H86M69.5 20.5L86 70M69.5 20.5H46.8125M86 70H63.5M46.8125 20.5L63.5 70M35.5 53.8667H119.052M35.5 53.8667L29.8125 37.1833M119.052 53.8667L124.276 37.1833M29.8125 37.1833H124.276M44 100C39.9959 100.138 36.8619 103.496 37 107.5C37.1332 111.364 40.4218 114.1 44 114.5C47.9817 114.945 51.3619 111.504 51.5 107.5C51.6427 103.36 48.1397 99.8573 44 100ZM105 100C100.639 99.2376 96.3493 103.076 96.5 107.5C96.6464 111.798 100.764 115.241 105 114.5C108.547 113.879 110.878 111.098 111 107.5C111.127 103.751 108.695 100.646 105 100Z"
                            stroke="white"
                            stroke-width="4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <p className="absolute top-0 right-0 flex border-[2px] rounded-[50%] w-[20px] md:w-[25px] h-[20px] md:h-[25px] justify-center items-center text-white bg-print-blue">
                        {props.cart ? props.cart : cartLength}
                    </p>
                </a>

                <Popup
                    trigger={
                        <a
                            // href="/3DPrinting/profile"
                            className="flex items-center justify-center w-[40px] md:w-[60px] h-[40px] md:h-[60px] rounded-[50%] border-2 p-[5px] hover:bg-print-blue-light cursor-pointer justify-self-end mr-[10px]"
                        >
                            <svg
                                className="w-[93%] h-[100%]"
                                xmlns="http://www.w3.org/2000/svg"
                                width="69"
                                height="67"
                                viewBox="0 0 69 67"
                                fill="none"
                            >
                                <path
                                    d="M2 67C2 59.591 8.09375 50.4981 16.2187 50.4982C30.4973 50.4982 38.901 50.4982 52.7812 50.4982C61.3136 50.4981 67 58.9175 67 67M14.1875 22.8828C14.4633 33.9465 23.3763 42.5733 34.5 42.7524C46.0907 42.939 55.7769 33.4006 55.4896 21.8725C55.2091 10.6198 45.8137 1.81613 34.5 2.00292C23.0948 2.19122 13.9047 11.5391 14.1875 22.8828Z"
                                    stroke="white"
                                    stroke-width="4"
                                />
                            </svg>
                        </a>
                    }
                    position={"bottom right"}
                >
                    <div className="flex flex-col first:[&_a]:rounded-t-md [&_a]:border-b [&_a]:border-print-blue-dark [&_button]:rounded-b-md w-[300px] [&_*]:bg-print-blue [&_*]:text-white [&_*]:text-center [&_*]:text-[18px] [&_*]:p-[10px_0] hover:[&_*]:bg-print-blue-light ">
                        <a href="/3DPrinting/orders">Orders</a>
                        {props.user.level === 2 ? (
                            <>
                                <a href="/3DPrinting/allOrders/">All Orders</a>
                                <a href="/3DPrinting/createOrder/">
                                    Create Order
                                </a>
                                <a href="/3DPrinting/costCalculator">
                                    Cost Calculator
                                </a>
                            </>
                        ) : (
                            <></>
                        )}
                        <button
                            onClick={async () => {
                                await fetch(
                                    process.env.NEXT_PUBLIC_API_URL +
                                        "/3DPrinting/logout",
                                    {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    }
                                )
                                    .then((res) => res.json())
                                    .then((data) => {
                                        if (data.status === "success") {
                                            window.location.href =
                                                "/3DPrinting";
                                        }
                                    });
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </Popup>
            </div>
        );
    }

    return (
        <header
            className={`grid ${
                props.user
                    ? "grid-cols-[50px_1fr_110px] md:grid-cols-[160px_1fr_160px]"
                    : "grid-cols-[50px_1fr_50px] md:grid-cols-[70px_1fr_70px]"
            } h-[60px] md:h-[80px] items-center bg-gradient-to-r from-print-red to-print-blue no-print`}
        >
            <a href="/3DPrinting" className="block">
                <Image
                    className="ml-[5px] md:ml-[10px] w-[55px] md:w-[60px]"
                    src="/3DPrinting/LogoGlow.png"
                    alt="3D Printing Logo"
                    width={60}
                    height={60}
                />
            </a>
            <h1 className="text-white text-[25px] md:text-[30px] font-[700] text-center">
                3D Printing
            </h1>
            {profile}
        </header>
    );
}
