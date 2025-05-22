import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import Car from "@/models/DiabMotors/car";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb();

        const cars = await Car.find({});

        let response = {
            status: "success",
            data: cars,
            length: cars.length,
        };

        return new NextResponse(JSON.stringify(response), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

export async function POST() {}
