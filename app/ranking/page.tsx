"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

interface PlayerType {
    id: number;
    fullName: string;
    image: string;
    classic: number;
    rapid: number;
    blitz: number;
}

export default function RankingPage() {
    const router = useRouter();
    const [players, setPlayers] = useState<PlayerType[]>([]);

    useEffect(() => {
        async function getPlayers() {
            try {
                const response = await axios.get("http://localhost:8888/public/player");
                const result = response.data?.data || response.data;
                if (Array.isArray(result)) {
                    setPlayers(result);
                }
            } catch (error) {
                console.error("Reytingni yuklashda xatolik:", error);
            }
        }
        getPlayers();
    }, []);

    return (
        <div className="min-h-screen bg-[#111315]">
            <div className="max-w-[1400px] mx-auto px-[40px] py-[24px]">

                <div className="flex items-center gap-2 mb-[24px]">
                    <button
                        onClick={() => router.push("/")}
                        className="cursor-pointer"
                    >
                        <Image src="/home.svg" alt="asosiy" width={16} height={16} />
                    </button>
                    <span className="text-[#6F767E] text-[14px]">Asosiy</span>
                    <Image src="/chess.svg" alt="chess" width={8} height={8} />
                    <span className="text-[#FCFCFC] text-[14px]">Reyting</span>
                </div>

                <div className="flex gap-[24px]">

                    <div className="w-[280px] shrink-0">
                        <div className="bg-[#1A1D1F] rounded-[12px] p-[24px] mb-[16px]">
                            <div className="flex items-center gap-3 mb-[24px]">
                                <Image src="/presentation.png" alt="reyting" width={44} height={44} />
                                <h1 className="text-[24px] font-bold text-[#FCFCFC]">Reyting</h1>
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
                                        <Image src="/select.svg" alt="arrow" width={16} height={16} />
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[12px] text-[#6F767E] mb-[8px] uppercase">
                                        Toifa:
                                    </p>
                                    <div className="flex items-center justify-between h-[44px] px-[16px] bg-[#272B30] rounded-[8px] cursor-pointer">
                                        <span className="text-[14px] text-[#FCFCFC]">Barchasi</span>
                                        <Image src="/select.svg" alt="arrow" width={16} height={16} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex-1 bg-[#1A1D1F] rounded-[12px] overflow-hidden">

                        <div className="grid grid-cols-[60px_1fr_120px_120px_120px] h-[48px] px-[20px] bg-[#272B30] items-center">
                            <span className="text-[12px] text-[#6F767E]">№</span>
                            <span className="text-[12px] text-[#6F767E]">Ism Familiya</span>
                            <span className="text-[12px] text-[#6F767E] flex items-center gap-1">
                                Klassika
                                <Image src="/sort.svg" alt="sort" width={24} height={24} />
                            </span>
                            <span className="text-[12px] text-[#6F767E] flex items-center gap-1">
                                Rapid
                                <Image src="/sort.svg" alt="sort" width={24} height={24} />
                            </span>
                            <span className="text-[12px] text-[#6F767E] flex items-center gap-1">
                                Blitz
                                <Image src="/sort.svg" alt="sort" width={24} height={24} />
                            </span>
                        </div>

                        {players.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-[80px] gap-4">
                                <Image src="/NotFound.svg" alt="topilmadi" width={488} height={263} />
                                <p className="text-[16px] text-[#6F767E]">
                                </p>
                            </div>
                        ) : (
                            players.map((player, i) => (
                                <div
                                    key={player.id}
                                    className={`grid grid-cols-[60px_1fr_120px_120px_120px] h-[64px] px-[20px] items-center border-t border-[#272B30] ${i % 2 === 1 ? "bg-[#15181A]" : ""}`}
                                >
                                    <span className="text-[14px] text-[#6F767E]">{i + 1}.</span>
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-[36px] h-[36px] rounded-full overflow-hidden shrink-0">
                                            <Image
                                                src={player.image ? `http://localhost:8888/${player.image}` : "/default-avatar.svg"}
                                                alt={player.fullName}
                                                fill
                                                sizes="36px"
                                                className="object-cover"
                                            />
                                        </div>
                                        <span className="text-[14px] text-[#FCFCFC]">{player.fullName}</span>
                                    </div>
                                    <span className="text-[14px] text-[#FCFCFC]">{player.classic}</span>
                                    <span className="text-[14px] text-[#FCFCFC]">{player.rapid}</span>
                                    <span className="text-[14px] text-[#FCFCFC]">{player.blitz}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}