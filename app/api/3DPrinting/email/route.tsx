import { createErrorResponse } from "@/lib/utils";
import sgMail from "@sendgrid/mail";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        sgMail.setApiKey(`${process.env.SENDGRID_API}`);
        const message = {
            to: `${process.env.GMAIL}`,
            from: `${process.env.GMAIL_SELF}`,
            subject: "Welcome to Diab Desgin's 3D Printing!",
            html: `<h2>Test email</h2><p>Thank you for creating an account.<br>Contact <a href="mailto:garrendiab@gmail.com">@Garren Diab</a> if you have any queries or concerns.</p>`,
        };
        try {
            await sgMail.send(message);
            console.log("Email sent");
        } catch (error) {
            console.log(error);
        }

        let response = { status: "success" };

        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
