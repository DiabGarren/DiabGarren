import connectDb from "@/lib/rdpUtilities/connectDb";
import { createErrorResponse } from "@/lib/utils";
import Bishopric from "@/models/rdpUtilities/bishopric";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb();

        const bishopric = await Bishopric.find({});

        let response = {
            status: "success",
            data: bishopric,
            length: bishopric.length,
        };

        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
