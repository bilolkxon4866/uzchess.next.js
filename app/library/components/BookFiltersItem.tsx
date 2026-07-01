"use client";

import { useState } from "react";
import Image from "next/image";

interface BookFilterItemProps {
    degree: string;
    setDegree: (val: string) => void;
    category: string;
    setCategory: (val: string) => void;
    lessonLanguage: string;
    setLessonLanguage: (val: string) => void;
    rating: string;
    setRating: (val: string) => void;
}

export default function BookFilterItem({
                                           degree, setDegree,
                                           category, setCategory,
                                           lessonLanguage, setLessonLanguage,
                                           rating, setRating
                                       }: BookFilterItemProps) {
    const [isOpenDegree, setIsOpenDegree] = useState(false);
    const [isOpenCategory, setIsOpenCategory] = useState(false);
    const [isOpenLessonLanguage, setIsOpenLessonLanguage] = useState(false);

    return (
        <div className="w-[286px] h-[401px] mt-[24px] text-white font-poppins">
            <div className="w-[286px] h-[82px] mb-[24px]">
                <p className="font-medium text-[12px] text-[#F7F9FA99] mb-[16px] uppercase">TILNI TANLANG:</p>
                <div
                    className="relative select-none bg-[#15181A] border-[#232627] border-[1px] rounded-[8px] w-[286px] h-[54px] flex justify-between items-center p-[16px] cursor-pointer"
                    onClick={() => setIsOpenLessonLanguage(!isOpenLessonLanguage)}>
                    <div>{lessonLanguage}</div>
                    <Image src="/select.svg" alt="select icon" width={16} height={16}/>
                    {isOpenLessonLanguage && (
                        <div
                            className="absolute top-[58px] left-0 w-full bg-[#15181A] border-[#232627] border-[1px] rounded-[8px] p-2 z-50 flex flex-col gap-2 shadow-lg">
                            {['Barchasi', 'English', "O'zbek", 'Russian'].map((lang) => (
                                <div key={lang} className="hover:text-[#1C92E0] p-1" onClick={(e) => {
                                    e.stopPropagation();
                                    setLessonLanguage(lang);
                                    setIsOpenLessonLanguage(false);
                                }}>{lang}</div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="w-[286px] h-[82px] mb-[24px]">
                <p className="font-medium text-[12px] text-[#F7F9FA99] mb-[16px]">Darajani tanlang:</p>
                <div
                    className="relative select-none bg-[#15181A] border-[#232627] border-[1px] rounded-[8px] w-[286px] h-[54px] flex justify-between items-center p-[16px] cursor-pointer"
                    onClick={() => setIsOpenDegree(!isOpenDegree)}>
                    <div>{degree}</div>
                    <Image src="/select.svg" alt="select icon" width={16} height={16}/>
                    {isOpenDegree && (
                        <div
                            className="absolute top-[58px] left-0 w-full bg-[#15181A] border-[#232627] border-[1px] rounded-[8px] p-2 z-50 flex flex-col gap-2 shadow-lg">
                            {['Barchasi', 'Yuqori', "O'rta", 'Past'].map((deg) => (
                                <div key={deg} className="hover:text-[#1C92E0] p-1" onClick={(e) => {
                                    e.stopPropagation();
                                    setDegree(deg);
                                    setIsOpenDegree(false);
                                }}>{deg}</div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="w-[286px] h-[82px] mb-[24px]">
                <p className="font-medium text-[12px] text-[#F7F9FA99] mb-[16px]">Kategoriya:</p>
                <div
                    className="relative select-none bg-[#15181A] border-[#232627] border-[1px] rounded-[8px] w-[286px] h-[54px] flex justify-between items-center p-[16px] cursor-pointer"
                    onClick={() => setIsOpenCategory(!isOpenCategory)}>
                    <div>{category}</div>
                    <Image src="/select.svg" alt="select icon" width={16} height={16}/>
                    {isOpenCategory && (
                        <div
                            className="absolute top-[58px] left-0 w-full bg-[#15181A] border-[#232627] border-[1px] rounded-[8px] p-2 z-50 flex flex-col gap-2 shadow-lg">
                            {['Barchasi', 'English', "O'zbek", 'Russian'].map((cat) => (
                                <div key={cat} className="hover:text-[#1C92E0] p-1" onClick={(e) => {
                                    e.stopPropagation();
                                    setCategory(cat);
                                    setIsOpenCategory(false);
                                }}>{cat}</div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="w-[286px] h-[82px]">
                <p className="font-medium text-[12px] text-[#F7F9FA99] mb-[16px] uppercase">Reyting:</p>
                <div
                    className="flex flex-row-reverse justify-around border-[#232627] border-[1px] items-center [&>input]:hidden bg-[#15181A] w-[286px] h-[56px] [&>label]:text-[35px] [&>label]:cursor-pointer [&>label]:text-[#232627] [&>input:checked~label]:text-yellow-400 [&>label:hover]:text-yellow-400 [&>label:hover~label]:text-yellow-400 rounded-[8px]">

                    <input type="radio" id="s5" name="rating" value="5" checked={rating === "5"} onChange={(e) => setRating(e.target.value)} />
                    <label htmlFor="s5">★</label>

                    <input type="radio" id="s4" name="rating" value="4" checked={rating === "4"} onChange={(e) => setRating(e.target.value)} />
                    <label htmlFor="s4">★</label>

                    <input type="radio" id="s3" name="rating" value="3" checked={rating === "3"} onChange={(e) => setRating(e.target.value)} />
                    <label htmlFor="s3">★</label>

                    <input type="radio" id="s2" name="rating" value="2" checked={rating === "2"} onChange={(e) => setRating(e.target.value)} />
                    <label htmlFor="s2">★</label>

                    <input type="radio" id="s1" name="rating" value="1" checked={rating === "1"} onChange={(e) => setRating(e.target.value)} />
                    <label htmlFor="s1">★</label>
                </div>
            </div>
        </div>
    );
}