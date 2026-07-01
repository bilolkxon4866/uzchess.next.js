"use client"
import HeaderItem from "@/app/command/Header/Header";
import Section from "@/app/command/Section";
import BookItem from "@/app/command/Book/BookItem";
import Footer from "@/app/command/Footer/Footer";
import NewsItem2 from "@/app/news/components/NewsItem2";
import {useState} from "react";

export default function Page() {

    const [search, setSearch] = useState("")

    return <div className="bg-[#202020]">
        <HeaderItem/>
        <Section/>
        <div className="w-[1030px] h-[52px] flex items-center mt-5 justify-between ml-[30px]">
            <h1 className="w-[180px] h-[42px] font-bold text-[32px] text-white">Yangiliklar</h1>
            <input
                type="text"
                placeholder="⌕ Izlash"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#15181A] w-[326px] h-[52px] text-white rounded-[8px] px-[16px] py-[4px] outline-none border-[#232627] border-[1px]"
            />
        </div>
        <div className="flex ml-[50px] gap-10">
            <NewsItem2 search={search}/>
            <BookItem/>
        </div>
        <Footer/>
    </div>
}