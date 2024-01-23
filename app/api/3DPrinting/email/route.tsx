import { createErrorResponse } from "@/lib/utils";
import sgMail from "@sendgrid/mail";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        return new NextResponse(JSON.stringify({}), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
