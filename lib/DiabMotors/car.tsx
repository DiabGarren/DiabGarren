export interface Car {
    _id: any;
    make: string;
    model: string;
    year: string;
    colour: string;
    engine: { config: string; cylinders: string; size: string; fuel: string };
    driveType: string;
    image: string;
    registration: string;
}
