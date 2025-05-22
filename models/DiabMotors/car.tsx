import { Schema, model, models } from "mongoose";

const carSchema = new Schema(
    {
        make: String,
        model: String,
        year: String,
        colour: String,
        engine: {
            config: String,
            cylinders: String,
            size: String,
            fuel: String,
        },
        driveType: String,
        image: String,
        registration: String,
    },
    { collection: "dm-cars" }
);

const Car = models.Car || model("Car", carSchema);
export default Car;
