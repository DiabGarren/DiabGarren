/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
"use client";

import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
    const [book, setBook] = useState({
        id: "",
        lang: "eng",
        name: "",
        chapters: 0,
    });

    useEffect(() => {
        const getChapters = async () => {
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
                                    setBook(book);
                                }
                            }
                        );
                    }
                });
        };
        getChapters();
    }, []);
    return (
        <main className="max-w-[750px] mx-auto px-[10px] flex flex-wrap gap-[15px] mt-[50px] justify-center">
            {[...Array(book.chapters)].map((num, index) => {
                return (
                    <a
                        className="block w-[50px] h-[50px] border-[2px] border-black text-center align-center py-[10px] rounded-[15px]"
                        href={`/BookOfMormon/${book.id}/${index + 1}`}
                    >
                        {index + 1}
                    </a>
                );
            })}
        </main>
    );
}
