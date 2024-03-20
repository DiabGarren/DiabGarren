import connectDb from "@/lib/3DPrinting/connectDb";
import { createErrorResponse } from "@/lib/utils";
import User from "@/models/3DPrinting/user";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();

    const user = await User.findOne({ _id: params.id });

    if (!user) {
      return createErrorResponse("No user found", 201);
    }

    let response = { status: "success", data: user };

    return new NextResponse(JSON.stringify(response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return createErrorResponse(error.message, 500);
  }
}
