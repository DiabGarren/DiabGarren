import { Schema, model, models } from "mongoose";

const wardCouncilSchema = new Schema({
    date: String,
    openingPrayer: String,
    spiritualThought: String,
    training: String,
    agenda: [String],
    closingPrayer: String,
    notes: String,
    createdBy: { name: String, date: String },
    updatedBy: [{ name: String, date: String }],
});

const WardCouncil = models.WardCouncil || model("WardCouncil", wardCouncilSchema);
export default WardCouncil;
