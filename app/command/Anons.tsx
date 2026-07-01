import Image from "next/image";

export default function Anons() {
    return <>
        <div className="ml-5 flex flex-col items-start relative w-full p-4 bg-[#0B4789] overflow-hidden rounded-[8px] text-white">
            <Image
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="/bg.svg"
                alt="background pattern"
                width={326}
                height={180}
            />
            <Image
                src="/Vector.svg"
                alt="corner decoration"
                className="absolute top-0 right-0 w-auto h-auto"
                width={80}
                height={60}
            />

            <div className="flex items-center gap-2 z-10">
                <Image
                    src="/Frame12.svg"
                    alt="Yoshlar portali logo"
                    className="w-6 h-6 object-contain"
                    width={24}
                    height={24}
                />
                <div className="flex flex-col leading-tight font-poppins font-bold text-[13px]">
                    <span>Yoshlar</span>
                    <span>portali</span>
                </div>
            </div>

            <h1 className="font-poppins font-[700] text-[20px] leading-[130%] w-[280px] mt-4 z-10">
                Aynan <span className="text-[#ffff00]">siz</span> uchun qanday imtiyozlar borligini bilib oling
            </h1>
            <button className="flex items-center justify-center gap-2 w-[155px] bg-[#1C92E0] text-[16px] text-white py-2 px-4 font-poppins font-[500] h-[44px] cursor-pointer hover:bg-[#1676b5] transition-colors mt-4 rounded-[8px] z-10">
                Batafsil
                <Image
                    src="/arrow-forward-circle.svg"
                    alt="arrow icon"
                    className="w-4 h-4 object-contain"
                    width={16}
                    height={16}
                />
            </button>
        </div>
    </>;
}