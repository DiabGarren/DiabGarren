import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    phone: String,
    prefer: String,
    password: String,
    level: Number,
    cart: [
        {
            _id: String,
            name: String,
            size: String,
            price: Number,
            colour: String,
            base: String,
            image: String,
            qty: Number,
        },
    ],
    address: {
        line1: String,
        line2: String,
        city: String,
        postalCode: String,
    },
});

const User = models.User || model("User", userSchema);
export default User;
