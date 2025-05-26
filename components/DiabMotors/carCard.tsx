import ImageFallback from "./imageFallback";

export default function CarCard(props: any) {
    return (
        <a href={`/DiabMotors/car/${props._id}`} className="car-card">
            <div className="thumbnail relative">
                <ImageFallback
                    className={"rounded-t-[8px]"}
                    name={`${props.make} ${props.model}`}
                    src={props.image}
                />
            </div>

            <p>
                <span className="car-title">
                    {props.make} {props.model}
                </span>
            </p>
        </a>
    );
}
