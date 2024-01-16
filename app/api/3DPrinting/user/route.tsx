import connectDb from "@/lib/3DPrinting/connectDb";
import { createErrorResponse } from "@/lib/utils";
import User from "@/models/3DPrinting/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import sgMail from "@sendgrid/mail";

export async function GET() {
    try {
        await connectDb();

        const userId = cookies().get("3DPrinting-user");

        if (!userId || !userId.value) {
            return createErrorResponse("No user found", 201);
        }

        const user = await User.findOne({ _id: userId?.value });

        if (!user) {
            return createErrorResponse("No user found", 201);
        }

        let response = { status: "success", data: user };

        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

export async function POST(request: Request) {
    try {
        await connectDb();
        const body = await request.json();

        if (body.password !== body.confirm) {
            return createErrorResponse("Password does not match", 201);
        }

        const users = await User.find({});
        let existing = "";

        users.forEach((user) => {
            if (user.username === body.username) {
                existing = "Username already exists";
                return createErrorResponse("Username already exists", 201);
            }
            if (user.email === body.email) {
                existing = "Email already exists";
                return createErrorResponse("Email already exists", 201);
            }
        });

        if (existing) return createErrorResponse(existing, 201);

        const password = await hash(body.password, 10);

        const user = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            username: body.username,
            email: body.email,
            phone: body.phone,
            prefer: body.prefer,
            password: password,
            level: 1,
            cart: [],
        });

        let resopnse = { status: "success", data: user };

        cookies().set("3DPrinting-user", user._id);

        sgMail.setApiKey(`${process.env.SENDGRID_API}`);
        const message = {
            to: `${user.email}`,
            from: `${process.env.GMAIL}`,
            subject: "Welcome to Diab Desgin's 3D Printing!",
            html: `<h2>Dear ${user.firstName} ${user.lastName}</h2><p>Thank you for creating an account.<br>Contact <a href="mailto:garrendiab@gmail.com">@Garren Diab</a> if you have any queries or concerns.</p>`,
        };
        const confirm = {
            to: `${process.env.GMAIL}`,
            from: `${process.env.GMAIL}`,
            subject: "New 3D Printing User",
            html: `<h2>${user.firstName} ${user.lastName}</h2><p>has just created a 3D printing account.</p>`,
        };

        try {
            await sgMail.send(message);
            await sgMail.send(confirm);
            console.log("Email sent");
        } catch (error) {
            console.log(error);
        }

        return new NextResponse(JSON.stringify(resopnse), {
            status: 201,
            headers: { "Content-Type": "appliction/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
