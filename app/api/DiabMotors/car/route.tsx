import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import Car from "@/models/DiabMotors/car";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDb();

        const id = params.id;
        const car = await Car.findOne({ _id: id });

        let response = {
            status: "success",
            data: car,
            length: car.length,
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

        const car = await Car.create({
            make: body.make,
            model: body.model,
            year: body.year,
            colour: body.colour,
            engine: {
                config: body.engine.config,
                cylinders: body.engine.cylinders,
                size: body.engine.size,
                fuel: body.engine.fuel,
            },
            driveType: body.driveType,
            image: `${body.make}${body.model}.jpg`,
            registration: body.registration,
        });

        let response = { status: "success", data: car };

        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDb();

        const id = params.id;
        const body = await request.json();

        const car = Car.updateOne(
            { _id: id },
            {
                make: body.make,
                model: body.model,
                year: body.year,
                colour: body.colour,
                engine: {
                    config: body.engine.config,
                    cylinders: body.engine.cylinders,
                    size: body.engine.size,
                    fuel: body.engine.fuel,
                },
                driveType: body.driveType,
                image: `${body.make}${body.model}.jpg`,
                registration: body.registration,
            }
        );

        let response = { status: "success", data: car };

        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
