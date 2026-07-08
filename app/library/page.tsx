"use client";

import { useState } from "react";
import Image from "next/image";
import BookItemContainer from "./components/BookItemsContainer";
import YoshlarAgencyPoster from "@/app/command/YoshlarAgency";
import HeaderItem from "@/app/command/Header/Header";
import Section from "@/app/command/Section";
import Footer from "@/app/command/Footer/Footer";
import BookFilterItem from "@/app/library/components/BookFiltersItem";

export default function BookPages() {
    const [search, setSearch] = useState("");
    const [degree, setDegree] = useState("Barchasi");
    const [category, setCategory] = useState("Barchasi");
    const [lessonLanguage, setLessonLanguage] = useState("Barchasi");
    const [rating, setRating] = useState("");

    function handleClearAll() {
        setDegree("Barchasi");
        setCategory("Barchasi");
        setLessonLanguage("Barchasi");
        setRating("");
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#111315] text-white">
            <HeaderItem/>
            <Section/>
            <div className="flex w-full h-full gap-[24px] mt-5">
                <div className="flex flex-col gap-[24px]">
                    <div
                        className="ml-[32px] w-[326px] h-[100px] flex gap-3 items-center justify-start pl-6 bg-[#1A1D1F] rounded-[12px] border-[#232627] border-[2px]">
                        <Image
                            src="/books.svg"
                            alt="Kutubxona ikonka"
                            width={120}
                            height={120}
                            className="object-contain"
                        />
                        <h1 className="text-[30px] font-bold text-white font-poppins leading-none select-none">
                            Kutubxona
                        </h1>
                    </div>

                    {/* Filter — endi props orqali boshqariladi */}
                    <div
                        className="w-[334px] h-[500px] ml-[30px] rounded-[8px] bg-[#1A1D1F] border-[1px] border-[#1F272A] flex flex-col p-[20px] items-center">
                        <div className="w-[294px] h-[24px] flex justify-between items-center text-white font-poppins">
                            <h1 className="w-[44px] h-[23px] font-medium">Filter</h1>
                            <button
                                onClick={handleClearAll}
                                className="w-[71px] h-[24px] font-normal text-[#1C92E0] hover:text-blue-400 cursor-pointer transition-colors"
                            >
                                Tozalash
                            </button>
                        </div>
                        <BookFilterItem
                            degree={degree} setDegree={setDegree}
                            category={category} setCategory={setCategory}
                            lessonLanguage={lessonLanguage} setLessonLanguage={setLessonLanguage}
                            rating={rating} setRating={setRating}
                        />
                    </div>
                </div>

                <div className="ml-[10px]">
                    <div className="relative w-[676px] mb-[16px]">
                        <Image
                            src="/search.svg"
                            alt="qidiruv"
                            width={20}
                            height={20}
                            className="absolute left-[16px] top-1/2 -translate-y-1/2 opacity-50"
                        />
                        <input
                            type="text"
                            placeholder="Izlash"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full h-[52px] pl-[48px] pr-[16px] bg-[#15181A] rounded-[8px] border-[#232627] border-[2px] outline-none text-white placeholder-gray-500"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute right-[16px] top-1/2 -translate-y-1/2 text-[#6F767E] cursor-pointer hover:text-white"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12"/>
                                </svg>
                            </button>
                        )}
                    </div>
                    <BookItemContainer
                        search={search}
                        degree={degree}
                        category={category}
                        lessonLanguage={lessonLanguage}
                        rating={rating}
                    />
                </div>
                <YoshlarAgencyPoster/>
            </div>
            <Footer/>
        </div>
    );
}