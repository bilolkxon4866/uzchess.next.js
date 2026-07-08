"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import HeaderItem from "@/app/command/Header/Header";
import Section from "@/app/command/Section";
import Footer from "@/app/command/Footer/Footer";
import YoshlarAgencyPoster from "@/app/command/YoshlarAgency";

interface BookType {
    id: number;
    title: string;
    image: string;
    price: number;
    newPrice: number;
    rating: number;
    pages: number;
    pubDate: string;
    authorId: { id: number; fullName: string };
    categoryId: { id: number; title: string };
    languageId: { id: number; title: string };
    difficultyId: { id: number; title: string };
}

export default function BookSinglePage() {
    const params = useParams();
    const router = useRouter();
    const [book, setBook] = useState<BookType | null>(null);
    const [recommended, setRecommended] = useState<BookType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getBook() {
            try {
                const response = await axios.get(`http://localhost:8888/public/book/${params.id}`);
                setBook(response.data);
            } catch (error) {
                console.error("Kitobni yuklashda xatolik:", error);
            } finally {
                setLoading(false);
            }
        }

        async function getRecommended() {
            try {
                const response = await axios.get("http://localhost:8888/public/book");
                const result = response.data?.data || response.data;
                if (Array.isArray(result)) {
                    setRecommended(result.slice(0, 4));
                }
            } catch (error) {
                console.error("Tavsiyalarni yuklashda xatolik:", error);
            }
        }

        getBook();
        getRecommended();
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex flex-col text-white min-h-screen bg-[#111315]">
                <HeaderItem/>
                <div className="flex items-center justify-center flex-1 h-[400px]">
                    <p className="text-[#6F767E]">Yuklanmoqda...</p>
                </div>
                <Footer/>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="flex flex-col text-white min-h-screen bg-[#111315]">
                <HeaderItem/>
                <div className="flex items-center justify-center flex-1 h-[400px]">
                    <p className="text-[#6F767E]">Kitob topilmadi</p>
                </div>
                <Footer/>
            </div>
        );
    }

    return (
        <div className="flex flex-col text-white bg-[#111315] min-h-screen">
            <HeaderItem/>
            <Section/>

            <div className="flex gap-[24px] px-[40px] py-[24px]">

                {/* Asosiy qism */}
                <div className="flex-1">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 mb-[24px]">
                        <button onClick={() => router.push("/")}>
                            <Image src="/home.svg" alt="asosiy" width={16} height={16}/>
                        </button>
                        <span className="text-[#6F767E] text-[14px]">›</span>
                        <button
                            onClick={() => router.push("/library")}
                            className="text-[#6F767E] text-[14px] hover:text-white cursor-pointer"
                        >
                            Kutubxona
                        </button>
                        <span className="text-[#6F767E] text-[14px]">›</span>
                        <span className="text-[#FCFCFC] text-[14px] line-clamp-1">{book.title}</span>
                    </div>

                    {/* Kitob kartochkasi */}
                    <div className="bg-[#1A1D1F] rounded-[12px] p-[24px]">
                        <div className="flex gap-[24px]">

                            {/* Rasm */}
                            <div className="relative w-[140px] h-[200px] rounded-[8px] overflow-hidden shrink-0">
                                <Image
                                    src={`http://localhost:8888/${book.image}`}
                                    alt={book.title}
                                    fill
                                    sizes="140px"
                                    className="object-cover"
                                />
                            </div>

                            {/* Ma'lumot */}
                            <div className="flex flex-col gap-[16px] flex-1">
                                <h1 className="text-[24px] font-bold text-[#FCFCFC] leading-[32px]">
                                    {book.title}
                                </h1>

                                {/* Narx */}
                                <div className="flex items-center gap-[12px]">
                                    <Image src="/coin.svg" alt="narx" width={24} height={24}/>
                                    <span className="text-[20px] font-bold text-[#FCFCFC]">
                                        {book.newPrice
                                            ? book.newPrice.toLocaleString()
                                            : book.price?.toLocaleString()} UZS
                                    </span>
                                    {book.newPrice && book.price && (
                                        <span className="text-[14px] text-[#6F767E] line-through">
                                            {book.price.toLocaleString()} uzs
                                        </span>
                                    )}
                                </div>

                                {/* Tafsilotlar */}
                                <div className="grid grid-cols-4 gap-[16px] bg-[#111315] rounded-[8px] p-[16px]">
                                    <div className="flex flex-col gap-[4px]">
                                        <div className="flex items-center gap-1">
                                            <Image src="/difficulty.svg" alt="daraja" width={16} height={16}/>
                                            <span className="text-[12px] text-[#6F767E]">Daraja</span>
                                        </div>
                                        <span className="text-[14px] text-[#FCFCFC]">
                                            {book.difficultyId?.title || "—"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-[4px]">
                                        <div className="flex items-center gap-1">
                                            <Image src="/author.svg" alt="muallif" width={16} height={16}/>
                                            <span className="text-[12px] text-[#6F767E]">Muallif</span>
                                        </div>
                                        <span className="text-[14px] text-[#FCFCFC]">
                                            {book.authorId?.fullName || "—"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-[4px]">
                                        <div className="flex items-center gap-1">
                                            <Image src="/pages.svg" alt="sahifa" width={16} height={16}/>
                                            <span className="text-[12px] text-[#6F767E]">Sahifa soni</span>
                                        </div>
                                        <span className="text-[14px] text-[#FCFCFC]">{book.pages}</span>
                                    </div>
                                    <div className="flex flex-col gap-[4px]">
                                        <div className="flex items-center gap-1">
                                            <Image src="/calendar.svg" alt="sana" width={16} height={16}/>
                                            <span className="text-[12px] text-[#6F767E]">Chop etilgan sana</span>
                                        </div>
                                        <span className="text-[14px] text-[#FCFCFC]">{book.pubDate || "—"}</span>
                                    </div>
                                </div>

                                {/* Tugmalar */}
                                <div className="flex items-center gap-[12px]">
                                    <button className="flex items-center gap-2 px-[24px] h-[48px] bg-[#2470FF] rounded-[8px] text-[15px] font-medium text-white cursor-pointer hover:bg-[#1a5fe0] transition-colors">
                                        <Image src="/cart.svg" alt="savat" width={20} height={20}/>
                                        Savatchaga
                                    </button>
                                    <button className="w-[48px] h-[48px] flex items-center justify-center bg-[#272B30] rounded-[8px] cursor-pointer hover:bg-[#2E3338] transition-colors">
                                        <Image src="/heart.svg" alt="saqlash" width={20} height={20}/>
                                    </button>
                                    <button className="w-[48px] h-[48px] flex items-center justify-center bg-[#272B30] rounded-[8px] cursor-pointer hover:bg-[#2E3338] transition-colors">
                                        <Image src="/share.svg" alt="ulashish" width={20} height={20}/>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Kitob haqida */}
                        <div className="mt-[24px]">
                            <h2 className="text-[18px] font-bold text-[#FCFCFC] mb-[12px]">Kitob haqida</h2>
                            <p className="text-[14px] text-[#9DA1A3] leading-[22px]">
                                {book.categoryId?.title || ""}
                            </p>
                        </div>
                    </div>
                </div>

                {/* O'ng qism — Tavfsiya + Yoshlar portali */}
                <div className="w-[280px] shrink-0 flex flex-col gap-[16px]">
                    <YoshlarAgencyPoster/>

                    {/* Tavsiya */}
                    <div className="bg-[#1A1D1F] rounded-[12px] p-[16px]">
                        <div className="flex items-center justify-between mb-[16px]">
                            <h2 className="text-[16px] font-bold text-[#FCFCFC]">Tavfsiya</h2>
                            <button
                                onClick={() => router.push("/library")}
                                className="flex items-center gap-1 text-[13px] text-[#6F767E] cursor-pointer hover:text-white"
                            >
                                Barchasi
                                <Image src="/chevron-right.svg" alt="barchasi" width={14} height={14}/>
                            </button>
                        </div>
                        <div className="flex flex-col gap-[12px]">
                            {recommended
                                .filter((r) => r.id !== book.id)
                                .slice(0, 4)
                                .map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => router.push(`/library/${item.id}`)}
                                        className="flex gap-[10px] items-start text-left cursor-pointer hover:opacity-80 transition-opacity"
                                    >
                                        <div className="relative w-[44px] h-[56px] rounded-[4px] overflow-hidden shrink-0">
                                            <Image
                                                src={`http://localhost:8888/${item.image}`}
                                                alt={item.title}
                                                fill
                                                sizes="44px"
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-[2px] min-w-0">
                                            <h4 className="text-[13px] font-medium text-[#FCFCFC] line-clamp-2">
                                                {item.title}
                                            </h4>
                                            <span className="text-[12px] text-[#6F767E]">
                                                {item.authorId?.fullName}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
}