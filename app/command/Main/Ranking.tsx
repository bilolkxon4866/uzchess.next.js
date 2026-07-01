"use client";
import {useEffect, useState} from "react";
import axios from "axios";

interface PlayerType {
    id: number;
    fullName: string;
    classic: number;
}

function ArrowUp({className}: { className?: string }) {
    return <>
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
             className={className}>
            <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
    </>;
}

export default function Ranking() {
    const [players, setPlayers] = useState<PlayerType[]>([]);

    useEffect(() => {
        async function getPlayers() {
            try {
                const response = await axios.get("http://localhost:8888/public/player");
                const result = response.data?.data || response.data;
                if (Array.isArray(result)) {
                    const sorted = [...result].sort((a, b) => b.classic - a.classic);
                    setPlayers(sorted.slice(0, 5));
                }
            } catch (error) {
                console.error("Reytingni yuklashda xatolik:", error);
            }
        }
        getPlayers();
    }, []);

    return <>
        <div className="w-[326px] bg-[#1A1D1F] rounded-[8px] flex flex-col">
            <div className="flex items-center justify-between px-[16px] pt-[16px]">
                <h2 className="text-[20px] font-medium text-[#F7F9FA]">Reyting</h2>
                <button
                    className="flex items-center gap-1 text-[16px] text-[#9DA1A3] cursor-pointer hover:text-white transition-colors">
                    Barchasi
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2">
                        <path d="M9 6l6 6-6 6"/>
                    </svg>
                </button>
            </div>
            <div className="flex flex-col px-[16px]">
                {players.map((player, i) => (
                    <div
                        key={player.id}
                        className={`flex items-center justify-between h-[62px] ${i !== 0 ? "border-t border-[#1A2226]" : ""}`}
                    >
                        <div className="flex items-center gap-2">
                            {i === 0 ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#E0B531">
                                    <path d="M2 18h20l-1 3H3l-1-3zm1.5-9L8 12l4-7 4 7 4.5-3-2 9H5.5l-2-9z"/>
                                </svg>
                            ) : (
                                <span className="text-[16px] text-[#F7F9FA]">{i + 1}.</span>
                            )}
                            <span className="text-[16px] text-[#F7F9FA]">{player.fullName}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[16px] text-[#F7F9FA]">{player.classic}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>;
}