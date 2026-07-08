import Image from "next/image";

export default function ChampionshipBanner() {
    return <>
        <button
            aria-label="Ko‘rish"
            className="relative w-[676px] h-[88px] rounded-[8px] overflow-hidden cursor-pointer block"
        >
            <Image
                src="/main-championship-banner.png"
                alt="Chess.com Global Championship"
                fill
                sizes="676px"
                className="object-cover"
            />
        </button>
    </>;
}
