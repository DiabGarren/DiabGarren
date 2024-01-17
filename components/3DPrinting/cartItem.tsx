import ImageFallback from "./imageFallback";

export default function CartItem(props: any) {
    return (
        <div className="flex mb-[30px] gap-[10px]">
            <a className={`block border-2 border-print-blue rounded-lr`}>
                <ImageFallback
                    src={props.image}
                    name={props.name}
                    width={175}
                />
            </a>
            <div className="flex flex-col justify-evenly">
                <h2>{props.name}</h2>
                <p>Size: {props.size}</p>
                <div className="flex gap-[15px]">
                    <p>R{props.price}</p>
                    <p>Qty: {props.qty}</p>
                </div>

                <button className="bg-print-red hover:bg-white border-2 border-print-red rounded w-[150px] h-[30px] py-[2px] [&_svg_path]:hover:fill-print-red">
                    <svg
                        className="w-[100%] h-[100%]"
                        xmlns="http://www.w3.org/2000/svg"
                        width="226"
                        height="256"
                        viewBox="0 0 226 256"
                        fill="none">
                        <path
                            d="M158.5 30.0001C158.5 30.0001 154 0.00012207 134.5 0.00012207C134.5 0.00012207 106.5 0.00012207 91.5002 0.00012207C72.0002 0.00012207 67.5002 30.0001 67.5002 30.0001H83.5002C83.5002 30.0001 85.5002 15.0001 92.5002 15.0001H133.5C139.5 15.0001 143 30.0001 143 30.0001H158.5Z"
                            fill="white"
                        />
                        <path
                            d="M0.500126 50C0.500116 57.6264 0.50013 62 0.500126 67.5C0.500122 73 3.70767 75 7.5 75C13 75 212 75 218.5 75C222.5 75 225.5 71.5 225.5 68.5C225.5 60.5 225.5 57 225.5 48.5C225.5 43.3159 217.5 30.0001 205 30.0001C188 30.0001 158.5 30.0001 158.5 30.0001H143H83.5002H67.5002C67.5002 30.0001 39 30.0001 20.5 30.0001C7 31.5 0.500134 44 0.500126 50Z"
                            fill="white"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M17.5001 90.9999H208.5C208.5 90.9999 200 197 196.366 240C192.5 249.5 185 255.5 176.5 256H49.0001C39.5001 255.5 29.6523 246 29.0001 236C27.5001 213 17.5001 90.9999 17.5001 90.9999ZM113 225.5C105.5 225.5 105.5 220 105.5 220V112C105.5 112 105.5 106.5 113 106.5C120.5 106.5 120.5 112 120.5 112V220C120.5 220 120.5 225.5 113 225.5ZM60.5001 220C60.5001 220 60.5002 225.5 68.0002 225.5C75.5002 225.5 75.5002 220 75.5002 220V112C75.5002 112 75.5002 106.5 68.0002 106.5C60.5002 106.5 60.5001 112 60.5001 112V220ZM158 225.5C150.5 225.5 150.5 220 150.5 220V112C150.5 112 150.5 106.5 158 106.5C165.5 106.5 165.5 112 165.5 112V220C165.5 220 165.5 225.5 158 225.5Z"
                            fill="white"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
