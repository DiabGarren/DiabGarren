import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import User from "@/models/3DPrinting/user";
import sgMail from "@sendgrid/mail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectDb();
        const body = await request.json();

        if (!body.email || body.email == "" || !body.email.includes("@")) {
            return createErrorResponse("Please enter your email address", 400);
        }

        const user = await User.findOne({ email: body.email });
        if (!user) return createErrorResponse("Email not found", 400);

        sgMail.setApiKey(`${process.env.SENDGRID_API}`);
        const message = {
            to: `${body.email}`,
            from: `${process.env.GMAIL}`,
            subject: "Custom 3D Printing Password Reset",
            html: `<h2>This is a request to reset your password</h2>
            <p>Click the button below to reset your Custom 3D Printing password.</p>
            <a href="http://localhost:3000/3DPrinting/passwordReset/${user._id}" style="color: white; background-color: #0156f6; text-align: center; width: 80%; margin-inline: auto; padding: 5px 10px; font-size: 18px; border-radius: 5px; text-decoration:none;">Reset Password</a>
            <p>If you did not request to reset your password, please contact <a href="mailto:garrendiab@gmail.com">Garren Diab</a> (060 981 1694)</p>`,
        };
        try {
            await sgMail.send(message);
            console.log("Email sent");
        } catch (error) {
            console.log(error);
        }

        return new NextResponse(
            JSON.stringify({
                status: "success",
                message: "Email sent successfully",
            }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

export async function PUT(request: Request) {
    try {
        await connectDb();
        const body = await request.json();
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
