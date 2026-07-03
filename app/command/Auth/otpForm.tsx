"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { AuthData, AuthMode } from "./authModal"

interface OtpFormProps {
    authData: AuthData;
    mode: AuthMode;
    onSuccess: (code: string) => void;
    onBack: () => void;
}

export default function OtpForm({ authData, mode, onSuccess, onBack }: OtpFormProps) {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(56);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    // Taymer
    useEffect(() => {
        if (timer <= 0) return;
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    function handleChange(value: string, index: number) {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        // Keyingi inputga o'tish
        if (value && index < 5) {
            inputs.current[index + 1]?.focus();
        }
    }

    function handleKeyDown(e: React.KeyboardEvent, index: number) {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    }

    async function handleResend() {
        if (timer > 0) return;
        try {
            await axios.post("http://localhost:8888/auth/resend-otp", {
                login: authData.login,
                loginType: authData.loginType,
            });
            setTimer(56);
            setOtp(["", "", "", "", "", ""]);
            setError("");
        } catch (err: any) {
            setError(err.response?.data?.message || "Xatolik yuz berdi");
        }
    }

    async function handleSubmit() {
        const code = otp.join("");
        if (code.length < 6) {
            setError("6 xonali kodni kiriting");
            return;
        }
        setError("");
        setLoading(true);
        try {
            await axios.post("http://localhost:8888/auth/verify-otp", {
                login: authData.login,
                code,
            });
            onSuccess(code);
        } catch (err: any) {
            setError(err.response?.data?.message || "Kod noto'g'ri");
        } finally {
            setLoading(false);
        }
    }

    const formatTimer = (t: number) => {
        const m = Math.floor(t / 60).toString().padStart(2, "0");
        const s = (t % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    return (
        <div className="flex flex-col gap-[16px]">
            {/* Orqaga */}
            <button
    onClick={onBack}
    className="flex items-center gap-2 text-[#9DA1A3] cursor-pointer hover:text-white transition-colors w-fit"
    >
    <Image src="/chevron-left.svg" alt="orqaga" width={16} height={16} />
    <span className="text-[14px]">
    {mode === "forgot" ? "Parolni qayta tiklash" : "Telefon raqamni tasdiqlash"}
    </span>
    </button>

    <div>
    <h2 className="text-[16px] font-bold text-[#FCFCFC] leading-[22px]">
        Tasdiqlash uchun maxsus kod{" "}
    {authData.loginType === "phone"
        ? "quyidagi raqamga"
        : "elektron pochtaga"}{" "}
    yuborildi
    </h2>
    <div className="flex items-center gap-2 mt-[8px]">
    <span className="text-[14px] text-[#9DA1A3]">{authData.login}</span>
        <button onClick={onBack} className="cursor-pointer">
    <Image src="/edit.svg" alt="tahrirlash" width={16} height={16} />
    </button>
    </div>
    </div>

    {/* OTP inputlar */}
    <div>
        <label className="text-[14px] text-[#9DA1A3] mb-[8px] block">
        Maxsus kodni kiriting
    </label>
    <div className="flex gap-[8px]">
        {otp.map((digit, i) => (
                <input
                    key={i}
            ref={(el) => { inputs.current[i] = el; }}
    value={digit}
    onChange={(e) => handleChange(e.target.value, i)}
    onKeyDown={(e) => handleKeyDown(e, i)}
    maxLength={1}
    className={`w-[44px] h-[44px] text-center text-[18px] font-bold text-[#FCFCFC] bg-transparent border rounded-[8px] outline-none transition-colors ${
        digit
            ? "border-[#2470FF]"
            : "border-[#272B30] focus:border-[#2470FF]"
    }`}
    />
))}
    </div>
    </div>

    {/* Taymer */}
    <div className="flex items-center gap-2">
    <span className="text-[13px] text-[#9DA1A3]">Qayta yuborish:</span>
    {timer > 0 ? (
        <span className="text-[13px] font-medium text-[#2470FF]">
            {formatTimer(timer)}
            </span>
    ) : (
        <button
            onClick={handleResend}
        className="text-[13px] text-[#2470FF] cursor-pointer hover:underline"
            >
            Qayta yuborish
    </button>
    )}
    </div>

    {/* Xato */}
    {error && (
        <p className="text-[13px] text-red-400">{error}</p>
    )}

    {/* Tasdiqlash tugmasi */}
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