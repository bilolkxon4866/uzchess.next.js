"use client";
import Image from "next/image";
import {useRouter} from "next/navigation";

interface NewsRow {
    image: string;
    date: string;
    dateColor: string;
    title: string;
    titleColor: string;
    description: string;
    descColor: string;
}

const rows: NewsRow[] = [
    {
        image: "/main-news-1.png",
        date: "Sentabr 7, 2022",
        dateColor: "#FCFCFC",
        title: "Nodirbek Abdusattorov FIDE jonli reytingida 2700 balldan o‘tdi",
        titleColor: "#FCFCFC",
        description: "O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita g‘alaba qozonib, shaxmat bo‘yicha jahon reyting...",
        descColor: "#888888",
    },
    {
        image: "/main-news-2.png",
        date: "Sentabr 7, 2022",
        dateColor: "#F7F9FA",
        title: "“Qo‘shnilarning buyuk jasorati”: Rossiyalik grossmeyster o‘zbek shaxmatining g‘alabasi...",
        titleColor: "#FCFCFC",
        description: "Rossiyalik grossmeyster va shaxmat bo‘yicha murabbiy Sergey Shipov O‘zbekiston terma jamoasining Hindistondagi shaxmat olimpiadasidagi...",
        descColor: "#F7F9FA",
    },
    {
        image: "/main-news-3.png",
        date: "Sentabr 7, 2022",
        dateColor: "#6F767E",
        title: "Xalqaro shaxmat musobaqalari g‘oliblariga nima beriladi?",
        titleColor: "#FCFCFC",
        description: "O‘zbekiston Prezidenti Shavkat Mirziyoyevning “Shaxmatni yanada ommalashtirish va rivojlantirishga doir qo‘shimcha chora-tadbirlar to‘g‘...",
        descColor: "#6F767E",
    },
    {
        image: "/main-news-4.png",
        date: "Sentabr 7, 2022",
        dateColor: "#6F767E",
        title: "O‘zbekiston shaxmatchilari olimpiadada Armanistonlik raqiblarini mag‘lub etishdi",
        titleColor: "#FCFCFC",
        description: "Ikki davlat jamoalari o‘rtasidagi bahs 3:1 hisobida O‘zbekiston foydasiga hal bo‘ldi. Shu tariqa, hech qachon mag‘lubiyatga uchramagan respub...",
        descColor: "#6F767E",
    },
];

export default function NewsList() {
    const router = useRouter();

    return <>
        <div className="w-[676px] flex flex-col">
            <div className="flex items-center justify-between mb-[16px]">
                <h2 className="text-[20px] font-bold text-[#FCFCFC]">Yangiliklar</h2>
                <button
                    onClick={() => router.push("/news")}
                    className="flex items-center gap-1 text-[16px] text-[#9DA1A3] cursor-pointer hover:text-white transition-colors">
                    Barchasi
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2">
                        <path d="M9 6l6 6-6 6"/>
                    </svg>
                </button>
            </div>

            <div className="flex flex-col">
                {rows.map((row, i) => (
                    <button
                        key={i}
                        onClick={() => router.push("/news/1")}
                        className={`flex gap-6 items-center text-left py-[20px] cursor-pointer group ${i !== 0 ? "border-t border-[#272B30]" : ""}`}
                    >
                        <div className="relative w-[180px] h-[120px] rounded-[8px] overflow-hidden shrink-0">
                            <Image src={row.image} alt={row.title} fill sizes="180px" className="object-cover"/>
                        </div>
                        <div className="flex flex-col gap-2 min-w-0">
                            <span style={{color: row.dateColor}} className="text-[14px]">{row.date}</span>
                            <h3 style={{color: row.titleColor}}
                                className="text-[16px] font-bold leading-[21px] line-clamp-2 group-hover:underline">
                                {row.title}
                            </h3>
                            <p style={{color: row.descColor}} className="text-[14px] leading-[18px] line-clamp-2">
                                {row.description}
                            </p>
                        </div>
                    </button>
                ))}
            </div>

            <button
                onClick={() => router.push("/news")}
                className="self-center w-[131px] h-[40px] mt-[12px] bg-[#1A1D1F] rounded-[8px] text-[#EFEFEF] cursor-pointer hover:bg-[#232627] transition-colors"
            >
                Ko‘proq
            </button>
        </div>
    </>;
}