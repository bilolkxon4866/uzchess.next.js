"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { AuthData } from "./authModal";

interface ForgotPasswordProps {
    onSuccess: (data: AuthData) => void;
    onBack: () => void;
}

export default function ForgotPassword({ onSuccess, onBack }: ForgotPasswordProps) {
    const [loginType, setLoginType] = useState<"phone" | "email">("phone");
    const [login, setLogin] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    function handlePhoneChange(value: string) {
        const digits = value.replace(/\D/g, "");
        const sliced = digits.slice(0, 9);
        setLogin(sliced ? "+998" + sliced : "+998");
    }

    async function handleSubmit() {
        if (!login.trim()) {
            setError("Maydonni to'ldiring");
            return;
        }
        setError("");
        setLoading(true);
        try {
            await axios.post("http://localhost:8888/auth/resend-otp", {
                login,
                loginType,
            });
            onSuccess({ login, loginType });
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
                <span className="text-[14px]">Parolni tiklash</span>
            </button>

            {/* Tab */}
            <div className="flex bg-[#272B30] rounded-[8px] p-[4px]">
                <button
                    onClick={() => { setLoginType("phone"); setLogin(""); setError(""); }}
                    className={`flex-1 h-[36px] rounded-[6px] text-[14px] font-medium cursor-pointer transition-colors ${
                        loginType === "phone"
                            ? "bg-[#1A1D1F] text-[#FCFCFC]"
                            : "text-[#6F767E]"
                    }`}
                >
                    Telefon raqam orqali
                </button>
                <button
                    onClick={() => { setLoginType("email"); setLogin(""); setError(""); }}
                    className={`flex-1 h-[36px] rounded-[6px] text-[14px] font-medium cursor-pointer transition-colors ${
                        loginType === "email"
                            ? "bg-[#1A1D1F] text-[#FCFCFC]"
                            : "text-[#6F767E]"
                    }`}
                >
                    E-mail orqali
                </button>
            </div>

            {/* Login */}
            <div className="flex flex-col gap-[8px]">
                <label className="text-[14px] text-[#9DA1A3]">
                    {loginType === "phone" ? "Telefon raqam" : "Elektron pochta"}
                </label>
                {loginType === "phone" ? (
                    <div className="flex items-center border border-[#272B30] rounded-[8px] overflow-hidden focus-within:border-[#2470FF] transition-colors">
                        <span className="px-[12px] text-[14px] text-[#FCFCFC] border-r border-[#272B30] h-[44px] flex items-center shrink-0">
                            +998
                        </span>
                        <input
                            value={login.startsWith("+998") ? login.slice(4) : login}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            placeholder="__ ___ __ __"
                            maxLength={9}
                            className="flex-1 h-[44px] px-[12px] bg-transparent text-[14px] text-[#FCFCFC] placeholder:text-[#6F767E] outline-none"
                        />
                    </div>
                ) : (
                    <input
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder="example@gmail.com"
                        type="email"
                        className="w-full h-[44px] px-[16px] bg-transparent border border-[#272B30] rounded-[8px] text-[14px] text-[#FCFCFC] placeholder:text-[#6F767E] outline-none focus:border-[#2470FF] transition-colors"
                    />
                )}
            </div>

            {/* Xato */}
            {error && (
                <p className="text-[13px] text-red-400">{error}</p>
            )}

            {/* Davom etish */}
            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full h-[48px] bg-[#2470FF] rounded-[8px] text-[16px] font-medium text-white cursor-pointer hover:bg-[#1a5fe0] transition-colors disabled:opacity-60"
            >
                {loading ? "Yuklanmoqda..." : "Davom etish"}
            </button>
        </div>
    );
}