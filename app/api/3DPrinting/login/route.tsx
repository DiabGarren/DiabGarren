import connectDb from "@/lib/3DPrinting/connectDb";
import { createErrorResponse } from "@/lib/utils";
import User from "@/models/3DPrinting/user";
import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        await connectDb();
        const body = await request.json();

        let user = null;

        if (body.email.includes("@")) user = await User.findOne({ email: body.email });
        else if (!body.username.includes("@"))
            user = await User.findOne({ username: body.username });
        else return createErrorResponse("Username/Email does not exist", 500);

        if (body.password === "") return createErrorResponse("Please enter a password", 500);

        const pass = await compare(body.password, user.password);
        if (!pass) return createErrorResponse("Password is incorrect", 500);

        cookies().set("3DPrinting-user", user._id);
        return new NextResponse(
            JSON.stringify({
                status: "success",
            }),
            {
                status: 201,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
