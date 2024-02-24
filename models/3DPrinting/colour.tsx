import { Schema, model, models } from "mongoose";

const ColourSchema = new Schema({
  name: String,
  value: String,
});

const Colour = models.Colour || model("Colour", ColourSchema);
export default Colour;
