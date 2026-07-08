"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HeaderItem from "@/app/command/Header/Header";
import Section from "@/app/command/Section";
import Footer from "@/app/command/Footer/Footer";
import YoshlarAgencyPoster from "@/app/command/YoshlarAgency";
import CourseList from "./components/courseList";
import CourseFilterItem from "./components/CourseFilterItem";

export default function CoursePage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [degree, setDegree] = useState("Barchasi");
    const [category, setCategory] = useState("Barchasi");
    const [language, setLanguage] = useState("Barchasi");
    const [rating, setRating] = useState("");

    function handleClearAll() {
        setDegree("Barchasi");
        setCategory("Barchasi");
        setLanguage("Barchasi");
        setRating("");
        setSearch("");
    }

    return (
        <div className="flex flex-col text-white min-h-screen bg-[#111315]">
            <HeaderItem/>
            <Section/>
            <div className="flex w-full gap-[24px] mt-5 px-[32px]">

                {/* Chap — sarlavha + filter */}
                <div className="flex flex-col gap-[16px] shrink-0">
                    {/* Sarlavha */}
                    <div
                        onClick={() => router.push("/course")}
                        className="w-[280px] h-[100px] flex gap-3 items-center justify-start pl-6 bg-[#1A1D1F] rounded-[12px] border border-[#232627] cursor-pointer"
                    >
                        <Image src="/course.svg" alt="kurslar" width={44} height={44}/>
                        <h1 className="text-[28px] font-bold text-white">Kurslar</h1>
                    </div>

                    {/* Filter */}
                    <div className="w-[280px] bg-[#1A1D1F] rounded-[12px] border border-[#1F272A] p-[20px]">
                        <div className="flex justify-between items-center mb-[20px]">
                            <h2 className="text-[16px] font-medium text-white">Filter</h2>
                            <button
                                onClick={handleClearAll}
                                className="text-[14px] text-[#1C92E0] cursor-pointer hover:text-blue-400 transition-colors"
                            >
                                Tozalash
                            </button>
                        </div>
                        <CourseFilterItem
                            degree={degree} setDegree={setDegree}
                            category={category} setCategory={setCategory}
                            language={language} setLanguage={setLanguage}
                            rating={rating} setRating={setRating}
                        />
                    </div>
                </div>

                {/* O'rta — search + kurslar */}
                <div className="flex-1">
                    {/* Search */}
                    <div className="relative mb-[16px]">
                        <Image
                            src="/search.svg"
                            alt="qidiruv"
                            width={24}
                            height={24}
                            className="absolute left-[16px] top-1/2 -translate-y-1/2"
                        />
                        <input
                            type="text"
                            placeholder="Izlash"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full h-[52px] pl-[48px] pr-[48px] bg-[#15181A] rounded-[8px] border border-[#232627] outline-none text-white placeholder-gray-500 text-[15px]"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute right-[16px] top-1/2 -translate-y-1/2 text-[#6F767E] cursor-pointer hover:text-white"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12"/>
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Kurslar ro'yxati */}
                    <CourseList
                        search={search}
                        degree={degree}
                        category={category}
                        language={language}
                        rating={rating}
                    />
                </div>

                {/* O'ng — reklama */}
                <div className="shrink-0">
                    <YoshlarAgencyPoster/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}