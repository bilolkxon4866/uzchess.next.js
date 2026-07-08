"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import BookItem from "./BookItems";
import Image from "next/image"

const STEP = 4;

interface CourseItem {
    id: number;
    authorId: any;
    categoryId: any;
    languageId: any;
    difficultyId: any;
    title: string;
    image: string;
    price: number;
    newPrice: number;
    rating: number;
}

interface Props {
    search: string;
    degree: string;
    category: string;
    lessonLanguage: string;
    rating: string;
}

export default function BookItemContainer({ search, degree, category, lessonLanguage, rating }: Props) {
    const [books, setBooks] = useState<CourseItem[]>([]);
    const [shown, setShown] = useState(STEP);

    useEffect(() => {
        async function getAllBooks() {
            try {
                const params = new URLSearchParams();
                if (search) params.append("search", search);
                if (degree !== "Barchasi") params.append("difficulty", degree);
                if (category !== "Barchasi") params.append("category", category);
                if (lessonLanguage !== "Barchasi") params.append("language", lessonLanguage);
                if (rating) params.append("rating", rating);

                const url = `http://localhost:8888/public/book${params.toString() ? "?" + params.toString() : ""}`;
                const response = await axios.get(url);
                const result = response.data?.data || response.data;
                if (Array.isArray(result)) {
                    setBooks(result);
                    setShown(STEP);
                }
            } catch (error) {
                console.error("Ma'lumotlarni yuklashda xatolik:", error);
            }
        }

        getAllBooks();
    }, [search, degree, category, lessonLanguage, rating]);

    return (
        <div>
            {books.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[300px] gap-4">
                    <Image
                        src="/NotFound.svg"
                        alt="topilmadi"
                        width={488}
                        height={263}
                    />
                </div>
            ) : (
                books.slice(0, shown).map((item) => (
                    <BookItem
                        key={item.id}
                        id={item.id}
                        author={item.authorId}
                        category={item.categoryId}
                        language={item.languageId}
                        difficulty={item.difficultyId}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        newPrice={item.newPrice}
                        rating={item.rating}
                    />
                ))
            )}

            {shown < books.length && (
                <button
                    onClick={() => setShown((prev) => prev + STEP)}
                    className="ml-[280px] w-[131px] h-[40px] mt-[20px] bg-[#1A1D1F] rounded-[8px] text-white hover:bg-[#25292c] transition-colors cursor-pointer"
                >
                    Ko&apos;proq
                </button>
            )}
        </div>
    );
}