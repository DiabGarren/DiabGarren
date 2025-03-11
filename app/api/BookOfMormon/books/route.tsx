import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import Books from "@/models/BookOfMormon/books";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb();

        const allBooks = await Books.find({});

        let response = {
            status: "success",
            data: allBooks,
            length: allBooks.length,
        };
        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err: any) {
        return createErrorResponse(err.message, 500);
    }
}
