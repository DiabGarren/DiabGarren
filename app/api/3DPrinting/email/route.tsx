import { createErrorResponse } from "@/lib/utils";
import sgMail from "@sendgrid/mail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        sgMail.setApiKey(`${process.env.SENDGRID_API}`);
        const message = {
            to: `${body.email}`,
            from: `${process.env.GMAIL}`,
            subject: "3D Printing Order Placed",
            html: `<h2>Custom order placed!</h2>
            <p>Thank you for placing a custom order with Custom 3D Printing.
            <br>We will contact you as soon as possible to confirm everything and send you an invoice.</p>
            <h3>Order:</h3>
            <p>${body.info}</p>
            <p>Size: ${body.size}</p>
            <p>Colour: ${body.colour}</p>`,
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
            html: `<h2>${body.email} placed a custom order!</h2>
            <h3>Order details:</h3>
            <p>${body.info}</p>
            <p>Size: ${body.size}</p>
            <p>Colour: ${body.colour}</p>`,
        };

        try {
            await sgMail.send(confirm);
            console.log("Email sent");
        } catch (error) {
            console.log(error);
        }

        let response = { status: "success", message: "Order placed" };

        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
