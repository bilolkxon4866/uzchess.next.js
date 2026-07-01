"use client";

import {useState} from "react";
import Image from "next/image";
import BookFilters from "./components/BookFilters";
import BookItemContainer from "./components/BookItemsContainer";
import YoshlarAgencyPoster from "@/app/command/YoshlarAgency";
import HeaderItem from "@/app/command/Header/Header";
import Section from "@/app/command/Section";
import Footer from "@/app/command/Footer/Footer";

export default function BookPages() {
    const [search, setSearch] = useState("");

    return (
        <div className="flex flex-col text-white">
            <HeaderItem/>
            <Section/>
            <div className="flex w-full h-full gap-[24px] mt-5">
                <div className="flex flex-col gap-[24px]">
                    <div className="ml-[32px] w-[326px] h-[100px] flex gap-3 items-center justify-start pl-6 bg-[#1A1D1F] rounded-[12px] border-[#232627] border-[2px]">
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
                    <BookFilters/>
                </div>
                <div className="ml-[10px]">
                    <input
                        type="text"
                        placeholder="🔎︎ Izlash"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-[676px] h-[52px] py-[14px] px-[16px] bg-[#15181A] rounded-[8px] border-[#232627] border-[2px] outline-none text-white placeholder-gray-500"
                    />
                    <BookItemContainer search={search}/>
                </div>
                <YoshlarAgencyPoster/>
            </div>
            <Footer/>
        </div>
    );
}