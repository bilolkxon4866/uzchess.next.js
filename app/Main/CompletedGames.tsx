"use client";
import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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

function Trophy({won}: { won: boolean }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill={won ? "#E0B531" : "#6F767E"}>
            <path d="M6 3h12v2h3a1 1 0 0 1 1 1c0 3.5-2.2 5.6-5.1 6.2C16.2 14.2 14.4 15.4 13 15.7V19h3v2H8v-2h3v-3.3c-1.4-.3-3.2-1.5-3.9-3.5C4.2 11.6 2 9.5 2 6a1 1 0 0 1 1-1h3V3zm0 4H4.1c.2 1.7 1.2 2.8 2.4 3.4A8 8 0 0 1 6 7zm12 0a8 8 0 0 1-.5 3.4c1.2-.6 2.2-1.7 2.4-3.4H18z"/>
        </svg>
    );
}

export default function CompletedGames() {
    const [matches, setMatches] = useState<MatchType[]>([]);
    const router = useRouter();

    useEffect(() => {
        async function getMatches() {
            try {
                const response = await axios.get("http://localhost:8888/public/matches");
                const result = response.data?.data || response.data;
                if (Array.isArray(result)) {
                    setMatches(result.slice(0, 5));
                }
            } catch (error) {
                console.error("O'yinlarni yuklashda xatolik:", error);
            }
        }
        getMatches();
    }, []);

    return <>
        <div className="w-[676px] bg-[#1A1D1F] rounded-[8px]">
            <div className="flex items-center justify-between px-[20px] pt-[20px] pb-[16px]">
                <h2 className="text-[20px] font-medium text-[#FCFCFC]">Yakunlangan o&apos;yinlar</h2>
                <button
                    onClick={() => router.push("/games")}
                    className="flex items-center gap-1 text-[16px] text-[#9DA1A3] cursor-pointer hover:text-white transition-colors">
                    Barchasi
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2">
                        <path d="M9 6l6 6-6 6"/>
                    </svg>
                </button>
            </div>

            <div className="flex items-center h-[36px] px-[20px] bg-[#272B30] text-[12px] text-[#9D9FA1]">
                <span className="w-[260px]">O&apos;yinchilar</span>
                <span className="w-[90px]">natija</span>
                <span className="w-[90px]">o&apos;yin Turi</span>
                <span className="w-[110px]">Yurishlar</span>
                <span className="w-[80px]">sana</span>
            </div>

            <div className="flex flex-col">
                {matches.map((match, i) => (
                    <div
                        key={match.id}
                        style={{backgroundColor: i % 2 === 1 ? "#15181A" : "transparent"}}
                        className="flex items-center h-[72px] px-[20px] border-t border-[#272B30] text-[14px] text-[#FCFCFC]"
                    >
                        <div className="w-[260px] flex flex-col gap-1">
                            <span className="flex items-center gap-1.5">
                                <Trophy won={match.winner === "first"}/>
                                {match.firstPlayerName}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Trophy won={match.winner === "second"}/>
                                {match.secondPlayerName}
                            </span>
                        </div>
                        <div className="w-[90px] flex flex-col gap-1">
                            <span>{match.firstPlayerResult}</span>
                            <span>{match.secondPlayerResult}</span>
                        </div>
                        <div className="w-[90px]">
                            <span
                                style={{color: typeColors[match.type] || "#FCFCFC"}}
                                className="font-medium">
                                {typeLabels[match.type] || match.type}
                            </span>
                        </div>
                        <div className="w-[110px]">{match.moves}</div>
                        <div className="w-[80px]">{match.date}</div>
                    </div>
                ))}
            </div>
        </div>
    </>;
}