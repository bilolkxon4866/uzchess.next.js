"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { api, getTokenData } from "@/app/lib/api";

interface UserType {
    id: number;
    fullName: string;
    profileImage: string;
}

const menuItems = [
    { label: "Sotib olingan kurslar", path: "/profile/courses", icon: "/profile-courses.svg" },
    { label: "Buyurtmalar", path: "/profile/orders", icon: "/profile-orders.svg" },
    { label: "Saqlanganlar", path: "/profile/saved", icon: "/profile-saved.svg" },
    { label: "Umumiy sozlamalar", path: "/profile/settings", icon: "/profile-settings.svg" },
];

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/");
            return;
        }

        async function getUser() {
            try {
                const tokenData = getTokenData();
                if (!tokenData) return;
                const response = await api.get(`/admin/users/${tokenData.id}`);
                setUser(response.data);
            } catch {
                router.push("/");
            }
        }
        getUser();
    }, []);

    return (
        <div className="min-h-screen bg-[#111315]">
            <div className="max-w-[1400px] mx-auto px-[40px] py-[24px]">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-[24px]">
                    <button onClick={() => router.push("/")}>
                        <Image src="/home.svg" alt="asosiy" width={16} height={16} />
                    </button>
                    <span className="text-[#6F767E] text-[14px]">›</span>
                    <span className="text-[#6F767E] text-[14px] cursor-pointer hover:text-white"
                          onClick={() => router.push("/profile/courses")}>
                        Profil
                    </span>
                    <span className="text-[#6F767E] text-[14px]">›</span>
                    <span className="text-[#FCFCFC] text-[14px]">
                        {menuItems.find(m => m.path === pathname)?.label || ""}
                    </span>
                </div>

                <div className="flex gap-[24px]">

                    {/* Chap panel */}
                    <div className="w-[280px] shrink-0 flex flex-col gap-[16px]">

                        {/* Profil kartochkasi */}
                        <div className="bg-[#1A1D1F] rounded-[12px] p-[24px] flex items-center gap-[16px]">
                            <div className="relative w-[64px] h-[64px] rounded-full overflow-hidden shrink-0 border-2 border-[#2470FF]">
                                <Image
                                    src={user?.profileImage
                                        ? `http://localhost:8888/${user.profileImage}`
                                        : "/default-avatar.svg"}
                                    alt="profil"
                                    fill
                                    sizes="64px"
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="text-[16px] font-bold text-[#FCFCFC] leading-[22px]">
                                    {user?.fullName || "..."}
                                </h2>
                            </div>
                        </div>

                        {/* Menyu */}
                        <div className="bg-[#1A1D1F] rounded-[12px] p-[8px] flex flex-col gap-[4px]">
                            {menuItems.map((item) => {
                                const isActive = pathname === item.path;
                                return (
                                    <button
                                        key={item.path}
                                        onClick={() => router.push(item.path)}
                                        className={`w-full flex items-center gap-[12px] px-[16px] h-[48px] rounded-[8px] text-[14px] font-medium cursor-pointer transition-colors text-left ${
                                            isActive
                                                ? "bg-transparent border border-[#2470FF] text-[#FCFCFC]"
                                                : "text-[#6F767E] hover:text-[#FCFCFC] hover:bg-[#272B30]"
                                        }`}
                                    >
                                        <Image src={item.icon} alt={item.label} width={20} height={20} />
                                        {item.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* O'ng qism — sahifa content */}
                    <div className="flex-1">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}