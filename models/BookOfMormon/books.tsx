import { Schema, model, models } from "mongoose";

const booksSchema = new Schema(
    {
        id: String,
        lang: String,
        name: String,
        chapters: Number,
    },
    { collection: "bom-books" }
);

const Books = models.Books || model("Books", booksSchema);
export default Books;
