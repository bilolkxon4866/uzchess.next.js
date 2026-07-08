"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

interface SearchResult {
    id: number;
    title: string;
    type: "course" | "book";
}

interface SearchModalProps {
    onClose: () => void;
}

export default function SearchModal({ onClose }: SearchModalProps) {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [searched, setSearched] = useState(false);

    async function handleSearch() {
        if (!query.trim()) return;
        try {
            const [coursesRes, booksRes] = await Promise.all([
                axios.get(`http://localhost:8888/public/courses?search=${query}`),
                axios.get(`http://localhost:8888/public/book?search=${query}`),
            ]);
            const courses = (coursesRes.data?.data || coursesRes.data || []).map((c: any) => ({
                id: c.id,
                title: c.title,
                type: "course" as const,
            }));
            const books = (booksRes.data?.data || booksRes.data || []).map((b: any) => ({
                id: b.id,
                title: b.title,
                type: "book" as const,
            }));
            setResults([...courses, ...books]);
            setSearched(true);
        } catch (error) {
            console.error("Qidirishda xatolik:", error);
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") handleSearch();
    }

    function handleResultClick(item: SearchResult) {
        if (item.type === "course") router.push(`/course/${item.id}`);
        else router.push(`/library/${item.id}`);
        onClose();
    }

    return (
        <div
            className="fixed inset-0 z-50 bg-black/60 flex flex-col items-center pt-[60px]"
            onClick={onClose}
        >
            <div
                className="w-[700px] bg-[#1A1D1F] rounded-[12px] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-3 px-[20px] h-[56px] border-b border-[#272B30]">
                    <Image src="/search.svg" alt="qidiruv" width={20} height={20} />
                    <input
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Qidirish..."
                        className="flex-1 bg-transparent text-[16px] text-[#FCFCFC] placeholder:text-[#6F767E] outline-none"
                    />
                    {query && (
                        <button
                            onClick={() => { setQuery(""); setResults([]); setSearched(false); }}
                            className="text-[14px] text-[#9DA1A3] bg-[#272B30] px-[12px] py-[4px] rounded-[6px] cursor-pointer"
                        >
                            Tozalash
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="text-[#9DA1A3] cursor-pointer hover:text-white ml-2"
                    >
                        <Image src="/close.svg" alt="yopish" width={20} height={20} />
                    </button>
                </div>

                {searched && results.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-[60px] gap-4">
                        <Image src="/NotFound.svg" alt="topilmadi" width={488} height={263} />
                    </div>
                )}

                {results.length > 0 && (
                    <div className="flex flex-col py-[8px]">
                        {results.map((item) => (
                            <button
                                key={`${item.type}-${item.id}`}
                                onClick={() => handleResultClick(item)}
                                className="flex items-center gap-3 px-[20px] h-[52px] hover:bg-[#272B30] cursor-pointer text-left transition-colors"
                            >
                                <Image
                                    src={item.type === "course" ? "/course.svg" : "/books.svg"}
                                    alt={item.type}
                                    width={20}
                                    height={20}
                                />
                                <span className="text-[15px] text-[#FCFCFC]">{item.title}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}