import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import bom1Nephi from "@/models/BookOfMormon/bom-1-nephi";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string; chapter: number } }
) {
    try {
        await connectDb();

        let book = [];

        const id = params.id;

        switch (id) {
            case "1-nephi":
                book = await bom1Nephi.find({});
                break;
            case "2-nephi":
                break;
        }

        let response = {
            status: "success",
            data: book,
            length: book.length,
        };

        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err: any) {
        return createErrorResponse(err.message, 500);
    }
}
