"use client"
import HeaderItem from "@/app/command/Header/Header";
import Section from "@/app/command/Section";
import BookItem from "@/app/command/Book/BookItem";
import Footer from "@/app/command/Footer/Footer";
import NewsItem2 from "@/app/news/components/NewsItem2";
import {useState} from "react";
import Image from "next/image";

export default function Page() {

    const [search, setSearch] = useState("")

    return <div className="bg-[#202020]">
        <HeaderItem/>
        <Section/>
        <div className="w-[1030px] h-[52px] flex items-center mt-5 justify-between ml-[30px]">
            <h1 className="w-[180px] h-[42px] font-bold text-[32px] text-white">Yangiliklar</h1>
            <div className="relative">
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
                        className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#6F767E] cursor-pointer hover:text-white"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                )}
            </div>
        </div>
        <div className="flex ml-[50px] gap-10">
            <NewsItem2 search={search}/>
            <BookItem/>
        </div>
        <Footer/>
    </div>
}