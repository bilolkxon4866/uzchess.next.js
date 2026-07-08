"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
    degree: string; setDegree: (v: string) => void;
    category: string; setCategory: (v: string) => void;
    language: string; setLanguage: (v: string) => void;
    rating: string; setRating: (v: string) => void;
}

function Dropdown({ label, value, options, onChange }: {
    label: string;
    value: string;
    options: string[];
    onChange: (v: string) => void;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="mb-[20px]">
            <p className="text-[12px] text-[#9DA1A3] mb-[8px] uppercase">{label}</p>
            <div
                className="relative select-none bg-[#15181A] border border-[#232627] rounded-[8px] h-[48px] flex justify-between items-center px-[16px] cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <span className="text-[14px] text-white">{value}</span>
                <Image src="/chevron.svg" alt="arrow" width={16} height={16}/>
                {open && (
                    <div className="absolute top-[52px] left-0 w-full bg-[#15181A] border border-[#232627] rounded-[8px] z-50 overflow-hidden shadow-lg">
                        {options.map((opt) => (
                            <div
                                key={opt}
                                className="px-[16px] py-[10px] text-[14px] text-white hover:bg-[#272B30] cursor-pointer"
                                onClick={(e) => { e.stopPropagation(); onChange(opt); setOpen(false); }}
                            >
                                {opt}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function CourseFilterItem({ degree, setDegree, category, setCategory, language, setLanguage, rating, setRating }: Props) {
    return (
        <div>
            <Dropdown
                label="Darajani tanlang:"
                value={degree}
                options={["Barchasi", "Boshlang'ich", "O'rta", "Professional", "Havaskor"]}
                onChange={setDegree}
            />
            <Dropdown
                label="Kategoriya:"
                value={category}
                options={["Barchasi", "Strategiya", "Taktika", "Hujum qilish", "Qoidalar", "Himoyalanish"]}
                onChange={setCategory}
            />
            <Dropdown
                label="Darslik tili:"
                value={language}
                options={["Barchasi", "O'zbek", "English", "Russian"]}
                onChange={setLanguage}
            />

            {/* Reyting */}
            <div>
                <p className="text-[12px] text-[#9DA1A3] mb-[8px] uppercase">Reyting:</p>
                <div className="flex flex-row-reverse justify-around border border-[#232627] items-center bg-[#15181A] h-[56px] [&>input]:hidden [&>label]:text-[32px] [&>label]:cursor-pointer [&>label]:text-[#232627] [&>input:checked~label]:text-yellow-400 [&>label:hover]:text-yellow-400 [&>label:hover~label]:text-yellow-400 rounded-[8px]">
                    {[5,4,3,2,1].map((n) => (
                        <>
                            <input key={`i${n}`} type="radio" id={`cs${n}`} name="courseRating" value={String(n)} checked={rating === String(n)} onChange={(e) => setRating(e.target.value)}/>
                            <label key={`l${n}`} htmlFor={`cs${n}`}>★</label>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
}