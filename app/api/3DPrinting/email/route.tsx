import { createErrorResponse } from "@/lib/utils";
import sgMail from "@sendgrid/mail";
import { NextResponse } from "next/server";

export async function GET() {
    try {
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
