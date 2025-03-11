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
        <div>
            {books.map(
                (book: {
                    id: string;
                    lang: string;
                    name: string;
                    chapters: number;
                }) => {
                    return <a href={`BookOfMormon/${book.id}`}>{book.name}</a>;
                }
            )}
        </div>
    );
}
