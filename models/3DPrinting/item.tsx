import { Schema, model, models } from "mongoose";

const itemSchema = new Schema({
  name: String,
  colours: [{ name: String, value: String }],
  options: [{ size: String, price: Number }],
  images: [String],
});

const Item = models.Item || model("Item", itemSchema);
export default Item;
