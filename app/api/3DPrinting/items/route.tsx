import connectDb from "@/lib/3DPrinting/connectDb";
import { createErrorResponse } from "@/lib/utils";
import Item from "@/models/3DPrinting/item";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb();

        const items = await Item.find({});

        let response = {
            status: "success",
            data: items,
            length: items.length,
        };

        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
