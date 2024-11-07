import { Schema, model, models } from "mongoose";

const docDataSchema = new Schema({
    bishopric: { time: String, day: String },
    wardcouncil: { time: String, day: String },
});

const DocData = models.DocData || model("DocData", docDataSchema);
export default DocData;
