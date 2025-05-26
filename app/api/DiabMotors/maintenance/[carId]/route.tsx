import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import Maintenance from "@/models/DiabMotors/maintenance";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { carId: string } }
) {
    try {
        await connectDb();

        const id = params.carId;
        const maintenance = await Maintenance.find({ carId: id });

        let response = {
            status: "success",
            data: maintenance,
            length: maintenance.length,
        };

        return new NextResponse(JSON.stringify(response), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

export async function POST(request: Request) {
    try {
        await connectDb();

        const body = await request.json();

        const maintenance = await Maintenance.create({
            carId: body.carId,
            date: body.date,
            odometer: body.odometer,
            name: body.name,
            description: body.description,
        });

        let response = { status: "success", data: maintenance };

        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
