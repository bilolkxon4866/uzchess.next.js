import Image from "next/image";

export default function DonationCard() {
    return <>
        <div
            className="w-[326px] h-[82px] flex items-center gap-3 p-[20px] bg-[#1A1D1F] border-[1px] border-[#1F272A] rounded-[8px]">
            <Image src="/icon78.svg" alt="icons" className="w-[42px] h-[42px] object-cover shrink-0" width={42} height={42}/>
            <div className="flex-1 min-w-0">
                <h1 className="text-[16px] font-normal text-[#FCFCFC] truncate">Loyiha rivojiga xissa</h1>
                <h4 className="text-[14px] text-[#6F767E] font-normal truncate">Shaxmat rivojiga hissa qo‘shing</h4>
            </div>
            <h1 className="w-[41px] h-[16px] shrink-0 flex items-center justify-center bg-[#1C92E0] text-[#F7F9FA] text-center text-[12px] font-medium font-inter rounded-[4px]">soon</h1>
        </div>
    </>;
}