"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

interface MatchType {
    id: number;
    firstPlayerName: string;
    firstPlayerResult: number;
    secondPlayerName: string;
    secondPlayerResult: number;
    type: string;
    moves: number;
    date: string;
    winner: string;
}

const typeColors: Record<string, string> = {
    classic: "#DC2D2D",
    bullet: "#82CC27",
    blitz: "#E0A731",
    rapid: "#DC2D2D",
};

const typeLabels: Record<string, string> = {
    classic: "Klassik",
    bullet: "Bullet",
    blitz: "Blitz",
    rapid: "Rapid",
};

export default function GamesPage() {
    const router = useRouter();
    const [matches, setMatches] = useState<MatchType[]>([]);

    useEffect(() => {
        async function getMatches() {
            try {
                const response = await axios.get("http://localhost:8888/public/matches");
                const result = response.data?.data || response.data;
                if (Array.isArray(result)) {
                    setMatches(result);
                }
            } catch (error) {
                console.error("O'yinlarni yuklashda xatolik:", error);
            }
        }
        getMatches();
    }, []);

    return (
        <div className="min-h-screen bg-[#111315]">
            <div className="max-w-[1400px] mx-auto px-[40px] py-[24px]">

                <div className="flex items-center gap-2 mb-[24px]">
                    <button onClick={() => router.push("/")}>
                        <Image src="/home.svg" alt="asosiy" width={16} height={16} />
                    </button>
                    <span className="text-[#6F767E] text-[14px]">›</span>
                    <span className="text-[#FCFCFC] text-[14px]">Yakunlangan o&apos;yinlar</span>
                </div>

                <div className="flex gap-[24px]">

                    <div className="w-[280px] shrink-0">
                        <div className="bg-[#1A1D1F] rounded-[12px] p-[24px] mb-[16px]">
                            <div className="flex items-center gap-3">
                                <Image src="/oyinlar.svg" alt="o'yinlar" width={32} height={32} />
                                <h1 className="text-[24px] font-bold text-[#FCFCFC]">O&apos;yinlar</h1>
                            </div>
                        </div>

                        <div className="bg-[#1A1D1F] rounded-[12px] p-[24px]">
                            <div className="flex items-center justify-between mb-[20px]">
                                <h2 className="text-[16px] font-bold text-[#FCFCFC]">Filter</h2>
                                <button className="text-[14px] text-[#2470FF] cursor-pointer hover:underline">
                                    Tozalash
                                </button>
                            </div>

                            <div className="flex flex-col gap-[16px]">
                                <div>
                                    <p className="text-[12px] text-[#6F767E] mb-[8px] uppercase">
                                        Mamlakatni tanlang:
                                    </p>
                                    <div className="flex items-center justify-between h-[44px] px-[16px] bg-[#272B30] rounded-[8px] cursor-pointer">
                                        <span className="text-[14px] text-[#FCFCFC]">Barchasi</span>
                                        <Image src="/chevron.svg" alt="arrow" width={16} height={16} />
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[12px] text-[#6F767E] mb-[8px] uppercase">
                                        Yosh:
                                    </p>
                                    <div className="flex items-center justify-between h-[44px] px-[16px] bg-[#272B30] rounded-[8px] cursor-pointer">
                                        <span className="text-[14px] text-[#FCFCFC]">Barchasi</span>
                                        <Image src="/chevron.svg" alt="arrow" width={16} height={16} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 bg-[#1A1D1F] rounded-[12px] overflow-hidden">

                        <div className="grid grid-cols-[40px_1fr_100px_120px_100px_140px] h-[48px] px-[20px] bg-[#272B30] items-center">
                            <span className="text-[12px] text-[#6F767E]">№</span>
                            <span className="text-[12px] text-[#6F767E]">O&apos;yinchilar va natija</span>
                            <span className="text-[12px] text-[#6F767E]">Reyting</span>
                            <span className="text-[12px] text-[#6F767E]">Natija</span>
                            <span className="text-[12px] text-[#6F767E] flex items-center gap-1">
                                O&apos;yin Turi
                                <Image src="/sort.svg" alt="sort" width={12} height={12} />
                            </span>
                            <span className="text-[12px] text-[#6F767E] flex items-center gap-1">
                                O&apos;yin Sanasi
                                <Image src="/sort.svg" alt="sort" width={12} height={12} />
                            </span>
                        </div>

                        {matches.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-[80px] gap-4">
                                <Image src="/NotFound.svg" alt="topilmadi" width={305} height={203} />
                            </div>
                        ) : (
                            matches.map((match, i) => (
                                <div
                                    key={match.id}
                                    className={`grid grid-cols-[40px_1fr_100px_120px_100px_140px] min-h-[72px] px-[20px] items-center border-t border-[#272B30] ${i % 2 === 1 ? "bg-[#15181A]" : ""}`}
                                >
                                    <span className="text-[14px] text-[#6F767E]">{i + 1}.</span>

                                    <div className="flex flex-col gap-1 py-[12px]">
                                        <span className="flex items-center gap-2 text-[14px] text-[#FCFCFC]">
                                            {match.winner === "first" ? (
                                                <Image src="/trophy-gold.svg" alt="g'olib" width={16} height={16} />
                                            ) : (
                                                <Image src="/trophy-grey.svg" alt="yutqazdi" width={16} height={16} />
                                            )}
                                            {match.firstPlayerName}
                                        </span>
                                        <span className="flex items-center gap-2 text-[14px] text-[#FCFCFC]">
                                            {match.winner === "second" ? (
                                                <Image src="/trophy-gold.svg" alt="g'olib" width={16} height={16} />
                                            ) : (
                                                <Image src="/trophy-grey.svg" alt="yutqazdi" width={16} height={16} />
                                            )}
                                            {match.secondPlayerName}
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-1 text-[13px] text-[#9DA1A3]">
                                        <span>{match.firstPlayerResult}</span>
                                        <span>{match.secondPlayerResult}</span>
                                    </div>

                                    <div className="flex flex-col gap-1 text-[14px]">
                                        <span>{match.firstPlayerResult}</span>
                                        <span>{match.secondPlayerResult}</span>
                                    </div>

                                    <div>
                                        <span
                                            style={{ color: typeColors[match.type] || "#FCFCFC" }}
                                            className="text-[14px] font-medium"
                                        >
                                            {typeLabels[match.type] || match.type}
                                        </span>
                                    </div>

                                    <span className="text-[14px] text-[#FCFCFC]">{match.date}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}