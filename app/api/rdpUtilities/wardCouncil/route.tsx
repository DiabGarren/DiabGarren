import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import WardCouncil from "@/models/rdpUtilities/wardCouncil";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb();

        const wardCouncil = await WardCouncil.find({});

        let response = {
            status: "success",
            data: wardCouncil,
            length: wardCouncil.length,
        };

        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
