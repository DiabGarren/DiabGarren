import { Schema, model, models } from "mongoose";

const itemSchema = new Schema(
    {
        name: String,
        colours: [{ name: String, value: String }],
        options: [
            {
                size: String,
                price: Number,
                printing: {
                    time: { hours: Number, minutes: Number },
                    weight: Number,
                },
            },
        ],
        images: [String],
    },
    { collection: "3d-items" }
);

const Item = models.Item || model("Item", itemSchema);
export default Item;
