import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import Maintenance from "@/models/DiabMotors/maintenance";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: { carId: string; id: string } }
) {
    try {
        await connectDb();

        const id = params.id;

        const maintenance = await Maintenance.deleteOne({ _id: id });

        let response = {
            status: "success",
            data: maintenance,
        };

        return new NextResponse(JSON.stringify(response), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
