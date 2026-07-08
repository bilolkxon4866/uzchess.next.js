"use client";
import Image from "next/image";
import {useRouter} from "next/navigation";

function GraduationCapIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
        </svg>
    );
}

function BookIcon() {
    return <>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path
                d="M12 6.5C10.5 5.3 8 4.5 5 4.5c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1 2.7 0 5.1.7 7 2 1.9-1.3 4.3-2 7-2 .6 0 1-.4 1-1v-12c0-.6-.4-1-1-1-3 0-5.5.8-7 2zm-1 11.6c-1.7-.9-3.7-1.4-6-1.5V6.4c2 .1 3.9.7 6 2v9.7zm2 0V8.4c2.1-1.3 4-1.9 6-2v10.2c-2.3.1-4.3.6-6 1.5z"/>
        </svg>
    </>;
}

const links = [
    {
        label: "Kurslar",
        path: "/course",
        icon: <GraduationCapIcon/>,
        bg: "#13181C",
        text: "#F7F9FA",
        glow: "/graduation-cap.3 1.svg"
    },
    {label: "Kutubxona", path: "/library", icon: <BookIcon/>, bg: "#1A1D1F", text: "#EFEFEF", glow: "/books.svg"},
];

export default function QuickLinks() {
    const router = useRouter();

    return <>
        <div className="flex gap-6 w-[676px]">
            {links.map((link) => (
                <button
                    key={link.path}
                    onClick={() => router.push(link.path)}
                    style={{backgroundColor: link.bg}}
                    className="relative flex-1 h-[108px] rounded-[8px] overflow-hidden flex items-center justify-center gap-3 cursor-pointer"
                >
                    <Image
                        src={link.glow}
                        alt=""
                        width={154}
                        height={100}
                        className="absolute -left-10 top-1/2 -translate-y-1/2 scale-150 pointer-events-none"
                    />
                    <span
                        className="relative z-10 w-[44px] h-[44px] rounded-full bg-[#1C92E0] flex items-center justify-center shrink-0">
                        {link.icon}
                    </span>
                    <span style={{color: link.text}} className="relative z-10 text-[20px] font-medium">
                        {link.label}
                    </span>
                </button>
            ))}
        </div>
    </>;
}