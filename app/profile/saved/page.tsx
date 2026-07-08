"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { api } from "@/app/lib/api";

interface SavedBook {
    id: number;
    bookId: {
        id: number;
        title: string;
        image: string;
        price: number;
        rating: number;
        pages: number;
        difficultyId: { title: string };
        authorId: { fullName: string };
    };
}

export default function SavedPage() {
    const router = useRouter();
    const [tab, setTab] = useState<"courses" | "books">("courses");
    const [books, setBooks] = useState<SavedBook[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getBooks() {
            try {
                const response = await api.get("/public/bookLikes");
                const result = response.data?.data || response.data;
                if (Array.isArray(result)) setBooks(result);
            } catch (error) {
                console.error("Kitoblarni yuklashda xatolik:", error);
            } finally {
                setLoading(false);
            }
        }
        getBooks();
    }, []);

    return (
        <div>
            {/* Tab */}
            <div className="flex gap-[8px] mb-[24px]">
                <button
                    onClick={() => setTab("courses")}
                    className={`px-[20px] h-[40px] rounded-[8px] text-[14px] font-medium cursor-pointer transition-colors ${
                        tab === "courses"
                            ? "bg-[#2470FF] text-white"
                            : "bg-[#1A1D1F] text-[#6F767E] hover:text-white"
                    }`}
                >
                    Saqlangan kurslar
                </button>
                <button
                    onClick={() => setTab("books")}
                    className={`px-[20px] h-[40px] rounded-[8px] text-[14px] font-medium cursor-pointer transition-colors ${
                        tab === "books"
                            ? "bg-[#2470FF] text-white"
                            : "bg-[#1A1D1F] text-[#6F767E] hover:text-white"
                    }`}
                >
                    Saqlangan kitoblar
                </button>
            </div>

            {/* Kurslar tab — endpoint yo'q, hozircha bo'sh */}
            {tab === "courses" && (
                <div className="flex flex-col items-center justify-center h-[400px] gap-4">
                    <Image src="/NotFound.svg" alt="bo'sh" width={488} height={263} />
                    <p className="text-[16px] text-[#6F767E]">Saqlangan kurslar yo&apos;q</p>
                </div>
            )}

            {/* Kitoblar tab */}
            {tab === "books" && (
                <div>
                    {loading ? (
                        <div className="flex items-center justify-center h-[400px]">
                            <p className="text-[#6F767E]">Yuklanmoqda...</p>
                        </div>
                    ) : books.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[400px] gap-4">
                            <Image src="/NotFound.svg" alt="bo'sh" width={488} height={263} />
                            <p className="text-[16px] text-[#6F767E]">Saqlangan kitoblar yo&apos;q</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-[16px]">
                            {books.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => router.push(`/library/${item.bookId?.id}`)}
                                    className="bg-[#1A1D1F] rounded-[12px] p-[16px] flex gap-[16px] cursor-pointer hover:bg-[#1F2226] transition-colors"
                                >
                                    <div className="relative w-[60px] h-[80px] rounded-[6px] overflow-hidden shrink-0">
                                        <Image
                                            src={`http://localhost:8888/${item.bookId?.image}`}
                                            alt={item.bookId?.title}
                                            fill
                                            sizes="60px"
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-between min-w-0">
                                        <h3 className="text-[14px] font-bold text-[#FCFCFC] line-clamp-2">
                                            {item.bookId?.title}
                                        </h3>
                                        <div className="flex items-center gap-1">
                                            <Image src="/star 1.svg" alt="reyting" width={12} height={12} />
                                            <span className="text-[12px] text-[#9DA1A3]">{item.bookId?.rating}</span>
                                        </div>
                                        <div className="flex items-center gap-[12px] text-[12px] text-[#6F767E] flex-wrap">
                                            <span>{item.bookId?.difficultyId?.title || "—"}</span>
                                            <span>{item.bookId?.pages} sahifa</span>
                                            <span>{item.bookId?.authorId?.fullName}</span>
                                        </div>
                                        <button className="w-fit">
                                            <Image src="/heart-filled.svg" alt="saqlangan" width={16} height={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}