import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
    userId: String,
    name: String,
    date: String,
    order: [
        {
            name: String,
            size: String,
            colour: String,
            base: String,
            price: Number,
            qty: Number,
        },
    ],
    shipping: String,
    total: Number,
});

const Order = models.Order || model("Order", OrderSchema);
export default Order;
