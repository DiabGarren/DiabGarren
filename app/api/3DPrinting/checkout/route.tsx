import connectDb from "@/lib/3DPrinting/connectDb";
import { createErrorResponse } from "@/lib/utils";
import User from "@/models/3DPrinting/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { Item } from "@/lib/3DPrinting/item";
import Order from "@/models/3DPrinting/order";

export async function POST(request: Request) {
    try {
        await connectDb();

        let id = await cookies().get("3DPrinting-user");

        if (!id) {
            return createErrorResponse("Use must be logged in to place an order", 201);
        }

        const user = await User.findOne({ _id: id?.value });

        if (!user) {
            return createErrorResponse("Cannot find user", 201);
        }
        const body = await request.json();
        const address = body.address;

        if (!body.shipping) {
            return createErrorResponse("Please select a shipping method", 201);
        }

        if (!address.street || !address.suburb || !address.city || !address.postalCode) {
            return createErrorResponse("Please fill in your shipping address", 201);
        }

        let total = 0;

        user.cart.forEach((item: any) => {
            total += item.price * item.qty;
        });

        const order = user.cart.map((item: any) => {
            return {
                name: item.name,
                size: item.size,
                colour: item.colour,
                base: item.base,
                price: item.price,
                qty: item.qty,
            };
        });

        await Order.create({
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            date: Date.now(),
            order: order,
            shipping: body.shipping,
            total: total,
            fulfilled: false,
        });

        sgMail.setApiKey(`${process.env.SENDGRID_API}`);
        const message = {
            to: `${user.email}`,
            from: `${process.env.GMAIL}`,
            subject: "3D Printing Order Placed",
            html: `<h2>Dear ${user.firstName} ${
                user.lastName
            }</h2><p>Thank you for placing an order with Custom 3D Printing.<br>We will contact you as soon as possible to confirm everything and send you an invoice.</p><div><h3>Order:</h3>${user.cart.map(
                (item: any) => {
                    return `<h4>${item.name}</h4>
                    <p>Size: ${item.size}</p>
                    <p>
                        Colour: ${item.colour[0]?.toUpperCase()}${item.colour?.substring(1)}
                    </p>
                    ${
                        item.base
                            ? `<p>
                            Base: ${item.base[0]?.toUpperCase()}${item.base?.substring(1)}
                        </p>`
                            : ""
                    }
                    <p>
                        R${item.price} <span style="margin-left: 10px;">Qty: ${item.qty}</span>
                    </p>`;
                }
            )}
            <h3>Shipping method:</h3>
            <p>${body.shipping[0].toUpperCase()}${body.shipping.substring(1)}</p>
            ${
                body.shipping === "deliver"
                    ? `<h3>Address:</h3><p>${address.street}<br>${address.suburb}<br>${address.city}<br>${address.postalCode}</p>`
                    : ""
            }
            <h2>Total: R${total}</h2></div>`,
        };
        try {
            await sgMail.send(message);
            console.log("Email sent");
        } catch (error) {
            console.log(error);
        }

        const confirm = {
            to: `${process.env.GMAIL}`,
            from: `${process.env.GMAIL_SELF}`,
            subject: "New 3D Printing Order",
            html: `<h2>${user.firstName} ${
                user.lastName
            }</h2><p>has just placed an order.</p><div><h3>Order:</h3>${user.cart.map(
                (item: any) => {
                    return `<h4>${item.name}</h4>
                    <p>Size: ${item.size}</p>
                    <p>
                        Colour: ${item.colour[0]?.toUpperCase()}${item.colour?.substring(1)}
                    </p>
                    ${
                        item.base
                            ? `<p>
                            Base: ${item.base[0]?.toUpperCase()}${item.base?.substring(1)}
                        </p>`
                            : ""
                    }
                    <p>
                        R${item.price} <span style="margin-left: 10px;">Qty: ${item.qty}</span>
                    </p>`;
                }
            )}
            <h3>Shipping method:</h3>
            <p>${body.shipping[0].toUpperCase()}${body.shipping.substring(1)}</p>
            ${
                body.shipping === "deliver"
                    ? `<h3>Address:</h3><p>${address.street}<br>${address.suburb}<br>${address.city}<br>${address.postalCode}</p>`
                    : ""
            }
            <h2>Total: R${total}</h2></div>`,
        };

        try {
            await sgMail.send(confirm);
            console.log("Email sent");
        } catch (error) {
            console.log(error);
        }

        await User.updateOne(
            { _id: id?.value },
            {
                cart: [],
                address: {
                    street: address.street,
                    suburb: address.suburb,
                    city: address.city,
                    postalCode: address.postalCode,
                },
            }
        );

        let response = { status: "success" };
        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
