/* eslint-disable react/jsx-key */
"use client";

import { useEffect, useState } from "react";

export default function Page() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/BookOfMormon/books")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setBooks(data.data);
                    }
                });
        };
        getBooks();
    }, []);
    return (
        <main className="px-[10px] mt-[20px] max-w-[820px] mx-auto">
            <div>
                {books.map(
                    (book: {
                        id: string;
                        lang: string;
                        name: string;
                        chapters: number;
                    }) => {
                        return (
                            <a
                                className="block w-[120px] text-center border-[2px] rounded-[15px] p-[10px]"
                                href={`BookOfMormon/${book.id}`}
                            >
                                {book.name}
                            </a>
                        );
                    }
                )}
            </div>
        </main>
    );
}
