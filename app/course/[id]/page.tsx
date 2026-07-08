"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import HeaderItem from "@/app/command/Header/Header";
import Section from "@/app/command/Section";
import Footer from "@/app/command/Footer/Footer";
import YoshlarAgencyPoster from "@/app/command/YoshlarAgency";
import { api, getTokenData } from "@/app/lib/api";
import PurchaseModal from "../components/purchaseModal";

interface CourseType {
    id: number;
    title: string;
    image: string;
    price: number;
    newPrice: number;
    rating: number;
    reviewsCount: number;
    sectionCount: number;
    lessonsCount: number;
    difficultyId: { title: string };
    authorId: { fullName: string };
}

interface SectionType {
    id: number;
    title: string;
    lessons: LessonType[];
}

interface LessonType {
    id: number;
    title: string;
    video: string;
    thumbnail: string;
    content: string;
    isFree: boolean;
    order: number;
    courseSectionId: number;
}

interface ReviewType {
    id: number;
    userId: number;
    rating: number;
    comment: string;
    date: string;
}

export default function CourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [course, setCourse] = useState<CourseType | null>(null);
    const [sections, setSections] = useState<SectionType[]>([]);
    const [reviews, setReviews] = useState<ReviewType[]>([]);
    const [openSection, setOpenSection] = useState<number | null>(0);
    const [isPurchased, setIsPurchased] = useState(false);
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [reviewText, setReviewText] = useState("");
    const [reviewRating, setReviewRating] = useState(0);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                // Kurs ma'lumotlari
                const courseRes = await axios.get(`http://localhost:8888/public/courses/${params.id}`);
                setCourse(courseRes.data);

                // Bo'limlar
                const sectionRes = await axios.get("http://localhost:8888/public/courseSection");
                const allSections = sectionRes.data?.data || sectionRes.data || [];

                // Darslar
                const lessonRes = await axios.get("http://localhost:8888/public/courseLesson");
                const allLessons = lessonRes.data?.data || lessonRes.data || [];

                // Bo'limlarga darslarni bog'lash
                const sectionsWithLessons = allSections
                    .filter((s: any) => s.courseId === Number(params.id))
                    .map((s: any) => ({
                        ...s,
                        lessons: allLessons
                            .filter((l: any) => l.courseSectionId === s.id)
                            .sort((a: any, b: any) => a.order - b.order)
                    }));
                setSections(sectionsWithLessons);

                // Izohlar
                const reviewRes = await axios.get("http://localhost:8888/public/courseReviews");
                const allReviews = reviewRes.data?.data || reviewRes.data || [];
                setReviews(allReviews.filter((r: any) => r.courseId === Number(params.id)));

                // Sotib olinganligini tekshirish
                const token = localStorage.getItem("token");
                if (token) {
                    try {
                        const purchasedRes = await api.get("/public/purchasedCourse");
                        const purchased = purchasedRes.data?.data || purchasedRes.data || [];
                        const found = purchased.find((p: any) => p.coursesId?.id === Number(params.id));
                        setIsPurchased(!!found);
                    } catch {
                        setIsPurchased(false);
                    }
                }
            } catch (error) {
                console.error("Kursni yuklashda xatolik:", error);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [params.id]);

    function handleCopy() {
        navigator.clipboard.writeText(`https://uzchess.uz/course/${params.id}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-[#111315] text-white">
                <HeaderItem/>
                <div className="flex items-center justify-center flex-1">
                    <p className="text-[#6F767E]">Yuklanmoqda...</p>
                </div>
                <Footer/>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex flex-col min-h-screen bg-[#111315] text-white">
                <HeaderItem/>
                <div className="flex items-center justify-center flex-1">
                    <p className="text-[#6F767E]">Kurs topilmadi</p>
                </div>
                <Footer/>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#111315] text-white">
            <HeaderItem/>
            <Section/>

            {/* Kurs header — background rasm bilan */}
            <div className="relative w-full min-h-[200px] overflow-hidden">
                <Image
                    src={`http://localhost:8888/${course.image}`}
                    alt={course.title}
                    fill
                    sizes="100vw"
                    className="object-cover blur-sm opacity-30"
                />
                <div className="relative z-10 px-[40px] py-[32px]">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 mb-[16px]">
                        <button onClick={() => router.push("/")}>
                            <Image src="/home.svg" alt="asosiy" width={16} height={16}/>
                        </button>
                        <span className="text-[#6F767E] text-[14px]">›</span>
                        <button onClick={() => router.push("/course")} className="text-[#6F767E] text-[14px] hover:text-white">
                            Kurslar
                        </button>
                        <span className="text-[#6F767E] text-[14px]">›</span>
                        <span className="text-[#FCFCFC] text-[14px]">{course.title}</span>
                    </div>

                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-[28px] font-bold text-white mb-[8px]">{course.title}</h1>
                            <div className="flex items-center gap-[16px] text-[14px] text-[#9DA1A3]">
                                <span className="flex items-center gap-1">
                                    <Image src="/coin.svg" alt="narx" width={20} height={20}/>
                                    <span className="text-[18px] font-bold text-white">
                                        {course.newPrice
                                            ? course.newPrice?.toLocaleString()
                                            : course.price?.toLocaleString()} UZS
                                    </span>
                                    {course.newPrice && (
                                        <span className="text-[13px] text-[#6F767E] line-through ml-2">
                                            {course.price?.toLocaleString()}.00 uzs
                                        </span>
                                    )}
                                </span>
                            </div>
                            <div className="flex items-center gap-[16px] mt-[8px] text-[13px] text-[#9DA1A3]">
                                <span className="flex items-center gap-1">
                                    <Image src="/difficulty.svg" alt="daraja" width={14} height={14}/>
                                    {course.difficultyId?.title}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Image src="/lessons.svg" alt="bo'lim" width={14} height={14}/>
                                    {course.sectionCount} ta bo&apos;lim
                                </span>
                                <span className="flex items-center gap-1">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <polygon points="10 8 16 12 10 16 10 8"/>
                                    </svg>
                                    {course.lessonsCount} ta video
                                </span>
                            </div>
                        </div>

                        {/* O'ng — reyting + tugmalar */}
                        <div className="flex items-center gap-[12px]">
                            {/* Reyting yulduzlari */}
                            <div className="flex items-center gap-1">
                                {[1,2,3,4,5].map((n) => (
                                    <svg key={n} width="18" height="18" viewBox="0 0 24 24" fill={n <= Math.round(course.rating) ? "#E0B531" : "#272B30"}>
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                    </svg>
                                ))}
                                <span className="text-[14px] text-[#9DA1A3] ml-1">
                                    {course.rating} ({course.reviewsCount} ta izoh)
                                </span>
                            </div>

                            {isPurchased ? (
                                <>
                                    <div className="flex items-center gap-1 text-[#12B76A] text-[14px] font-medium">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#12B76A" strokeWidth="2">
                                            <polyline points="20 6 9 17 4 12"/>
                                        </svg>
                                        Sotib olingan
                                    </div>
                                    <button className="flex items-center gap-2 px-[16px] h-[40px] bg-[#272B30] rounded-[8px] text-[13px] text-white cursor-pointer hover:bg-[#2E3338]">
                                        <Image src="/certificate.svg" alt="sertifikat" width={16} height={16}/>
                                        Sertifikat
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setShowPurchaseModal(true)}
                                    className="px-[20px] h-[40px] bg-[#2470FF] rounded-[8px] text-[14px] font-medium text-white cursor-pointer hover:bg-[#1a5fe0] transition-colors"
                                >
                                    Kursni sotib olish
                                </button>
                            )}

                            <button
                                onClick={() => {}}
                                className="w-[40px] h-[40px] flex items-center justify-center bg-[#272B30] rounded-[8px] cursor-pointer hover:bg-[#2E3338]"
                            >
                                <Image src="/heart.svg" alt="saqlash" width={18} height={18}/>
                            </button>
                            <button
                                onClick={() => setShowShareModal(true)}
                                className="w-[40px] h-[40px] flex items-center justify-center bg-[#272B30] rounded-[8px] cursor-pointer hover:bg-[#2E3338]"
                            >
                                <Image src="/share.svg" alt="ulashish" width={18} height={18}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Asosiy content */}
            <div className="flex gap-[24px] px-[40px] py-[24px]">
                <div className="flex-1">

                    {/* Bo'limlar (accordion) */}
                    <div className="bg-[#1A1D1F] rounded-[12px] mb-[24px] overflow-hidden">
                        {sections.map((section, idx) => (
                            <div key={section.id} className="border-b border-[#272B30] last:border-0">
                                <button
                                    onClick={() => setOpenSection(openSection === idx ? null : idx)}
                                    className="w-full flex items-center justify-between px-[20px] h-[56px] cursor-pointer hover:bg-[#1F2226] transition-colors"
                                >
                                    <span className="text-[15px] font-medium text-[#FCFCFC]">
                                        {idx + 1}. {section.title}
                                    </span>
                                    <svg
                                        width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9DA1A3" strokeWidth="2"
                                        className={`transition-transform ${openSection === idx ? "rotate-180" : ""}`}
                                    >
                                        <polyline points="6 9 12 15 18 9"/>
                                    </svg>
                                </button>

                                {openSection === idx && (
                                    <div className="grid grid-cols-3 gap-[12px] px-[20px] pb-[20px]">
                                        {section.lessons.map((lesson) => (
                                            <div
                                                key={lesson.id}
                                                onClick={() => {
                                                    if (isPurchased || lesson.isFree) {
                                                        router.push(`/course/${params.id}/lesson/${lesson.id}`);
                                                    }
                                                }}
                                                className={`relative rounded-[8px] overflow-hidden cursor-pointer ${!isPurchased && !lesson.isFree ? "opacity-60" : "hover:opacity-80"}`}
                                            >
                                                <div className="relative w-full h-[100px]">
                                                    <Image
                                                        src={lesson.thumbnail ? `http://localhost:8888/${lesson.thumbnail}` : "/course-placeholder.svg"}
                                                        alt={lesson.title}
                                                        fill
                                                        sizes="200px"
                                                        className="object-cover"
                                                    />
                                                    {!isPurchased && !lesson.isFree && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                                            <Image src="/lock-small.svg" alt="qulflangan" width={24} height={24}/>
                                                        </div>
                                                    )}
                                                    <div className="absolute bottom-[6px] left-[6px] flex items-center gap-1 bg-black/70 rounded px-[4px] py-[2px]">
                                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                                                            <polygon points="5 3 19 12 5 21 5 3"/>
                                                        </svg>
                                                        <span className="text-[10px] text-white">07:20</span>
                                                    </div>
                                                </div>
                                                <p className="text-[12px] text-[#FCFCFC] px-[8px] py-[6px] bg-[#272B30]">
                                                    {idx + 1}.{lesson.order} {lesson.title}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Izohlar */}
                    <div className="bg-[#1A1D1F] rounded-[12px] p-[20px]">
                        <h2 className="text-[18px] font-bold text-[#FCFCFC] mb-[20px]">
                            Kurs haqida izohlar
                        </h2>
                        <div className="flex flex-col gap-[16px]">
                            {reviews.slice(0, 4).map((review) => (
                                <div key={review.id} className="flex gap-[12px]">
                                    <div className="w-[40px] h-[40px] rounded-full bg-[#272B30] flex items-center justify-center shrink-0">
                                        <Image src="/default-avatar.svg" alt="avatar" width={24} height={24}/>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-[4px]">
                                            <div>
                                                <span className="text-[14px] font-medium text-[#FCFCFC]">Foydalanuvchi</span>
                                                <span className="text-[12px] text-[#6F767E] ml-[8px]">{review.date?.slice(0, 10)}</span>
                                            </div>
                                            <button
                                                onClick={() => setShowReportModal(true)}
                                                className="text-[#6F767E] cursor-pointer"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                    <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-1 mb-[6px]">
                                            {[1,2,3,4,5].map((n) => (
                                                <svg key={n} width="12" height="12" viewBox="0 0 24 24" fill={n <= review.rating ? "#E0B531" : "#272B30"}>
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                                </svg>
                                            ))}
                                        </div>
                                        <p className="text-[13px] text-[#9DA1A3] leading-[20px]">{review.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {reviews.length > 4 && (
                            <div className="flex justify-center mt-[16px]">
                                <button className="px-[24px] h-[40px] bg-[#272B30] rounded-[8px] text-[14px] text-[#FCFCFC] cursor-pointer hover:bg-[#2E3338]">
                                    Barcha izohlar
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* O'ng */}
                <div className="w-[280px] shrink-0">
                    <YoshlarAgencyPoster/>
                </div>
            </div>

            <Footer/>

            {/* Purchase Modal */}
            {showPurchaseModal && (
                <PurchaseModal
                    course={course}
                    onClose={() => setShowPurchaseModal(false)}
                    onSuccess={() => { setShowPurchaseModal(false); setIsPurchased(true); }}
                />
            )}

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={() => setShowShareModal(false)}>
                    <div className="bg-[#1A1D1F] rounded-[16px] p-[24px] w-[400px]" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-[20px]">
                            <h2 className="text-[18px] font-bold text-[#FCFCFC]">Ulashish</h2>
                            <button onClick={() => setShowShareModal(false)} className="cursor-pointer text-[#6F767E] hover:text-white">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center gap-[16px] mb-[20px]">
                            {["/instagram.svg", "/telegram.svg", "/twitter.svg", "/facebook.svg"].map((icon) => (
                                <button key={icon} className="w-[48px] h-[48px] bg-[#272B30] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#2E3338]">
                                    <Image src={icon} alt="ijtimoiy tarmoq" width={24} height={24}/>
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-[8px] bg-[#272B30] rounded-[8px] px-[12px] h-[44px]">
                            <span className="flex-1 text-[13px] text-[#9DA1A3] truncate">
                                https://uzchess.uz/course/{params.id}
                            </span>
                            <button onClick={handleCopy} className="cursor-pointer text-[#2470FF] text-[13px]">
                                {copied ? "Nusxalandi!" : "Nusxalash"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Report Modal */}
            {showReportModal && (
                <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={() => setShowReportModal(false)}>
                    <div className="bg-[#1A1D1F] rounded-[16px] p-[24px] w-[400px]" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-[20px]">
                            <h2 className="text-[18px] font-bold text-[#FCFCFC]">Shikoyat qilish</h2>
                            <button onClick={() => setShowReportModal(false)} className="cursor-pointer text-[#6F767E] hover:text-white">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        {[
                            "Yolg'on va aldash",
                            "Zo'ravonlik va dahshatli tarkib",
                            "O'z joniga qasd qilish, o'z joniga qasd qilish va xavfli harakatlar",
                            "Boshqa"
                        ].map((item) => (
                            <button
                                key={item}
                                className="w-full flex items-center justify-between px-[16px] h-[52px] border-b border-[#272B30] text-[14px] text-[#FCFCFC] cursor-pointer hover:bg-[#272B30] text-left"
                                onClick={() => setShowReportModal(false)}
                            >
                                {item}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 6l6 6-6 6"/>
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}