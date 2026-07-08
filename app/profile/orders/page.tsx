"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "@/app/lib/api";

interface OrderType {
    id: number;
    coursesId: {
        title: string;
        image: string;
        price: number;
    };
    isCompleted: boolean;
    date: string;
}

const statusConfig = {
    delivered: { label: "Yetkazib berildi", color: "#12B76A", icon: "✓" },
    pending: { label: "Buyurtma ko'rib chiqilmoqda", color: "#F79009", icon: "⏳" },
    cancelled: { label: "Bekor qilingan", color: "#F04438", icon: "✕" },
};

export default function OrdersPage() {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getOrders() {
            try {
                const response = await api.get("/public/purchasedCourse");
                const result = response.data?.data || response.data;
                if (Array.isArray(result)) setOrders(result);
            } catch (error) {
                console.error("Buyurtmalarni yuklashda xatolik:", error);
            } finally {
                setLoading(false);
            }
        }
        getOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[400px]">
                <p className="text-[#6F767E] text-[16px]">Yuklanmoqda...</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-[16px]">
            {orders.length === 0 ? (
                <div className="col-span-2 flex flex-col items-center justify-center h-[400px] gap-4">
                    <Image src="/NotFound.svg" alt="bo'sh" width={488} height={263} />
                    <p className="text-[16px] text-[#6F767E]">Buyurtmalar yo&apos;q</p>
                </div>
            ) : (
                orders.map((order) => {
                    const status = order.isCompleted ? "delivered" : "pending";
                    const statusInfo = statusConfig[status];
                    return (
                        <div key={order.id} className="bg-[#1A1D1F] rounded-[12px] p-[16px]">
                            {/* Rasm */}
                            <div className="relative w-full h-[120px] rounded-[8px] overflow-hidden mb-[12px]">
                                <Image
                                    src={`http://localhost:8888/${order.coursesId.image}`}
                                    alt={order.coursesId.title}
                                    fill
                                    sizes="300px"
                                    className="object-cover"
                                />
                            </div>

                            {/* Buyurtma raqami */}
                            <p className="text-[15px] font-bold text-[#FCFCFC] mb-[8px]">
                                № {order.id}
                            </p>

                            {/* Status */}
                            <p style={{ color: statusInfo.color }} className="text-[13px] font-medium mb-[8px]">
                                {statusInfo.icon} {statusInfo.label}
                            </p>

                            {/* Narx */}
                            <div className="flex items-center gap-2 text-[13px] text-[#9DA1A3]">
                                <Image src="/coin.svg" alt="narx" width={16} height={16} />
                                <span>{order.coursesId.price?.toLocaleString()} UZS</span>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}