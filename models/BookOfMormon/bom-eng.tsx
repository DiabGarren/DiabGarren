import { Schema, model, models } from "mongoose";

const bomEngSchema = new Schema(
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
    { collection: "bom-eng" }
);

const bomEng = models.bomEng || model("bomEng", bomEngSchema);
export default bomEng;
