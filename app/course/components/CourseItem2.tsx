import axios from 'axios'
import {useEffect, useState} from "react";
import CourseItem from "@/app/course/components/CourseItem";
import Image from "next/image";

const STEP = 4;

export default function CourseItem2({search}: { search: string }) {
    const [course, setCourse] = useState<{
        id: number,
        author: string,
        category: string,
        language: string,
        difficulty: string,
        title: string,
        image: string,
        price: number,
        newPrice: number,
        rating: number,
        sectionsCount: number,
    }[]>([])
    const [shown, setShown] = useState(STEP);

    useEffect(() => {
        async function getAllCourse() {
            const response = await axios.get(`http://localhost:8888/public/courses?search=${search}`)
            setCourse(response.data.data)
        }

        getAllCourse()
    }, [search])

    const loadMore = () => {
        setShown((prev) => prev + STEP);
    };

    return <div className="w-full">
        {course?.length > 0 ? (
            course.slice(0, shown).map((item) => <CourseItem
                key={item.id}
                id={item.id}
                author={item.author}
                category={item.category}
                language={item.language}
                difficulty={item.difficulty}
                title={item.title}
                image={item.image}
                price={item.price}
                newPrice={item.newPrice}
                rating={item.rating}
                sectionsCount={item.sectionsCount}
            />)) : (
            <div
                className="flex flex-col items-center justify-center py-16 bg-[#202020] border border-[#1F272A] rounded-[12px]">
                <Image src="/NotFound.svg" alt="" className="w-[200px] h-[180px] mb-4" width={200} height={180}/>
            </div>
        )
        }
        {shown < (course?.length || 0) && (
            <button
                onClick={loadMore}
                className="ml-[280px] w-[131px] h-[40px] mt-[20px] bg-[#1A1D1F] rounded-[8px] text-white"
            >
                Ko'proq
            </button>
        )}

    </div>
}