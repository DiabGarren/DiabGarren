import { Schema, model, models } from "mongoose";

const bomEspSchema = new Schema(
    {
        lang: String,
        id: String,
        name: String,
        contents: [
            {
                chapter: Number,
                verses: [{ verse: Number, text: String }],
            },
        ],
    },
    { collection: "bom-esp" }
);

const bomEsp = models.bomEsp || model("bomEsp", bomEspSchema);
export default bomEsp;
