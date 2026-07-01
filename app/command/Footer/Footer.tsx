import Image from "next/image";

export default function Footer(){
    return <>
        <footer className="mt-[54px] w-full h-[208px] flex flex-col gap-4 items-center justify-center bg-[#1A1D1F]">
            <Image
                src="/icon.svg"
                alt="icon chess"
                width={113}
                height={28}
                className="w-[112.62px] h-[28px]"
            />

            <div className="w-[632px] h-[21px] flex gap-6 text-gray-400">
                <p className="w-[97px] h-[21px] text-[14px] font-normal tracking-tight cursor-pointer hover:text-white">Biz haqimizda</p>
                <p className="w-[151px] h-[21px] text-[14px] font-normal tracking-tight cursor-pointer hover:text-white">Cookie fayllar siyosati</p>
                <p className="w-[151px] h-[21px] text-[14px] font-normal tracking-tight cursor-pointer hover:text-white">Foydalanuvchi qoidalari</p>
                <p className="w-[151px] h-[21px] text-[14px] font-normal tracking-tight cursor-pointer hover:text-white">Cookie fayllar siyosati</p>
            </div>

            <div className="w-[148px] h-[20px] flex gap-3">
                <Image src="/instagram.svg" alt="instagram icon" width={20} height={20} className="cursor-pointer" />
                <Image src="/telegram.svg" alt="telegram icon" width={20} height={20} className="cursor-pointer" />
                <Image src="/youtube.svg" alt="youtube icon" width={20} height={20} className="cursor-pointer" />
                <Image src="/twitter.svg" alt="twitter icon" width={20} height={20} className="cursor-pointer" />
                <Image src="/facebook.svg" alt="facebook icon" width={20} height={20} className="cursor-pointer" />
            </div>

            <div className="flex justify-between w-full h-[50px] rounded-t-[2px] border-t-[#F7F9FA1A] border-t-[1px] mb-[-37px] pt-[14px] px-[32px] pb-[11px] text-gray-400">
                <p className="w-[238px] h-[24px] font-normal text-[16px] tracking-tight">© UzChess. All rights reserved.</p>
                <Image
                    src="/Group 1.svg"
                    alt="icon"
                    width={33}
                    height={18}
                    className="w-[33px] h-[18px] mt-1"
                />
                <p className="w-[172px] h-[24px] font-normal text-[16px] tracking-tight cursor-pointer hover:text-white">Foydalanish qoidalari</p>
            </div>
        </footer>
    </>;
}