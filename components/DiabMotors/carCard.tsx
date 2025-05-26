import ImageFallback from "./imageFallback";

export default function CarCard(props: any) {
    return (
        <a href={`/DiabMotors/car/${props._id}`}>
            <div
                className={`h-[60px] bg-[url('/DiabMotors/cars/${props.image}')]`}
            >
                <ImageFallback
                    name={`${props.make} ${props.model}`}
                    src={props.image}
                    width={60}
                    height={60}
                />
            </div>
            <p>
                <span>{props.make}</span> <span>{props.model}</span>
            </p>
        </a>
    );
}
