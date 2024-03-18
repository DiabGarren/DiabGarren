import connectDb from "@/lib/3DPrinting/connectDb";
import { createErrorResponse } from "@/lib/utils";
import User from "@/models/3DPrinting/user";
import { compare, hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();

    const id = params.id;
    try {
      const user = await User.findOne({ _id: id });

      if (!user) return createErrorResponse("Cannot find user", 400);

      return new NextResponse(
        JSON.stringify({ status: "success", data: user }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    } catch (error: any) {
      return createErrorResponse(error.message, 201);
    }
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
    try {
      const user = await User.findOne({ _id: id });

      if (!user) return createErrorResponse("Cannot find user", 400);
      const body = await request.json();

      if (!body.password || !body.confirm) {
        return createErrorResponse("Please enter your new password", 201);
      }

      if (body.password !== body.confirm) {
        return createErrorResponse("Password does not match", 201);
      }

      const password = await hash(body.password, 10);

      await User.updateOne({ _id: id }, { password: password });

      return new NextResponse(
        JSON.stringify({ status: "success", message: "Reset Successful" }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    } catch (error: any) {
      return createErrorResponse(error.message, 201);
    }
  } catch (error: any) {
    return createErrorResponse(error.message, 500);
  }
}
