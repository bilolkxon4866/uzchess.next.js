"use client";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import axios from "axios";

interface CourseType {
    id: number;
    title: string;
    image: string;
    rating: number;
    reviewsCount: number;
}

function StarIcon() {
    return <>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#E0B531">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
    </>;
}

function EyeIcon() {
    return <>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F0F0F0" strokeWidth="1.5">
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
            <circle cx="12" cy="12" r="3"/>
        </svg>
    </>;
}

function CourseCard({course, onClick}: { course: CourseType; onClick: () => void }) {
    return <>
        <button onClick={onClick} className="w-full flex gap-3 items-start text-left cursor-pointer">
            <div className="relative w-[80px] h-[80px] rounded-[8px] overflow-hidden shrink-0">
                <Image src={`http://localhost:8888/${course.image}`} alt={course.title} fill sizes="80px" className="object-cover"/>
            </div>
            <div className="flex flex-col gap-2 min-w-0 pt-1">
                <h4 className="text-[14px] font-bold leading-[17px] line-clamp-2 text-[#FCFCFC]">
                    {course.title}
                </h4>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[14px] font-medium text-[#FCFCFC]">
                        <StarIcon/>
                        {course.rating}
                    </span>
                    <span className="flex items-center gap-1 text-[13px] text-[#F0F0F0]">
                        <EyeIcon/>
                        {course.reviewsCount}
                    </span>
                </div>
            </div>
        </button>
    </>;
}

export default function TopCourses() {
    const router = useRouter();
    const [courses, setCourses] = useState<CourseType[]>([]);

    useEffect(() => {
        async function getCourses() {
            try {
                const response = await axios.get("http://localhost:8888/public/courses");
                const result = response.data?.data || response.data;
                if (Array.isArray(result)) {
                    setCourses(result.slice(0, 4));
                }
            } catch (error) {
                console.error("Kurslarni yuklashda xatolik:", error);
            }
        }
        getCourses();
    }, []);

    return <>
        <div className="w-[326px] bg-[#1A1D1F] rounded-[8px] p-[16px]">
            <div className="flex items-center justify-between mb-[20px]">
                <h2 className="text-[18px] font-medium text-[#FCFCFC]">Top kurslar</h2>
                <button
                    onClick={() => router.push("/course")}
                    className="flex items-center gap-1 text-[16px] text-[#6C6F70] cursor-pointer hover:text-white transition-colors">
                    Barchasi
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2">
                        <path d="M9 6l6 6-6 6"/>
                    </svg>
                </button>
            </div>

            <div className="flex flex-col gap-[16px]">
                {courses.map((course, i) => (
                    <div key={course.id} className="contents">
                        <CourseCard course={course} onClick={() => router.push(`/course/${course.id}`)}/>
                        {i !== courses.length - 1 && <hr className="border-[#272B30]"/>}
                    </div>
                ))}
            </div>
        </div>
    </>;
}