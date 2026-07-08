"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Footer from "@/app/command/Footer/Footer";
import YoshlarAgencyPoster from "@/app/command/YoshlarAgency";

interface LessonType {
    id: number;
    title: string;
    content: string;
    video: string;
    thumbnail: string;
    isFree: boolean;
    order: number;
    courseSectionId: number;
    courseId: number;
    date: string;
}

export default function LessonPage() {
    const params = useParams();
    const router = useRouter();
    const [lesson, setLesson] = useState<LessonType | null>(null);
    const [allLessons, setAllLessons] = useState<LessonType[]>([]);
    const [showCertModal, setShowCertModal] = useState(false);
    const [showNextModal, setShowNextModal] = useState(false);
    const [countdown, setCountdown] = useState(20);
    const [loading, setLoading] = useState(true);

    const currentIndex = allLessons.findIndex((l) => l.id === Number(params.lessonId));
    const prevLesson = allLessons[currentIndex - 1];
    const nextLesson = allLessons[currentIndex + 1];
    const isLastLesson = currentIndex === allLessons.length - 1;

    useEffect(() => {
        async function getData() {
            try {
                const [lessonRes, allRes] = await Promise.all([
                    axios.get(`http://localhost:8888/public/courseLesson/${params.lessonId}`),
                    axios.get("http://localhost:8888/public/courseLesson"),
                ]);
                setLesson(lessonRes.data);
                const all = allRes.data?.data || allRes.data || [];
                setAllLessons(all.filter((l: any) => l.courseId === Number(params.id)).sort((a: any, b: any) => a.order - b.order));
            } catch (error) {
                console.error("Darsni yuklashda xatolik:", error);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [params.lessonId, params.id]);

    // Countdown
    useEffect(() => {
        if (!showNextModal) return;
        if (countdown <= 0) {
            router.push(`/course/${params.id}/lesson/${nextLesson?.id}`);
            return;
        }
        const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
        return () => clearTimeout(timer);
    }, [showNextModal, countdown]);

    function handleVideoEnd() {
        if (isLastLesson) {
            setShowCertModal(true);
        } else {
            setShowNextModal(true);
            setCountdown(20);
        }
    }

    if (loading || !lesson) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#111315]">
                <p className="text-[#6F767E]">Yuklanmoqda...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#111315] text-white">
            {/* Yuqori qism */}
            <div className="flex gap-[16px] px-[40px] pt-[24px]">

                {/* Video qismi */}
                <div className="flex-1">
                    {/* Sarlavha */}
                    <h1 className="text-[22px] font-bold text-[#FCFCFC] mb-[4px]">{lesson.title}</h1>
                    {lesson.date && (
                        <p className="text-[13px] text-[#6F767E] mb-[12px]">
                            {lesson.date?.slice(0, 10)} • {lesson.date?.slice(11, 16)}
                        </p>
                    )}

                    {/* Video player */}
                    <div className="relative w-full rounded-[12px] overflow-hidden bg-[#0D1117]" style={{ aspectRatio: "16/9" }}>
                        {lesson.video ? (
                            <video
                                src={`http://localhost:8888/${lesson.video}`}
                                controls
                                className="w-full h-full"
                                onEnded={handleVideoEnd}
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Image src="/course-placeholder.svg" alt="video" fill className="object-cover opacity-30"/>
                                <button className="w-[64px] h-[64px] bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                                        <polygon points="5 3 19 12 5 21 5 3"/>
                                    </svg>
                                </button>
                            </div>
                        )}

                        {/* Keyingi video countdown */}
                        {showNextModal && nextLesson && (
                            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-[12px]">
                                <p className="text-[14px] text-[#9DA1A3]">Keyingisi:</p>
                                <h3 className="text-[18px] font-bold text-white">{nextLesson.title}</h3>
                                <div className="relative w-[160px] h-[100px] rounded-[8px] overflow-hidden">
                                    <Image
                                        src={nextLesson.thumbnail ? `http://localhost:8888/${nextLesson.thumbnail}` : "/course-placeholder.svg"}
                                        alt={nextLesson.title}
                                        fill
                                        sizes="160px"
                                        className="object-cover"
                                    />
                                </div>
                                <p className="text-[20px] font-bold text-[#2470FF]">{countdown} soniyada o&apos;ynaydi</p>
                                <button
                                    onClick={() => {
                                        setShowNextModal(false);
                                        router.push(`/course/${params.id}/lesson/${nextLesson.id}`);
                                    }}
                                    className="px-[24px] h-[40px] bg-[#2470FF] rounded-[8px] text-[14px] text-white cursor-pointer"
                                >
                                    Hozir boshlash
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Kontent */}
                    <div className="mt-[16px] text-[14px] text-[#9DA1A3] leading-[22px]">
                        {lesson.content}
                    </div>

                    {/* Navigatsiya */}
                    <div className="flex justify-between mt-[24px] mb-[24px]">
                        <button
                            onClick={() => prevLesson && router.push(`/course/${params.id}/lesson/${prevLesson.id}`)}
                            disabled={!prevLesson}
                            className="flex items-center gap-2 px-[20px] h-[44px] bg-[#1A1D1F] rounded-[8px] text-[14px] text-[#FCFCFC] cursor-pointer hover:bg-[#272B30] disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6"/>
                            </svg>
                            Oldingi
                        </button>
                        <button
                            onClick={() => nextLesson && router.push(`/course/${params.id}/lesson/${nextLesson.id}`)}
                            disabled={!nextLesson}
                            className="flex items-center gap-2 px-[20px] h-[44px] bg-[#1A1D1F] rounded-[8px] text-[14px] text-[#FCFCFC] cursor-pointer hover:bg-[#272B30] disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Keyingni
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 18l6-6-6-6"/>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* O'ng — darslar ro'yxati */}
                <div className="w-[260px] shrink-0 flex flex-col gap-[16px]">
                    <div className="bg-[#1A1D1F] rounded-[12px] overflow-hidden max-h-[500px] overflow-y-auto">
                        {allLessons.map((l, i) => {
                            const isCurrent = l.id === Number(params.lessonId);
                            const isCompleted = i < currentIndex;
                            return (
                                <button
                                    key={l.id}
                                    onClick={() => router.push(`/course/${params.id}/lesson/${l.id}`)}
                                    className={`w-full flex items-center gap-[10px] px-[12px] h-[52px] border-b border-[#272B30] last:border-0 cursor-pointer text-left transition-colors ${
                                        isCurrent ? "bg-[#2470FF]/20" : "hover:bg-[#272B30]"
                                    }`}
                                >
                                    {/* Status ikonkasi */}
                                    <div className={`w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0 ${
                                        isCompleted ? "bg-[#12B76A]" :
                                            isCurrent ? "bg-[#2470FF]" :
                                                "bg-[#272B30]"
                                    }`}>
                                        {isCompleted ? (
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                                <polyline points="20 6 9 17 4 12"/>
                                            </svg>
                                        ) : isCurrent ? (
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                                                <polygon points="5 3 19 12 5 21 5 3"/>
                                            </svg>
                                        ) : (
                                            <Image src="/lock-small.svg" alt="qulflangan" width={12} height={12}/>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className={`text-[12px] font-medium ${isCurrent ? "text-[#2470FF]" : "text-[#FCFCFC]"}`}>
                                            {i + 1}-dars
                                        </p>
                                        <p className="text-[11px] text-[#6F767E] truncate">{l.title}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <YoshlarAgencyPoster/>
                </div>
            </div>

            <Footer/>

            {/* Tabriklaymiz (sertifikat) modal */}
            {showCertModal && (
                <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
                    <div className="bg-[#1A1D1F] rounded-[16px] p-[32px] w-[420px] flex flex-col items-center gap-[16px]">
                        <div className="w-[80px] h-[80px] bg-green-500 rounded-full flex items-center justify-center text-[40px]">
                            🏁
                        </div>
                        <h2 className="text-[22px] font-bold text-[#FCFCFC] text-center">Tabriklaymiz!</h2>
                        <p className="text-[14px] text-[#9DA1A3] text-center">
                            Siz ushbu kursdagi barcha darslik videolarni muvaffaqiyatli ko&apos;rib bo&apos;ldingiz. Endi esa sizga taqdim etilgan sertifikatingizni yuklab olishingiz mumkin
                        </p>
                        <button
                            onClick={() => router.push(`/course/${params.id}/certificate`)}
                            className="flex items-center gap-2 px-[24px] h-[48px] bg-[#2470FF] rounded-[8px] text-[15px] text-white cursor-pointer hover:bg-[#1a5fe0] w-full justify-center"
                        >
                            <Image src="/certificate.svg" alt="sertifikat" width={20} height={20}/>
                            Sertifikatni yuklab olish
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}