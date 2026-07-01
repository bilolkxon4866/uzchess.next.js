"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

interface NewsItemProps {
    title: string;
    date: string;
    image: string;
    content: string;
    id: any;
}

export default function NewsItem({ title, date, image, content, id }: NewsItemProps) {
    const router = useRouter();
    const backendUrl = 'http://localhost:8888';

    const imageSrc = image
        ? (image.startsWith('http') ? image : `${backendUrl}/${image.replace(/^\//, '')}`)
        : '/NotFound.svg';

    return (
        <div
            onClick={() => router.push(`/news/${id}`)}
            className="w-[326px] h-[251px] p-3 bg-[#1A1D1F] rounded-[8px] text-white border border-transparent hover:border-[#1C92E0] transition-all cursor-pointer flex flex-col justify-between"
        >
            <div>
                <Image
                    src={imageSrc}
                    alt={title || "news-image"}
                    className="w-[302px] h-[113px] rounded-t-[4px] object-cover"
                    width={302}
                    height={113}
                />
                <p className="w-[200px] h-[21px] font-inter font-normal text-[#F7F9FA66] tracking-tighter text-[14px] mt-[7px]">
                    {date}
                </p>
            </div>
            <div className="w-[302px] h-[80px] flex flex-col justify-between mt-[6px]">
                <h4 className="text-[14px] font-sans w-[302px] h-[36px] font-medium line-clamp-2 leading-[18px] hover:text-[#1C92E0]">
                    {title}
                </h4>
                <h5 className="text-[12px] font-sans w-[302px] h-[36px] font-normal text-[#9DA1A3] line-clamp-2 leading-[18px]">
                    {content}
                </h5>
            </div>
        </div>
    );
}