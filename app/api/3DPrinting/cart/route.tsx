import connectDb from "@/lib/3DPrinting/connectDb";
import { createErrorResponse } from "@/lib/utils";
import User from "@/models/3DPrinting/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb();

        let id = cookies().get("3DPrinting-user");

        const user = await User.findOne({ _id: id?.value });

        if (!user) {
            return createErrorResponse("Cannot find user", 201);
        }

        const cart = JSON.parse(JSON.stringify(user)).cart;

        let response = { status: "success", data: cart, length: cart.length };

        return new NextResponse(JSON.stringify(response), {
            status: 201,
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

        if (!body.size) {
            return createErrorResponse("Please select a size", 201);
        }
        if (!body.colour) {
            return createErrorResponse("Please select a colour", 201);
        }

        let id = cookies().get("3DPrinting-user");

        const curr = await User.findOne({ _id: id?.value });

        const cart = JSON.parse(JSON.stringify(curr)).cart;
        cart.push({
            _id: body._id,
            name: body.name,
            size: body.size,
            price: body.price,
            colour: body.colour,
            image: body.image,
        });

        const user = await User.updateOne({ _id: id?.value }, { cart: cart });

        let response = { status: "success", message: "Item added to cart" };

        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
