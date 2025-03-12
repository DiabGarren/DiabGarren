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
    const [bookEng, setBookEng] = useState({
        name: "",
        chapterName: "",
        intro: "",
    });
    const [bookEsp, setBookEsp] = useState({
        name: "",
        chapterName: "",
        intro: "",
    });

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
                                setBookEng({
                                    name: data.name,
                                    chapterName: data.chapterName,
                                    intro: data.intro,
                                });
                            } else {
                                setChapterEsp(data.contents);
                                setBookEsp({
                                    name: data.name,
                                    chapterName: data.chapterName,
                                    intro: data.intro,
                                });
                            }
                        });
                    }
                });
        };
        getChapter();
    }, []);

    return (
        <main className="px-[10px] mt-[20px] max-w-[820px] mx-auto">
            <a href={`/BookOfMormon/${params.id}`}>Back</a>
            {chapterEng.length <= 1 ? (
                <></>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <div className="bom-verse-box [&_h1]:my-[10px] [&_h1]:text-[35px] [&_h3]:my-[10px] [&_h3]:text-[14px] [&_h2]:font-[400] text-center">
                            <div className="border-r-[2px]">
                                <h1>{bookEng.name}</h1>
                                <h2>
                                    {bookEng.chapterName} {params.chapter}
                                </h2>
                                <h3>
                                    <i>{bookEng.intro}</i>
                                </h3>
                            </div>
                            <div className="border-l-[2px]">
                                <h1>{bookEsp.name}</h1>
                                <h2>
                                    {bookEsp.chapterName} {params.chapter}
                                </h2>
                                <h3>
                                    <i>{bookEsp.intro}</i>
                                </h3>
                            </div>
                        </div>
                    </div>

                    {chapterEng.map(
                        (value: { verse: number; text: string }, index) => {
                            return (
                                <div className="overflow-x-auto">
                                    <div className="bom-verse-box">
                                        <div className="border-r-[2px]">
                                            <span className="text-[18px]">{`${value.verse}`}</span>{" "}
                                            {value.text}
                                        </div>
                                        <div className="border-l-[2px]">
                                            <span className="text-[18px]">{`${chapterEsp[index].verse}`}</span>{" "}
                                            {chapterEsp[index].text}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </>
            )}
        </main>
    );
}
