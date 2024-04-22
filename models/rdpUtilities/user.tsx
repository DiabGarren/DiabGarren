import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        username: String,
        email: String,
        password: String,
        level: String,
    },
    { collection: "rdp-users" }
);

const User = models.User || model("User", userSchema);
export default User;
