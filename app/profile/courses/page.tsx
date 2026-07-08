"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { api } from "@/app/lib/api";

interface PurchasedCourse {
    id: number;
    coursesId: {
        id: number;
        title: string;
        image: string;
        rating: number;
        lessonsCount: number;
        difficultyId: { title: string };
        authorId: { fullName: string };
    };
    isCompleted: boolean;
    date: string;
}

export default function CoursesPage() {
    const router = useRouter();
    const [courses, setCourses] = useState<PurchasedCourse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getCourses() {
            try {
                const response = await api.get("/public/purchasedCourse");
                const result = response.data?.data || response.data;
                if (Array.isArray(result)) setCourses(result);
            } catch (error) {
                console.error("Kurslarni yuklashda xatolik:", error);
            } finally {
                setLoading(false);
            }
        }
        getCourses();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[400px]">
                <p className="text-[#6F767E] text-[16px]">Yuklanmoqda...</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-[16px]">
            {courses.length === 0 ? (
                <div className="col-span-2 flex flex-col items-center justify-center h-[400px] gap-4">
                    <Image src="/NotFound.svg" alt="bo'sh" width={488} height={263} />
                    <p className="text-[16px] text-[#6F767E]">Sotib olingan kurslar yo&apos;q</p>
                </div>
            ) : (
                courses.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => router.push(`/course/${item.coursesId.id}`)}
                        className="bg-[#1A1D1F] rounded-[12px] p-[16px] flex gap-[16px] cursor-pointer hover:bg-[#1F2226] transition-colors"
                    >
                        {/* Rasm */}
                        <div className="relative w-[80px] h-[80px] rounded-[8px] overflow-hidden shrink-0">
                            <Image
                                src={`http://localhost:8888/${item.coursesId.image}`}
                                alt={item.coursesId.title}
                                fill
                                sizes="80px"
                                className="object-cover"
                            />
                        </div>

                        {/* Ma'lumot */}
                        <div className="flex flex-col justify-between min-w-0">
                            <h3 className="text-[15px] font-bold text-[#FCFCFC] line-clamp-2 leading-[20px]">
                                {item.coursesId.title}
                            </h3>

                            <div className="flex items-center gap-[12px] text-[13px] text-[#6F767E] flex-wrap">
                                <span className="flex items-center gap-1">
                                    {/* Bu yerga daraja ikonkasi qo'yasiz */}
                                    <Image src="/difficulty.svg" alt="daraja" width={14} height={14} />
                                    {item.coursesId.difficultyId?.title || "—"}
                                </span>
                                <span className="text-[#272B30]">|</span>
                                <span className="flex items-center gap-1">
                                    {/* Bu yerga muallif ikonkasi qo'yasiz */}
                                    <Image src="/author.svg" alt="muallif" width={14} height={14} />
                                    {item.coursesId.authorId?.fullName || "—"}
                                </span>
                                <span className="text-[#272B30]">|</span>
                                <span className="flex items-center gap-1">
                                    {/* Bu yerga darslar ikonkasi qo'yasiz */}
                                    <Image src="/lessons.svg" alt="darslar" width={14} height={14} />
                                    {item.coursesId.lessonsCount} ta dars
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}