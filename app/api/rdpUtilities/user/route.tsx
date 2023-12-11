import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import User from "@/models/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb();

        const userId = cookies().get("rdpUtilities-user");

        const user = await User.findOne({ _id: userId?.value });

        let response = { status: "success", data: user };

        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
