"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { AuthData } from "./authModal";

interface SetPasswordFormProps {
    authData: AuthData;
    onSuccess: () => void;
    onBack: () => void;
}

export default function SetPasswordForm({ authData, onSuccess, onBack }: SetPasswordFormProps) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        if (!password.trim() || !confirmPassword.trim()) {
            setError("Barcha maydonlarni to'ldiring");
            return;
        }
        if (password !== confirmPassword) {
            setError("Parollar mos kelmaydi");
            return;
        }
        if (password.length < 6) {
            setError("Parol kamida 6 ta belgidan iborat bo'lishi kerak");
            return;
        }
        setError("");
        setLoading(true);
        try {
            await axios.post("http://localhost:8888/auth/set-password", {
                login: authData.login,
                code: authData.code,
                password,
            });
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.message || "Xatolik yuz berdi");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-[16px]">
            {/* Orqaga */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-[#9DA1A3] cursor-pointer hover:text-white transition-colors w-fit"
            >
                <Image src="/chevron-left.svg" alt="orqaga" width={16} height={16} />
                <span className="text-[14px]">Parol qo&apos;yish</span>
            </button>

            {/* Parol */}
            <div className="flex flex-col gap-[8px]">
                <label className="text-[14px] text-[#9DA1A3]">Parol</label>
                <div className="flex items-center border border-[#272B30] rounded-[8px] overflow-hidden focus-within:border-[#2470FF] transition-colors">
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        placeholder="Parolni kiriting"
                        className="flex-1 h-[44px] px-[16px] bg-transparent text-[14px] text-[#FCFCFC] placeholder:text-[#6F767E] outline-none"
                    />
                    <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="px-[12px] cursor-pointer"
                    >
                        <Image
                            src={showPassword ? "/eye-off.svg" : "/eye.svg"}
                            alt="ko'rsatish"
                            width={20}
                            height={20}
                        />
                    </button>
                </div>
            </div>

            {/* Parolni takrorlash */}
            <div className="flex flex-col gap-[8px]">
                <label className="text-[14px] text-[#9DA1A3]">Parol</label>
                <div className="flex items-center border border-[#272B30] rounded-[8px] overflow-hidden focus-within:border-[#2470FF] transition-colors">
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type={showConfirm ? "text" : "password"}
                        placeholder="Parolni takrorlang"
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                        className="flex-1 h-[44px] px-[16px] bg-transparent text-[14px] text-[#FCFCFC] placeholder:text-[#6F767E] outline-none"
                    />
                    <button
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="px-[12px] cursor-pointer"
                    >
                        <Image
                            src={showConfirm ? "/eye-off.svg" : "/eye.svg"}
                            alt="ko'rsatish"
                            width={20}
                            height={20}
                        />
                    </button>
                </div>
            </div>

            {/* Xato */}
            {error && (
                <p className="text-[13px] text-red-400">{error}</p>
            )}

            {/* Tasdiqlash */}
            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full h-[48px] bg-[#2470FF] rounded-[8px] text-[16px] font-medium text-white cursor-pointer hover:bg-[#1a5fe0] transition-colors disabled:opacity-60"
            >
                {loading ? "Yuklanmoqda..." : "Tasdiqlash"}
            </button>
        </div>
    );
}