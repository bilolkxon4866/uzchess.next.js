"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import BookItem from "./BookItems";
const STEP = 4;
interface CourseItem {
    id: number;
    author: any;
    category: any;
    language: any;
    difficulty: any;
    title: string;
    image: string;
    price: number;
    newPrice: number;
    rating: number;
}

export default function BookItemContainer({ search }: { search: string }) {
    const [course, setCourse] = useState<CourseItem[]>([]);
    const [shown, setShown] = useState(STEP);

    useEffect(() => {
        async function getAllCourse() {
            try {
                const url = search
                    ? `http://localhost:8888/public/book?search=${search}`
                    : `http://localhost:8888/public/book`;

                const response = await axios.get(url);
                setCourse(response.data.data);
            } catch (error) {
                console.error("Ma'lumotlarni yuklashda xatolik:", error);
            }
        }

        getAllCourse();
    }, [search]);

    const loadMore = () => {
        setShown((prev) => prev + STEP);
    };

    return (
        <div className="w-full">
            {/* course yoniga ?. qo'shildi, bu massiv bo'sh bo'lsa xato bermaslikni ta'minlaydi */}
            {course?.slice(0, shown).map((item) => (
                <BookItem
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
                />
            ))}

            {/* Bu yerda ham course borligini va uzaytirish tugmasini tekshiramiz */}
            {course && shown < course.length && (
                <button
                    onClick={loadMore}
                    className="ml-[280px] w-[131px] h-[40px] mt-[20px] bg-[#1A1D1F] rounded-[8px] text-white hover:bg-[#25292c] transition-colors cursor-pointer"
                >
                    Ko'proq
                </button>
            )}
        </div>
    );
}