/* eslint-disable react/jsx-key */
"use client";

import { bom1Nephi } from "@/lib/BookOfMormon/bom1Nehpi";
import { useEffect, useState } from "react";

export default function ChapterPage({
    params,
}: {
    params: { id: string; chapter: string };
}) {
    const [bookEng, setBookEng] = useState<bom1Nephi>({
        _id: "",
        lang: "",
        id: "",
        name: "",
        chapterName: "",
        contents: [{ chapter: 1, intro: "", verses: [{ verse: 0, text: "" }] }],
    });
    const [bookEsp, setBookEsp] = useState<bom1Nephi>({
        _id: "",
        lang: "",
        id: "",
        name: "",
        chapterName: "",
        contents: [{ chapter: 1, intro: "", verses: [{ verse: 0, text: "" }] }],
    });

    const [chapterEng, setChapterEng] = useState({
        chapter: 0,
        intro: "",
        verses: [{ verse: 0, text: "" }],
    });
    const [chapterEsp, setChapterEsp] = useState({
        chapter: 0,
        intro: "",
        verses: [{ verse: 0, text: "" }],
    });

    const [book, setBook] = useState(0);
    const chapter = parseInt(params.chapter);

    useEffect(() => {
        const getChapter = async () => {
            fetch(
                process.env.NEXT_PUBLIC_API_URL +
                    `/BookOfMormon/${params.id}/${params.chapter}`
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        data.data.forEach((data: any, index: number) => {
                            switch (data.lang) {
                                case "eng":
                                    setBookEng(data);
                                    setChapterEng(data.contents[chapter - 1]);
                                    break;
                                case "esp":
                                    setBookEsp(data);
                                    setChapterEsp(data.contents[chapter - 1]);
                                    break;
                            }
                        });
                    }
                });
        };
        const getBookLength = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/BookOfMormon/books")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        let books = data.data;
                        books.forEach(
                            (book: {
                                id: string;
                                lang: string;
                                name: string;
                                chapters: number;
                            }) => {
                                if (book.id == params.id) {
                                    setBook(book.chapters);
                                }
                            }
                        );
                    }
                });
        };
        getChapter();
        getBookLength();
    }, []);

    return (
        <main className="px-[10px] mt-[20px] max-w-[820px] mx-auto">
            <a href={`/BookOfMormon/${params.id}`}>Back</a>
            {bookEng.contents.length <= 1 ? (
                <></>
            ) : (
                <>
                    <div className="title-box">
                        <div className="bom-verse-box [&_h1]:my-[10px] [&_h1]:text-[35px] [&_h3]:my-[10px] [&_h3]:text-[14px] [&_h2]:font-[400] text-center">
                            <div className="border-r-[2px]">
                                <h1>{bookEng.name}</h1>
                                <h2>
                                    {bookEng.chapterName} {params.chapter}
                                </h2>
                                <h3>
                                    <i>
                                        {chapterEng.chapter != 0
                                            ? chapterEng.intro
                                            : ""}
                                    </i>
                                </h3>
                            </div>
                            <div className="border-l-[2px]">
                                <h1>{bookEsp.name}</h1>
                                <h2>
                                    {bookEsp.chapterName} {params.chapter}
                                </h2>
                                <h3>
                                    <i>
                                        {chapterEsp.chapter != 0
                                            ? chapterEsp.intro
                                            : ""}
                                    </i>
                                </h3>
                            </div>
                        </div>
                    </div>

                    {[
                        ...Array(bookEng.contents[chapter - 1].verses.length),
                    ].map((blank, index) => {
                        let verseEng =
                            bookEng.contents[chapter - 1].verses[index];
                        let verseEsp =
                            bookEsp.contents[chapter - 1].verses[index];
                        return (
                            <div className="verse-box">
                                <div className="bom-verse-box">
                                    <div className="border-r-[2px]">
                                        <span className="text-[18px]">{`${verseEng.verse}`}</span>{" "}
                                        {verseEng.text}
                                    </div>
                                    <div className="border-l-[2px]">
                                        <span className="text-[18px]">{`${verseEsp.verse}`}</span>{" "}
                                        {verseEsp.text}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </>
            )}

            {chapter != 1 ? (
                <a
                    className="bom-chap-nav bom-nav-back"
                    href={`/BookOfMormon/${params.id}/${chapter - 1}`}
                >
                    <p>{"<-"}</p>
                </a>
            ) : (
                <></>
            )}
            {chapter != book ? (
                <a
                    className="bom-chap-nav bom-nav-next"
                    href={`/BookOfMormon/${params.id}/${chapter + 1}`}
                >
                    <p>{"->"}</p>
                </a>
            ) : (
                <></>
            )}
        </main>
    );
}
