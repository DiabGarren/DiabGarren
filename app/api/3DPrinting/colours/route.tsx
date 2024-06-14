import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import Colour from "@/models/3DPrinting/colour";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb();

        const colours = await Colour.find({});

        let response = {
            status: "success",
            data: colours,
            length: colours.length,
        };

        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
