import { Schema, model, models } from "mongoose";

const ExtrasSchema = new Schema(
    {
        filamentCost: Number,
        filamentWeight: Number,
        filamentMarkup: Number,
        printerCost: Number,
        repairCost: Number,
        returnTerm: Number,
        dailyUsage: Number,
        VAT: Number,
        itemCost: String,
    },
    { collection: "3d-extras" }
);

const Extras = models.Extras || model("Extras", ExtrasSchema);
export default Extras;
