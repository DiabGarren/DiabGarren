import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import Order from "@/models/3DPrinting/order";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDb();

        const id = params.id;
        const order = await Order.findOne({ _id: id });

        let response = {
            status: "success",
            data: order,
            length: order.length,
        };

        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
