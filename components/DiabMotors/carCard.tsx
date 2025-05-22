export default function CarCard(props: {
    _id: any;
    make: string;
    model: string;
    year: string;
    colour: string;
    engine: { config: string; cylinders: string; size: string; fuel: string };
    driveType: string;
    image: string;
    registration: string;
}) {
    return (
        <div>
            <p>
                <span>{props.make}</span> <span>{props.model}</span>
            </p>
        </div>
    );
}
