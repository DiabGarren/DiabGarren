import ImageFallback from "./imageFallback";

export default function CheckoutItem(props: any) {
    return (
        <div className="flex border-b border-print-grey-light-1 py-[5px] last:border-none gap-[5px] justify-center">
            <div className="w-[30%] md:w-[150px] self-center">
                <ImageFallback
                    src={props.image}
                    name={props.name}
                    width={200}
                />
            </div>
            <div className="w-[200px]">
                <h3 className="text-[18px] font-[500]">{props.name}</h3>
                <p>Size: {props.size}</p>
                <p>
                    Colour: {props.colour[0]?.toUpperCase()}
                    {props.colour?.indexOf("_") > -1
                        ? props.colour?.substring(
                              1,
                              props.colour?.indexOf("_")
                          ) +
                          " " +
                          props.colour?.substring(
                              props.colour?.indexOf("_") + 1
                          )
                        : props.colour?.substring(1)}
                </p>
                <p className="text-print-green">
                    {props.multiColour ? "Multicolour Available!" : ""}
                </p>
                {props.base ? (
                    <p>
                        Base: {props.base[0]?.toUpperCase()}
                        {props.base?.substring(1)}
                    </p>
                ) : (
                    <></>
                )}
                <p>
                    R{props.price}{" "}
                    <span className="ml-[10px]">Qty: {props.qty}</span>
                </p>
            </div>
        </div>
    );
}
