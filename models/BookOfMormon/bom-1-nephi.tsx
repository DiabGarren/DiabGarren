import { Schema, model, models } from "mongoose";

const bom1NephiSchema = new Schema(
    {
        lang: String,
        id: String,
        name: String,
        chapterName: String,
        contents: [
            {
                chapter: Number,
                intro: String,
                verses: [{ verse: Number, text: String }],
            },
        ],
    },
    { collection: "bom-1-nephi" }
);

const bom1Nephi = models.bom1Nephi || model("bom1Nephi", bom1NephiSchema);
export default bom1Nephi;
