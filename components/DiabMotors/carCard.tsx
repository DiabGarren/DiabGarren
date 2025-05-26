import Image from "next/image";

export default function CarCard(props: any) {
    console.log(props.image);

    return (
        <div>
            <p>
                <div
                    className={`h-[60px] bg-[url(/DiabMotors/cars/${props.image})]`}
                ></div>
                <span>{props.make}</span> <span>{props.model}</span>
            </p>
        </div>
    );
}
