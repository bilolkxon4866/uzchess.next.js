"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

const STEP = 4;

interface CourseType {
    id: number;
    title: string;
    image: string;
    price: number;
    newPrice: number;
    rating: number;
    sectionCount: number;
    lessonsCount: number;
    isLike: boolean;
    authorId: { fullName: string };
    difficultyId: { title: string };
    categoryId: { title: string };
}

interface Props {
    search: string;
    degree: string;
    category: string;
    language: string;
    rating: string;
}

function StarRow({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-[4px]">
            {[1,2,3,4,5].map((n) => (
                <svg key={n} width="14" height="14" viewBox="0 0 24 24" fill={n <= rating ? "#E0B531" : "#272B30"}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
            ))}
        </div>
    );
}

export default function CourseList({ search, degree, category, language, rating }: Props) {
    const router = useRouter();
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [shown, setShown] = useState(STEP);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getCourses() {
            try {
                setLoading(true);
                const params = new URLSearchParams();
                if (search) params.append("search", search);
                if (degree !== "Barchasi") params.append("difficulty", degree);
                if (category !== "Barchasi") params.append("category", category);
                if (language !== "Barchasi") params.append("language", language);
                if (rating) params.append("rating", rating);

                const url = `http://localhost:8888/public/courses${params.toString() ? "?" + params.toString() : ""}`;
                const response = await axios.get(url);
                const result = response.data?.data || response.data;
                if (Array.isArray(result)) {
                    setCourses(result);
                    setShown(STEP);
                }
            } catch (error) {
                console.error("Kurslarni yuklashda xatolik:", error);
            } finally {
                setLoading(false);
            }
        }
        getCourses();
    }, [search, degree, category, language, rating]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[300px]">
                <p className="text-[#6F767E]">Yuklanmoqda...</p>
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[400px] gap-4">
                <Image src="/NotFound.svg" alt="topilmadi" width={488} height={263}/>

            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col gap-[16px]">
                {courses.slice(0, shown).map((course) => (
                    <div
                        key={course.id}
                        onClick={() => router.push(`/course/${course.id}`)}
                        className="flex gap-[16px] bg-[#1A1D1F] rounded-[12px] p-[16px] cursor-pointer hover:bg-[#1F2226] transition-colors border border-transparent hover:border-[#272B30]"
                    >
                        {/* Rasm */}
                        <div className="relative w-[140px] h-[100px] rounded-[8px] overflow-hidden shrink-0">
                            <Image
                                src={`http://localhost:8888/${course.image}`}
                                alt={course.title}
                                fill
                                sizes="140px"
                                className="object-cover"
                            />
                            {/* Reyting */}
                            <div className="absolute top-[6px] left-[6px] flex items-center gap-1 bg-black/60 rounded-[4px] px-[6px] py-[2px]">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="#E0B531">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                </svg>
                                <span className="text-[11px] text-white font-medium">{course.rating}</span>
                            </div>
                        </div>

                        {/* Ma'lumot */}
                        <div className="flex flex-col justify-between flex-1 min-w-0">
                            <div>
                                <h3 className="text-[16px] font-bold text-[#FCFCFC] line-clamp-1 mb-[4px]">
                                    {course.title}
                                </h3>
                                <p className="text-[13px] text-[#9DA1A3]">
                                    {course.authorId?.fullName}
                                </p>
                            </div>

                            {/* Narx */}
                            <div className="flex items-center gap-[8px]">
                                {course.newPrice ? (
                                    <>
                                        <span className="text-[15px] font-bold text-[#2470FF]">
                                            {course.newPrice?.toLocaleString()} uzs
                                        </span>
                                        <span className="text-[13px] text-[#6F767E] line-through">
                                            {course.price?.toLocaleString()}.00 uzs
                                        </span>
                                    </>
                                ) : course.price === 0 ? (
                                    <span className="text-[15px] font-bold text-[#12B76A]">Bepul kurs</span>
                                ) : (
                                    <span className="text-[15px] font-bold text-[#2470FF]">
                                        {course.price?.toLocaleString()} uzs
                                    </span>
                                )}
                            </div>

                            {/* Pastki info */}
                            <div className="flex items-center gap-[16px] text-[13px] text-[#6F767E]">
                                <span className="flex items-center gap-1">
                                    <Image src="/difficulty.svg" alt="daraja" width={14} height={14}/>
                                    {course.difficultyId?.title || "—"}
                                </span>
                                <span className="text-[#272B30]">|</span>
                                <span className="flex items-center gap-1">
                                    <Image src="/lessons.svg" alt="bo'limlar" width={14} height={14}/>
                                    {course.sectionCount} ta bo&apos;lim
                                </span>
                                <span className="text-[#272B30]">|</span>
                                <span className="flex items-center gap-1">
                                    <Image src="/category.svg" alt="kategoriya" width={14} height={14}/>
                                    {course.categoryId?.title || "—"}
                                </span>
                                <button
                                    onClick={(e) => { e.stopPropagation(); }}
                                    className="ml-auto cursor-pointer"
                                >
                                    <Image src="/heart.svg" alt="saqlash" width={18} height={18}/>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {shown < courses.length && (
                <div className="flex justify-center mt-[24px]">
                    <button
                        onClick={() => setShown((prev) => prev + STEP)}
                        className="w-[131px] h-[40px] bg-[#1A1D1F] rounded-[8px] text-white hover:bg-[#25292c] transition-colors cursor-pointer border border-[#272B30]"
                    >
                        Ko&apos;proq
                    </button>
                </div>
            )}
        </div>
    );
}