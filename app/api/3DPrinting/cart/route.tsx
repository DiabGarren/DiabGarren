import connectDb from "@/lib//connectDb";
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

        let id = cookies().get("3DPrinting-user");

        if (!id || id.value === "") {
            return createErrorResponse("Please login", 201);
        }

        const body = await request.json();

        if (!body.size) {
            return createErrorResponse("Please select a size", 201);
        }
        if (!body.colour) {
            return createErrorResponse("Please select a colour", 201);
        }

        const curr = await User.findOne({ _id: id?.value });
        const cart = JSON.parse(JSON.stringify(curr)).cart;

        const existing = cart.findIndex(
            (item: any) =>
                item.name === body.name &&
                item.size === body.size &&
                item.colour === body.colour &&
                item.base === body.base
        );

        if (existing > -1) {
            cart[existing].qty++;
        } else {
            cart.push({
                _id: body._id,
                name: body.name,
                size: body.size,
                price: body.price,
                colour: body.colour,
                base: body.base,
                image: body.image,
                qty: 1,
            });
        }

        await User.updateOne({ _id: id?.value }, { cart: cart });

        let response = { status: "success", message: "Item added to cart" };

        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

export async function PUT(request: Request) {
    try {
        await connectDb();

        let id = cookies().get("3DPrinting-user");

        const body = await request.json();

        const user = await User.findOne({ _id: id?.value });

        const cart = body.cart;

        await User.updateOne({ _id: id?.value }, { cart: cart });

        let response = { status: "success", message: "Cart updated" };

        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
