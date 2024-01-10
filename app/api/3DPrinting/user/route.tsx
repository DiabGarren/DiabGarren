import connectDb from "@/lib/3DPrinting/connectDb";
import { createErrorResponse } from "@/lib/utils";
import User from "@/models/3DPrinting/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

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
        });

        let resopnse = { status: "success", data: user };

        return new NextResponse(JSON.stringify(resopnse), {
            status: 201,
            headers: { "Content-Type": "appliction/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
