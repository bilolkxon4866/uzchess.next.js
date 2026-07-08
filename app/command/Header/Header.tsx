"use client"
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import SearchModal from "@/app/command/Header/searchModal";
import NotificationModal from "@/app/command/Header/notificationModal";
import AuthModal from "@/app/command/Auth/authModal";
import { getTokenData, api } from "@/app/lib/api";

const menuItems = [
    { label: "Asosiy", path: "/" },
    { label: "Yangiliklar", path: "/news" },
    { label: "Kurslar", path: "/course" },
    { label: "Kutubxona", path: "/library" },
    { label: "Bog'lanish", path: "/contact" },
];

function NavItem({ label, path, index, activeIndex }: {
    label: string;
    path: string;
    index: number;
    activeIndex: number;
}) {
    const router = useRouter();
    const isActive = activeIndex === index;

    return (
        <li
            onClick={() => router.push(path)}
            className="relative cursor-pointer py-2 group"
        >
            <span className={`font-poppins text-sm transition-all duration-300 ${
                isActive ? "text-white" : "text-gray-400 hover:text-white"
            }`}>
                {label}
            </span>
            {isActive && <div className="left-0 w-full h-[2px] bg-[#00A3FF]"></div>}
        </li>
    );
}

export default function HeaderItem() {
    const pathname = usePathname();
    const router = useRouter();
    const activeIndex = menuItems.findIndex(item => item.path === pathname);

    const [searchOpen, setSearchOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsLoggedIn(false);
            return;
        }
        setIsLoggedIn(true);

        async function getUser() {
            try {
                const tokenData = getTokenData();
                if (!tokenData) return;
                const response = await api.get(`/admin/users/${tokenData.id}`);
                setUserName(response.data.fullName || "");
                setUserImage(response.data.profileImage || "");
            } catch {
                // token noto'g'ri bo'lsa
                setIsLoggedIn(false);
            }
        }
        getUser();
    }, [authOpen]); // authOpen o'zgarganda qayta tekshiradi (login bo'lgandan keyin)

    return (
        <>
            <header className="w-[1460px] h-[76px] border-[#232627] border-[1px] bg-[#1A1D1F] rounded-2xl flex items-center justify-between ml-[34px] mt-[20px]">
                <div className="flex items-center my-[26px] ml-[24px]">
                    <Image src='/icon.svg' alt="shaxmat icon" className="w-[103.61px] h-[28px] mb-[4px]" width={104} height={28}/>
                    <div className="h-[24px] w-px bg-gray-500"></div>
                    <div className="flex w-[112px] h-[24px] gap-14">
                        <span className="text-white text-sm font-medium size-4 font-poppins mb-1 ml-4">O&apos;zbekcha</span>
                        <Image src="/icon2.svg" alt="select icon" width={16} height={16}/>
                    </div>
                </div>

                <ul className="flex items-center gap-10">
                    {menuItems.map((item, index) => (
                        <NavItem
                            key={index}
                            label={item.label}
                            path={item.path}
                            index={index}
                            activeIndex={activeIndex}
                        />
                    ))}
                </ul>

                <div className="w-[320px] h-[40px] flex items-center gap-6">
                    <div className="w-[120px] h-[24px] flex gap-6">
                        <Image
                            src="/search.svg"
                            alt="qidiruv"
                            className="w-[24px] h-[24px] cursor-pointer"
                            width={24}
                            height={24}
                            onClick={() => setSearchOpen(true)}
                        />
                        <Image
                            src="/savat.svg"
                            alt="savatcha"
                            className="w-[24px] h-[24px] cursor-pointer"
                            width={24}
                            height={24}
                        />
                        <Image
                            src="/notification.svg"
                            alt="xabaranoma"
                            className="w-[24px] h-[24px] cursor-pointer"
                            width={24}
                            height={24}
                            onClick={() => setNotifOpen(true)}
                        />
                    </div>
                    <div className="h-[24px] w-px bg-gray-500"></div>

                    {isLoggedIn ? (
                        // Login bo'lgan — ism + avatar ko'rsatamiz
                        <button
                            onClick={() => router.push("/profile/courses")}
                            className="flex items-center gap-[8px] cursor-pointer hover:opacity-80 transition-opacity mr-5"
                        >
                            <span className="text-white text-[14px] font-medium">
                                {userName}
                            </span>
                            <div className="relative w-[36px] h-[36px] rounded-full overflow-hidden border-2 border-[#2470FF]">
                                <Image
                                    src={userImage
                                        ? `http://localhost:8888/${userImage}`
                                        : "/default-avatar.svg"}
                                    alt="profil"
                                    fill
                                    sizes="36px"
                                    className="object-cover"
                                />
                            </div>
                        </button>
                    ) : (
                        // Login bo'lmagan — Kirish tugmasi
                        <button
                            onClick={() => setAuthOpen(true)}
                            className="text-white flex justify-center items-center bg-[#1C92E0] w-33 h-10 gap-[10px] rounded-[8px] mr-5 cursor-pointer hover:bg-gray-600 transition-colors"
                        >
                            Kirish
                            <Image src="/log-in.svg" alt="icon" className="w-5 h-5" width={20} height={20}/>
                        </button>
                    )}
                </div>
            </header>

            {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
            {notifOpen && <NotificationModal onClose={() => setNotifOpen(false)} />}
            {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
        </>
    );
}