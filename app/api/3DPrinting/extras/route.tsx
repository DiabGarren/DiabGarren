import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import Extras from "@/models/3DPrinting/extras";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb();

        const extras = await Extras.findOne();

        if (!extras) {
            return createErrorResponse("Cannot find extras", 201);
        }

        let response = { status: "success", data: extras };

        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
