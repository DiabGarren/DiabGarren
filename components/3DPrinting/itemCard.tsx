import ImageFallback from "./imageFallback";

export default function ItemCard(props: any) {
    return (
        <div className="grid border-2 border-print-blue rounded-lr w-[100%] sm:max-w-[400px] sm:mx-auto md:w-[300px]">
            <a href={`/3DPrinting/item/${props._id}`}>
                <ImageFallback
                    name={props.name}
                    src={props.images[0]}
                    width={400}
                    round={"t"}
                />
            </a>
            <div className="flex flex-col p-[10px] bg-print-blue-light-1 min-h-[110px] justify-center">
                <h2 className="text-[1.2rem] mb-[10px]">{props.name}</h2>
                <p>
                    {props.options.length > 1 ? "From" : ""} R
                    {props.options[0].price}
                </p>
                <p>{props.multiColour ? "Multilcolour Available" : ""}</p>
            </div>
            <a
                href={`/3DPrinting/item/${props._id}`}
                className="bg-print-blue rounded-b-[12px] text-center text-white text-[1.2rem] py-[2px] hover:bg-print-blue-light h-[33px]"
            >
                View Item
            </a>
        </div>
    );
}
