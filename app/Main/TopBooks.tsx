"use client";
import Image from "next/image";
import {useEffect, useState} from "react";
import axios from "axios";

interface BookType {
    id: number;
    title: string;
    image: string;
    authorId: { id: number; fullName: string };
}

export default function TopBooks() {
    const [books, setBooks] = useState<BookType[]>([]);

    useEffect(() => {
        async function getBooks() {
            try {
                const response = await axios.get("http://localhost:8888/public/book");
                const result = response.data?.data || response.data;
                if (Array.isArray(result)) {
                    setBooks(result.slice(0, 4));
                }
            } catch (error) {
                console.error("Kitoblarni yuklashda xatolik:", error);
            }
        }
        getBooks();
    }, []);

    return <>
        <div className="w-[326px] rounded-[6px] bg-[#1A1D1F] p-[16px]">
            <div className="flex justify-between items-center mb-[20px]">
                <h1 className="text-[white] text-[16px] font-medium">Top kitoblar</h1>
                <div className="flex items-center gap-1 cursor-pointer">
                    <h1 className="text-[#9DA1A3] text-[14px] font-sans">Barchasi</h1>
                    <Image src="/chevron1.svg" alt="hammasi belgisi" width={16} height={16}/>
                </div>
            </div>

            <div className="flex flex-col gap-[12px]">
                {books.map((book, i) => (
                    <div key={book.id} className="contents">
                        <div className="flex gap-[12px] items-start">
                            <div className="relative w-[45px] h-[60px] shrink-0">
                                <Image
                                    src={`http://localhost:8888/${book.image}`}
                                    alt={book.title}
                                    className="rounded-[4px] object-cover"
                                    fill
                                />
                            </div>
                            <div className="flex flex-col justify-center min-w-0">
                                <h4 className="text-[13px] font-bold text-amber-50 line-clamp-2 leading-[16px] mb-[4px]">
                                    {book.title}
                                </h4>
                                <h4 className="text-[#F0F0F0B8] font-normal text-[12px]">
                                    {book.authorId?.fullName}
                                </h4>
                            </div>
                        </div>
                        {i !== books.length - 1 && <hr className="border-[#1F272A]"/>}
                    </div>
                ))}
            </div>
        </div>
    </>;
}