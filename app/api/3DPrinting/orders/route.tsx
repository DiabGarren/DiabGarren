import connectDb from "@/lib/3DPrinting/connectDb";
import { createErrorResponse } from "@/lib/utils";
import Order from "@/models/3DPrinting/order";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb();

        const id = cookies().get("3DPrinting-user");

        const orders = await Order.find({ userId: id?.value });

        const response = { status: "success", data: orders, length: orders.length };

        return new NextResponse(JSON.stringify(response), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
