import ImageFallback from "./imageFallback";

export default function CarCard(props: any) {
    return (
        <a href={`/DiabMotors/car/${props._id}`} className="car-card">
            <div className="car-thumbnail relative">
                <ImageFallback
                    className={"rounded-t-[8px]"}
                    name={`${props.make} ${props.model}`}
                    src={props.image}
                />
            </div>

            <div className="car-title">
                <p>
                    {props.make} {props.model}
                </p>
            </div>
        </a>
    );
}
