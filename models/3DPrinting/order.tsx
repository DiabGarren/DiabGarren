import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
    {
        userId: String,
        name: String,
        date: String,
        order: [
            {
                name: String,
                size: String,
                colour: String,
                base: String,
                image: String,
                price: Number,
                qty: Number,
            },
        ],
        shipping: String,
        shippingCost: Number,
        total: Number,
        status: String,
    },
    { collection: "3d-orders" }
);

const Order = models.Order || model("Order", OrderSchema);
export default Order;
