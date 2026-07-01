import Image from "next/image";

export default function GameOfTheDay() {
    return <>
        <div className="w-[326px] flex flex-col bg-[#272B30] rounded-[8px] overflow-hidden">
            <div className="flex items-center justify-between px-[16px] py-[16px]">
                <h2 className="text-[20px] font-medium text-[#FCFCFC]">Kun o‘yini</h2>
                <button
                    className="flex items-center gap-1 text-[16px] text-[#9DA1A3] cursor-pointer hover:text-white transition-colors">
                    Ko‘rish
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2">
                        <path d="M9 6l6 6-6 6"/>
                    </svg>
                </button>
            </div>

            <div className="relative w-full h-[183px]">
                <Image src="/main-game-of-day.png" alt="Kun o‘yini" fill sizes="326px" className="object-cover"/>
                <button
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group">
                    <span
                        className="w-[56px] h-[56px] rounded-full bg-black/40 flex items-center justify-center group-hover:bg-black/55 transition-colors">
                        <svg width="20" height="22" viewBox="0 0 20 22" fill="white">
                            <path d="M0 0 L20 11 L0 22 Z"/>
                        </svg>
                    </span>
                </button>
                <div
                    className="absolute bottom-0 left-0 w-full h-[44px] bg-[#1A1D1F] flex items-center justify-between px-[16px]">
                    <span className="flex items-center gap-1.5 text-[#82CC27] text-[14px] font-medium">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#82CC27">
                            <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/>
                        </svg>
                        Bullet
                    </span>
                    <span className="text-[#FCFCFC] text-[14px]">5:30</span>
                </div>
            </div>

            <div className="flex items-center justify-center h-[68px] bg-[#1A1D1F]">
                <div className="w-[123px] flex items-center gap-2">
                    <span className="w-[20px] h-[36px] rounded-full bg-[#82CC27] flex items-center justify-center shrink-0">
                        <svg width="11" height="10" viewBox="0 0 24 24" fill="#F7F9FA">
                            <path d="M2 21h4V9H2v12zM22 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L12.17 1 6.59 6.59C6.22 6.95 6 7.45 6 8v11c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                        </svg>
                    </span>
                    <span className="text-[14px] font-medium text-[#F7F9FA] leading-[17px]">Abdusattorov Nodirbek</span>
                </div>
                <Image src="/crash.svg" alt="Urush" width={35} height={32} className="shrink-0"/>
                <div className="w-[123px] flex items-center justify-end gap-2 text-right">
                    <span className="text-[14px] font-medium text-[#FCFCFC] leading-[17px]">Magnus Carlsen</span>
                    <span className="w-[20px] h-[36px] rounded-full bg-[#DC2D2D] flex items-center justify-center shrink-0">
                        <svg width="11" height="10" viewBox="0 0 24 24" fill="#F7F9FA" className="rotate-180">
                            <path d="M2 21h4V9H2v12zM22 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L12.17 1 6.59 6.59C6.22 6.95 6 7.45 6 8v11c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    </>;
}