"use client";

interface Notification {
    id: number;
    bgColor: string;
    emoji: string;
    title: string;
    description: string;
}

const notifications: Notification[] = [
    {
        id: 1,
        bgColor: "#1C3A5E",
        emoji: "😊",
        title: "Endilikda uzchess platformasidan kitoblar buyurtma qilishingiz mumkin",
        description: "",
    },
    {
        id: 2,
        bgColor: "#1A3A2A",
        emoji: "🛡️",
        title: "14-yanvar muborak bo'lsin",
        description: "Qadirli vatan himoyachilari sizlarni 14-yanvar vatan himoyachilari kuni bilan chin qalbimizsdan muborakbod etamiz!",
    },
    {
        id: 3,
        bgColor: "#2A1A3A",
        emoji: "🎉",
        title: "Yangi yilingiz muborak bo'lsin!",
        description: "",
    },
];

interface NotificationModalProps {
    onClose: () => void;
}

export default function NotificationModal({ onClose }: NotificationModalProps) {
    return (
        <div
            className="fixed inset-0 z-50"
            onClick={onClose}
        >
            <div
                className="absolute right-[40px] top-[80px] w-[380px] bg-[#1A1D1F] rounded-[12px] overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#272B30]">
                    <h2 className="text-[18px] font-bold text-[#FCFCFC]">Xabaranoma</h2>
                    <button
                        onClick={onClose}
                        className="cursor-pointer text-[#9DA1A3] hover:text-white transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                {/* Xabarlar */}
                <div className="flex flex-col gap-[12px] p-[16px] max-h-[500px] overflow-y-auto">
                    {notifications.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-[12px] overflow-hidden"
                            style={{ backgroundColor: item.bgColor }}
                        >
                            {/* Rasm o'rniga rang + emoji */}
                            <div
                                className="w-full h-[120px] flex items-center justify-center text-[48px]"
                                style={{ backgroundColor: item.bgColor }}
                            >
                                {item.emoji}
                            </div>

                            {/* Matn */}
                            <div className="p-[16px] bg-[#111315]">
                                <h3 className="text-[14px] font-bold text-[#FCFCFC] leading-[20px] mb-[6px]">
                                    {item.title}
                                </h3>
                                {item.description && (
                                    <p className="text-[12px] text-[#9DA1A3] leading-[17px] mb-[8px]">
                                        {item.description}
                                    </p>
                                )}
                                <button className="text-[12px] text-[#2470FF] cursor-pointer hover:underline">
                                    Batafsil
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}