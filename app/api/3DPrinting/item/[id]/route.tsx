import connectDb from "@/lib/3DPrinting/connectDb";
import { createErrorResponse } from "@/lib/utils";
import Item from "@/models/3DPrinting/item";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDb();

        const id = params.id;
        const item = await Item.findOne({ _id: id });

        let response = {
            status: "success",
            data: item,
            length: item.length,
        };

        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
