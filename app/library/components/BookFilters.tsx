"use client";

import {useState} from "react";
import BookFilterItem from "@/app/library/components/BookFiltersItem";

export default function BookFilters() {
    const [degree, setDegree] = useState('Barchasi');
    const [category, setCategory] = useState('Barchasi');
    const [lessonLanguage, setLessonLanguage] = useState('Barchasi');
    const [rating, setRating] = useState('');
    const handleClearAll = () => {
        setDegree('Barchasi');
        setCategory('Barchasi');
        setLessonLanguage('Barchasi');
        setRating('');
    };

    return (
        <div
            className="w-[334px] h-[500px] ml-[30px] rounded-[8px] bg-[#1A1D1F] border-[1px] border-[#1F272A] flex flex-col p-[20px] items-center">
            <div className="w-[294px] h-[24px] flex justify-between items-center text-white font-poppins">
                <h1 className="w-[44px] h-[23px] font-medium">Filter</h1>
                <button
                    onClick={handleClearAll}
                    className="w-[71px] h-[24px] font-normal text-[#1C92E0] hover:text-blue-400 cursor-pointer transition-colors"
                >
                    Tozalash
                </button>
            </div>
            <BookFilterItem
                degree={degree} setDegree={setDegree}
                category={category} setCategory={setCategory}
                lessonLanguage={lessonLanguage} setLessonLanguage={setLessonLanguage}
                rating={rating} setRating={setRating}
            />
        </div>
    );
}