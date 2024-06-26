import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import User from "@/models/rdpUtilities/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb();

        const userId = cookies().get("rdpUtilities-user");

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
