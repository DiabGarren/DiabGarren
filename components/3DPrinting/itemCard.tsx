import ImageFallback from "./imageFallback";

export default function ItemCard(props: any) {
    return (
        <div className="grid border-2 border-print-blue rounded-lr w-[100%] md:w-[250px]">
            <a
                href={`/3DPrinting/item/${props._id}`}
                className="mx-auto">
                <ImageFallback
                    name={props.name}
                    src={props.images[0]}
                    width={250}
                />
            </a>
            <div className="p-[10px] border-t-2 bg-print-blue-light-1">
                <h2 className="text-[1.2rem]">{props.name}</h2>
                <p>
                    {props.options.length > 1 ? "From" : ""} R{props.options[0].price}
                </p>
            </div>
            <a
                href={`/3DPrinting/item/${props._id}`}
                className="bg-print-blue rounded-b-[12px] text-center text-white text-[1.2rem] py-[2px] hover:bg-print-blue-light">
                View Item
            </a>
        </div>
    );
}
