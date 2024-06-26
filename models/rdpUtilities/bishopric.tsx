import { Schema, model, models } from "mongoose";

const bishopricSchema = new Schema(
    {
        date: String,
        openingPrayer: String,
        spiritualThought: String,
        training: String,
        agenda: [String],
        closingPrayer: String,
        notes: String,
        createdBy: { name: String, date: String },
        updatedBy: [{ name: String, date: String }],
    },
    { collection: "rdp-bishopric" }
);

const Bishopric = models.Bishopric || model("Bishopric", bishopricSchema);
export default Bishopric;
