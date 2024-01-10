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
});

const User = models.User || model("User", userSchema);
export default User;
