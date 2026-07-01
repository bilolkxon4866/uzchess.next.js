"use client"
import Anons from "@/app/command/Anons";
import Image from "next/image";

export default function DonationsBanner() {
    return <div className="flex flex-col items-center gap-6 w-[370px]">
        <Anons/>
        <div
            className="w-full h-[82px] flex items-center gap-3 p-[20px] bg-[#1A1D1F] ml-[20px] border-[1px] border-[#1F272A] rounded-[8px]">
            <Image src="icon78.svg" alt="icons" className="w-[42px] h-[42px] object-cover" width={42} height={42}/>
            <div className="w-full">
                <h1 className="w-[158px] h-[24px] font-normal text-[16px] text-[#FCFCFC]">Loyiha rivojiga xissa</h1>
                <h4 className="w-[221px] h-[21px] text-[14px] text-[#6F767E] font-normal">Shaxmat rivojiga hissa qoshing</h4>
            </div>
            <h1 className="w-[41px] h-[16px] flex items-center justify-center bg-[#1C92E0] text-[#F7F9FA] text-center text-[12px] font-medium font-inter rounded-[4px]">soon</h1>
        </div>
    </div>
}