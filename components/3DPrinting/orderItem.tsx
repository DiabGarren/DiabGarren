/* eslint-disable react/jsx-key */
import ImageFallback from "./imageFallback";

export default function OrderItem(props: any) {
  let orderDate = new Date(props.date);
  return (
    <a
      href={`/3DPrinting/orders/${props._id}`}
      className="block odd:bg-print-grey-light p-[5px] [&>h3]:hover:underline"
    >
      <h3 className="text-[18px] font-[500] text-print-blue-dark">
        {orderDate.toLocaleString("default", { weekday: "short" })},{" "}
        {orderDate.getDate()}{" "}
        {orderDate.toLocaleString("default", { month: "short" })}{" "}
        {orderDate.getFullYear()}
      </h3>
      <p>Status: {props.status} </p>

      <div className="flex felx-row gap-[2px]">
        {props.order.map((item: any, index: number) => {
          if (index < 2) {
            return (
              <ImageFallback src={item.image} name={item.name} width={120} />
            );
          } else if (index == 2) {
            return (
              <h3 className="self-center ml-[15px] text-[20px] font-[600]">
                +{props.order.length - 2}
              </h3>
            );
          } else {
            return <></>;
          }
        })}
      </div>
    </a>
  );
}
