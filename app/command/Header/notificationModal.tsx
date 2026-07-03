"use client";
import Image from "next/image";

interface Notification {
    id: number;
    image: string;
    title: string;
    description: string;
    expanded: boolean;
}

//backedda endpoint yoqligi uchun qo'lda qoshilgan
const notifications: Notification[] = [
    {
        id: 1,
        image: "/notification1.png",
        title: "Endilikda uzchess platformasidan kitoblar buyurtma qilishingiz mumkin 😊",
        description: "",
        expanded: true,
    },
    {
        id: 2,
        image: "/notification2.png",
        title: "14-yanvar muborak bo'lsin",
        description: "Qadirli vatan himoyachilari sizlarni 14-yanvar vatan himoyachilari kuni bilan chin qalbimizsdan muborakbod etamiz!",
        expanded: false,
    },
    {
        id: 3,
        image: "/notification3.png",
        title: "Yangi yilingiz muborak bo'lsin!",
        description: "",
        expanded: false,
    },
];

interface NotificationModalProps {
    onClose: () => void;
}

export default function NotificationModal({ onClose }: NotificationModalProps) {
    return (
        <div
            className="fixed inset-0 z-50 bg-black/60"
            onClick={onClose}
        >
            <div
                className="absolute right-[40px] top-[70px] w-[380px] bg-[#1A1D1F] rounded-[12px] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#272B30]">
                    <h2 className="text-[18px] font-bold text-[#FCFCFC]">Xabaranoma</h2>
                    <button onClick={onClose} className="cursor-pointer">
                        <Image src="/close.svg" alt="yopish" width={20} height={20} />
                    </button>
                </div>

                <div className="flex flex-col gap-[12px] p-[16px] max-h-[500px] overflow-y-auto">
                    {notifications.map((item) => (
                        <div
                            key={item.id}
                            className="bg-[#111315] rounded-[12px] overflow-hidden"
                        >
                            <div className="relative w-full h-[160px]">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                    sizes="380px"
                                />
                            </div>

                            <div className="p-[16px]">
                                <h3 className="text-[15px] font-bold text-[#FCFCFC] leading-[20px] mb-[8px]">
                                    {item.title}
                                </h3>
                                {item.description && (
                                    <p className="text-[13px] text-[#9DA1A3] leading-[18px] mb-[8px]">
                                        {item.description}
                                    </p>
                                )}
                                <button className="flex items-center gap-1 text-[13px] text-[#2470FF] cursor-pointer hover:underline">
                                    {item.expanded ? "Yopish" : "Batafsil"}
                                    <Image
                                        src={item.expanded ? "/icon2.svg" : "/chevron.svg"}
                                        alt="arrow"
                                        width={14}
                                        height={14}
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}