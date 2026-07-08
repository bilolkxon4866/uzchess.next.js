"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { api, getTokenData } from "@/app/lib/api";

interface UserType {
    id: number;
    fullName: string;
    login: string;
    loginType: string;
    birthDate: string;
    profileImage: string;
}

export default function SettingsPage() {
    const router = useRouter();
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        async function getUser() {
            try {
                const tokenData = getTokenData();
                if (!tokenData) return;
                const response = await api.get(`/admin/users/${tokenData.id}`);
                setUser(response.data);
            } catch (error) {
                console.error("Foydalanuvchini yuklashda xatolik:", error);
            }
        }
        getUser();
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        router.push("/");
    }

    const isPhone = user?.loginType === "phone";

    return (
        <div className="flex flex-col gap-[16px]">

            {/* Foydalanuvchi ma'lumotlari */}
            <div className="bg-[#1A1D1F] rounded-[12px] p-[24px]">
                <div className="flex items-center justify-between mb-[20px]">
                    <h2 className="text-[18px] font-bold text-[#FCFCFC]">
                        Foydalanovchi ma&apos;lumotlari
                    </h2>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-[16px] h-[36px] bg-red-500/20 text-red-400 rounded-[8px] text-[14px] font-medium cursor-pointer hover:bg-red-500/30 transition-colors"
                    >
                        <Image src="/logout.svg" alt="chiqish" width={16} height={16} />
                        Chiqish
                    </button>
                </div>

                {user ? (
                    <div className="grid grid-cols-3 gap-[24px]">
                        {isPhone ? (
                            <>
                                <div>
                                    <p className="text-[12px] text-[#6F767E] mb-[4px]">Ism-sharifingiz</p>
                                    <p className="text-[15px] text-[#FCFCFC]">{user.fullName}</p>
                                </div>
                                <div>
                                    <p className="text-[12px] text-[#6F767E] mb-[4px]">Tug&apos;ilgan sana</p>
                                    <p className="text-[15px] text-[#FCFCFC]">{user.birthDate || "—"}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <p className="text-[12px] text-[#6F767E] mb-[4px]">Ism</p>
                                    <p className="text-[15px] text-[#FCFCFC]">
                                        {user.fullName?.split(" ")[0] || "—"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[12px] text-[#6F767E] mb-[4px]">Familiya</p>
                                    <p className="text-[15px] text-[#FCFCFC]">
                                        {user.fullName?.split(" ")[1] || "—"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[12px] text-[#6F767E] mb-[4px]">Tug&apos;ilgan sana</p>
                                    <p className="text-[15px] text-[#FCFCFC]">{user.birthDate || "—"}</p>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <p className="text-[#6F767E]">Yuklanmoqda...</p>
                )}
            </div>

            {/* Xavfsizlik */}
            <div className="bg-[#1A1D1F] rounded-[12px] p-[24px]">
                <h2 className="text-[18px] font-bold text-[#FCFCFC] mb-[16px]">Xavfsizlik</h2>
                <div className="grid grid-cols-2 gap-[12px]">
                    {/* Parolni yangilash */}
                    <button className="flex items-center justify-between p-[16px] bg-[#272B30] rounded-[10px] cursor-pointer hover:bg-[#2E3338] transition-colors">
                        <div className="flex items-center gap-[12px]">
                            <div className="w-[36px] h-[36px] bg-[#2470FF] rounded-[8px] flex items-center justify-center">
                                {/* Bu yerga qulf ikonkasi qo'yasiz */}
                                <Image src="/lock-small.svg" alt="parol" width={18} height={18} />
                            </div>
                            <div className="text-left">
                                <p className="text-[14px] font-medium text-[#FCFCFC]">Parolni yangilash</p>
                                <p className="text-[12px] text-[#6F767E]">Esda qoluvchi va murakkab parol qo&apos;ying</p>
                            </div>
                        </div>
                        <Image src="/chevron-right.svg" alt="o'tish" width={16} height={16} />
                    </button>

                    {/* Telefon yoki email yangilash */}
                    <button className="flex items-center justify-between p-[16px] bg-[#272B30] rounded-[10px] cursor-pointer hover:bg-[#2E3338] transition-colors">
                        <div className="flex items-center gap-[12px]">
                            <div className="w-[36px] h-[36px] bg-[#2470FF] rounded-[8px] flex items-center justify-center">
                                {/* Bu yerga telefon yoki email ikonkasi qo'yasiz */}
                                <Image
                                    src={isPhone ? "/phone-small.svg" : "/email-small.svg"}
                                    alt="login"
                                    width={18}
                                    height={18}
                                />
                            </div>
                            <div className="text-left">
                                <p className="text-[14px] font-medium text-[#FCFCFC]">
                                    {isPhone ? "Telefon raqamni yangilash" : "Elektron pochtani yangilash"}
                                </p>
                                <p className="text-[12px] text-[#6F767E]">
                                    {isPhone ? "Telefon raqamingizni yangilang" : "Elektron pochtangizni yangilang"}
                                </p>
                            </div>
                        </div>
                        <Image src="/chevron-right.svg" alt="o'tish" width={16} height={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}