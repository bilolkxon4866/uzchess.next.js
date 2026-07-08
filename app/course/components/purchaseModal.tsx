"use client";

import { useState } from "react";
import Image from "next/image";

interface CourseType {
    id: number;
    title: string;
    price: number;
    newPrice: number;
}

interface Props {
    course: CourseType;
    onClose: () => void;
    onSuccess: () => void;
}

type ModalStep = "select" | "processing" | "success" | "error";

const paymentMethods = [
    { id: "paylov", label: "Paylov", logo: "/paylov.svg" },
    { id: "payme", label: "Payme", logo: "/payme.svg" },
    { id: "click", label: "Click", logo: "/click.svg" },
    { id: "uzumbank", label: "Uzum bank", logo: "/uzumbank.svg" },
];

export default function PurchaseModal({ course, onClose, onSuccess }: Props) {
    const [step, setStep] = useState<ModalStep>("select");
    const [selectedPayment, setSelectedPayment] = useState("paylov");

    async function handlePay() {
        setStep("processing");
        await new Promise((r) => setTimeout(r, 2000));
        // Hozircha simulatsiya — real to'lov integratsiyasi keyinroq
        const success = Math.random() > 0.3;
        setStep(success ? "success" : "error");
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={onClose}>
            <div className="bg-[#1A1D1F] rounded-[16px] w-[480px] p-[32px]" onClick={(e) => e.stopPropagation()}>

                {/* Yopish */}
                <div className="flex justify-end mb-[16px]">
                    <button onClick={onClose} className="cursor-pointer text-[#6F767E] hover:text-white">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                {/* To'lov usulini tanlash */}
                {step === "select" && (
                    <>
                        <div className="flex flex-col items-center mb-[24px]">
                            <div className="w-[64px] h-[64px] bg-[#272B30] rounded-full flex items-center justify-center mb-[12px]">
                                <Image src="/coin.svg" alt="to'lov" width={32} height={32}/>
                            </div>
                            <p className="text-[13px] text-[#9DA1A3] mb-[4px]">Xarid qilinayotgan kurs:</p>
                            <h3 className="text-[16px] font-bold text-[#FCFCFC] text-center mb-[8px]">{course.title}</h3>
                            <div className="flex items-center gap-2">
                                <Image src="/coin.svg" alt="narx" width={20} height={20}/>
                                <span className="text-[18px] font-bold text-[#FCFCFC]">
                                    {(course.newPrice || course.price)?.toLocaleString()} UZS
                                </span>
                            </div>
                        </div>

                        <p className="text-[14px] text-[#9DA1A3] mb-[12px]">To&apos;lov usulini tanlang</p>
                        <div className="grid grid-cols-2 gap-[12px] mb-[24px]">
                            {paymentMethods.map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => setSelectedPayment(method.id)}
                                    className={`flex items-center justify-between px-[16px] h-[52px] rounded-[8px] border cursor-pointer transition-colors ${
                                        selectedPayment === method.id
                                            ? "border-[#2470FF] bg-[#2470FF]/10"
                                            : "border-[#272B30] bg-[#272B30] hover:border-[#3A3F45]"
                                    }`}
                                >
                                    <Image src={method.logo} alt={method.label} width={60} height={24}/>
                                    <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center ${
                                        selectedPayment === method.id ? "border-[#2470FF]" : "border-[#6F767E]"
                                    }`}>
                                        {selectedPayment === method.id && (
                                            <div className="w-[10px] h-[10px] rounded-full bg-[#2470FF]"/>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-[12px]">
                            <button
                                onClick={onClose}
                                className="flex-1 h-[48px] bg-[#272B30] rounded-[8px] text-[15px] text-[#FCFCFC] cursor-pointer hover:bg-[#2E3338]"
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={handlePay}
                                className="flex-1 h-[48px] bg-[#2470FF] rounded-[8px] text-[15px] font-medium text-white cursor-pointer hover:bg-[#1a5fe0]"
                            >
                                Davom etish
                            </button>
                        </div>
                    </>
                )}

                {/* Jarayonda */}
                {step === "processing" && (
                    <div className="flex flex-col items-center py-[32px] gap-[16px]">
                        <div className="w-[64px] h-[64px] bg-[#E0B531]/20 rounded-full flex items-center justify-center">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E0B531" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                            </svg>
                        </div>
                        <h3 className="text-[20px] font-bold text-[#FCFCFC]">Jarayonda...</h3>
                        <p className="text-[14px] text-[#9DA1A3]">To&apos;lov amalga oshish jarayonida</p>
                        <button
                            onClick={onClose}
                            className="px-[32px] h-[48px] bg-[#2470FF] rounded-[8px] text-[15px] text-white cursor-pointer hover:bg-[#1a5fe0]"
                        >
                            Tushunarli
                        </button>
                    </div>
                )}

                {/* Muvaffaqiyatli */}
                {step === "success" && (
                    <div className="flex flex-col items-center py-[32px] gap-[16px]">
                        <div className="w-[64px] h-[64px] bg-[#12B76A]/20 rounded-full flex items-center justify-center">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#12B76A" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        </div>
                        <h3 className="text-[20px] font-bold text-[#FCFCFC] text-center">
                            Kurs muvaffaqiyatli sotib olindi
                        </h3>
                        <p className="text-[14px] text-[#9DA1A3] text-center">
                            Tabriklaymiz siz kursni muvaffaqiyatli sotib oldingiz!
                        </p>
                        <button
                            onClick={onSuccess}
                            className="px-[32px] h-[48px] bg-[#2470FF] rounded-[8px] text-[15px] text-white cursor-pointer hover:bg-[#1a5fe0] w-full"
                        >
                            Kursni ko&apos;rish
                        </button>
                    </div>
                )}

                {/* Xatolik */}
                {step === "error" && (
                    <div className="flex flex-col items-center py-[32px] gap-[16px]">
                        <div className="w-[64px] h-[64px] bg-red-500/20 rounded-full flex items-center justify-center">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F04438" strokeWidth="3">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        </div>
                        <h3 className="text-[20px] font-bold text-[#FCFCFC]">Xatolik yuz berdi</h3>
                        <p className="text-[14px] text-[#9DA1A3] text-center">
                            Kursni sotib olish jarayonida xatolik yuz berdi. Iltimos qayta urunib ko&apos;ring
                        </p>
                        <button
                            onClick={() => setStep("select")}
                            className="px-[32px] h-[48px] bg-[#2470FF] rounded-[8px] text-[15px] text-white cursor-pointer hover:bg-[#1a5fe0] w-full"
                        >
                            Qayta urunib ko&apos;rish
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}