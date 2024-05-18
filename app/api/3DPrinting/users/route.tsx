import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import User from "@/models/3DPrinting/user";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb();
        const users = await User.find({});

        let response = {
            status: "success",
            data: users,
            length: users.length,
        };

        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
