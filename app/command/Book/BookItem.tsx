import Anons from "@/app/command/Anons";
import Image from "next/image";

export default function BookItem() {
    return <>
        <div className="w-[326px] mt-[-60px] flex flex-col gap-6 items-center">
            <Anons/>

            <div className="w-[326px] rounded-[6px] bg-[#1A1D1F] p-[16px] ml-[22px]">
                <div className="flex justify-between items-center mb-[20px]">
                    <h1 className="text-[white] text-[16px] font-medium">Top kitoblar</h1>
                    <div className="flex items-center gap-1 cursor-pointer">
                        <h1 className="text-[#9DA1A3] text-[14px] font-sans">Barchasi</h1>
                        <Image src="/chevron1.svg" alt="hammasi belgisi" width={16} height={16} />
                    </div>
                </div>

                <div className="flex flex-col gap-[12px]">

                    <div className="flex gap-[12px] items-start">
                        <div className="relative w-[45px] h-[60px] shrink-0">
                            <Image
                                src="/book-image.svg"
                                alt="ot rasmi"
                                className="rounded-[4px] object-cover"
                                fill
                            />
                        </div>
                        <div className="flex flex-col justify-center min-w-0">
                            <h4 className="text-[13px] font-bold text-amber-50 line-clamp-2 leading-[16px] mb-[4px]">
                                Shaxmatdagi qobiliyatliringizga qayta baxo bering
                            </h4>
                            <h4 className="text-[#F0F0F0B8] font-normal text-[12px]">J.Silman</h4>
                        </div>
                    </div>
                    <hr className="border-[#1F272A]"/>

                    <div className="flex gap-[12px] items-start">
                        <div className="relative w-[45px] h-[60px] shrink-0">
                            <Image
                                src="/book-img-2.svg"
                                alt="ot rasmi"
                                className="rounded-[4px] object-cover"
                                fill
                            />
                        </div>
                        <div className="flex flex-col justify-center min-w-0">
                            <h4 className="text-[13px] font-bold text-amber-50 line-clamp-2 leading-[16px] mb-[4px]">
                                Mening tizimim
                            </h4>
                            <h4 className="text-[#F0F0F0B8] font-normal text-[12px]">A.Nimzowitsch</h4>
                        </div>
                    </div>
                    <hr className="border-[#1F272A]"/>

                    <div className="flex gap-[12px] items-start">
                        <div className="relative w-[45px] h-[60px] shrink-0">
                            <Image
                                src="/book-img-3.svg"
                                alt="ot rasmi"
                                className="rounded-[4px] object-cover"
                                fill
                            />
                        </div>
                        <div className="flex flex-col justify-center min-w-0">
                            <h4 className="text-[13px] font-bold text-amber-50 line-clamp-2 leading-[16px] mb-[4px]">
                                Zurixdagi shaxmat musobaqasi
                            </h4>
                            <h4 className="text-[#F0F0F0B8] font-normal text-[12px]">D.Bronstein</h4>
                        </div>
                    </div>
                    <hr className="border-[#1F272A]"/>

                    <div className="flex gap-[12px] items-start">
                        <div className="relative w-[45px] h-[60px] shrink-0">
                            <Image
                                src="/Rectangle%207.svg"
                                alt="ot rasmi"
                                className="rounded-[4px] object-cover"
                                fill
                            />
                        </div>
                        <div className="flex flex-col justify-center min-w-0">
                            <h4 className="text-[13px] font-bold text-amber-50 line-clamp-2 leading-[16px] mb-[4px]">
                                Mening esdaqolarlik o‘yinlarim
                            </h4>
                            <h4 className="text-[#F0F0F0B8] font-normal text-[12px]">B.Fischer</h4>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>;
}