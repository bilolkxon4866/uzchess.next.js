import Anons from "@/app/command/Anons";
import Image from "next/image";

export default function YoshlarAgencyPoster() {
    return (
        <div className="flex flex-col w-[326px] items-center gap-6">
            <Anons/>

            <div
                className="relative w-[326px] h-[471px] bg-[#121C26] rounded-[20px] ml-[20px] flex flex-col items-center justify-between p-[36px] overflow-hidden">
                <Image
                    src="/Subtract.svg"
                    alt="gerb bg"
                    width={310}
                    height={310}
                    className="text-[#FFFFFF] opacity-[0.03] absolute top-[40px] left-1/2 -translate-x-1/2 pointer-events-none z-0"
                />
                <div className="w-[220px] h-[38px] flex gap-2 z-10 items-center whitespace-nowrap">
                    <Image src="/gerb.svg" alt="gerb" width={38} height={38}/>
                    <div className="flex flex-col text-white">
                        <h1 className="text-[14px] font-bold tracking-wide leading-none font-poppins">YOSHLAR
                            ISHLARI</h1>
                        <p className="text-[10px] text-gray-400 font-medium tracking-[0.15em] mt-[3px] leading-none">AGENTLIGI</p>
                    </div>
                </div>

                <h2 className="font-poppins font-bold text-[20px] leading-[140%] text-center text-white z-10 w-full max-w-[270px]">
                    Yoshlarga oid yangiliklarni <br/> biz bilan kuzating
                </h2>
                <a
                    href="https://yoshlar.gov.uz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2B83ED] text-[16px] font-medium z-10 hover:underline transition-all font-poppins mb-[4px]">
                    yoshlar.gov.uz
                </a>
            </div>
        </div>
    );
}