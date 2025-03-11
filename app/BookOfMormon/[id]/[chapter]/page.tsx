/* eslint-disable react/jsx-key */
"use client";

import { useEffect, useState } from "react";

export default function ChapterPage({
    params,
}: {
    params: { id: string; chapter: string };
}) {
    const [chapterEng, setChapterEng] = useState([{ verse: 0, text: "" }]);
    const [chapterEsp, setChapterEsp] = useState([{ verse: 0, text: "" }]);
    const [bookEng, setBookEng] = useState("");
    const [bookEsp, setBookEsp] = useState("");

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
                            if (data.lang === "eng") {
                                setChapterEng(data.contents);
                                setBookEng(data.name);
                            } else {
                                setChapterEsp(data.contents);
                                setBookEsp(data.name);
                            }
                        });
                    }
                });
        };
        getChapter();
    }, []);

    return (
        <main className="max-w-[750px] mx-auto px-[10px]">
            <a href={`/BookOfMormon/${params.id}`}>Back</a>
            {chapterEng.length <= 1 ? (
                <></>
            ) : (
                <>
                    <div className="flex [&>h1]:w-[50%] [&>h1]:py-[10px] [&>h1]:px-[15px] text-[35px] text-center">
                        <h1 className="border-r-[2px]">{bookEng}</h1>
                        <h1 className="border-l-[2px]">{bookEsp}</h1>
                    </div>
                    {chapterEng.map(
                        (value: { verse: number; text: string }, index) => {
                            return (
                                <div className="flex [&>p]:w-[50%] [&>p]:py-[10px] [&>p]:px-[15px]">
                                    <p className="border-r-[2px]">
                                        <span className="text-[18px]">{`${value.verse}`}</span>{" "}
                                        {value.text}
                                    </p>
                                    <p className="border-l-[2px]">
                                        <span className="text-[18px]">{`${chapterEsp[index].verse}`}</span>{" "}
                                        {chapterEsp[index].text}
                                    </p>
                                </div>
                            );
                        }
                    )}
                </>
            )}
        </main>
    );
}
