import { createErrorResponse } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        cookies().set("3DPrinting-user", "");

        console.log(true);

        let response = { status: "success" };

        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
