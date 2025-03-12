import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import bomEng from "@/models/BookOfMormon/bom-eng";
import bomEsp from "@/models/BookOfMormon/bom-esp";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string; chapter: number } }
) {
    try {
        await connectDb();

        const id = params.id;
        const bookEng = await bomEng.findOne({ id: id });
        const bookEsp = await bomEsp.findOne({ id: id });

        let content: any[] = [];
        let contentEng = {};
        let contentEsp = {};

        bookEng.contents.forEach(
            (contents: {
                chapter: number;
                intro: string;
                verses: [{ verse: number; text: string }];
            }) => {
                if (contents.chapter == params.chapter) {
                    contentEng = {
                        lang: bookEng.lang,
                        name: bookEng.name,
                        chapterName: bookEng.chapterName,
                        intro: contents.intro,
                        contents: contents.verses,
                    };
                }
            }
        );

        bookEsp.contents.forEach(
            (contents: {
                chapter: number;
                intro: string;
                verses: [{ verse: number; text: string }];
            }) => {
                if (contents.chapter == params.chapter) {
                    contentEsp = {
                        lang: bookEsp.lang,
                        name: bookEsp.name,
                        chapterName: bookEsp.chapterName,
                        intro: contents.intro,
                        contents: contents.verses,
                    };
                }
            }
        );

        content.push(contentEng);
        content.push(contentEsp);

        let response = {
            status: "success",
            data: content,
            length: content.length,
        };

        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err: any) {
        return createErrorResponse(err.message, 500);
    }
}
