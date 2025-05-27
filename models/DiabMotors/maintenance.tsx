import { Schema, model, models } from "mongoose";

const maintenanceSchema = new Schema(
    {
        carId: String,
        date: String,
        odometer: String,
        name: String,
        description: String,
    },
    { collection: "dm-maintenance" }
);

const Maintenance =
    models.Maintenance || model("Maintenance", maintenanceSchema);
export default Maintenance;
