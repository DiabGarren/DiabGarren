import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import DocData from "@/models/rdpUtilities/docData";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb();

        const docData = await DocData.findOne({});

        if (!docData) {
            return createErrorResponse("No data found", 201);
        }

        let response = { status: "success", data: docData };

        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
