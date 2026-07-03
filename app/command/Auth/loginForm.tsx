"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

interface LoginFormProps {
    onSuccess: () => void;
    onSwitchToRegister: () => void;
    onForgotPassword: () => void;
}

export default function LoginForm({ onSuccess, onSwitchToRegister, onForgotPassword }: LoginFormProps) {
    const [loginType, setLoginType] = useState<"phone" | "email">("phone");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        if (!login.trim() || !password.trim()) {
            setError("Barcha maydonlarni to'ldiring");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8888/auth/sign-in", {
                login,
                password,
            });
            // Token saqlash
            localStorage.setItem("token", response.data.token || response.data.accessToken || "");
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.message || "Login yoki parol noto'g'ri");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-[16px]">
            <h2 className="text-[20px] font-bold text-[#FCFCFC]">
                Tizimga kirish
            </h2>

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
                        <span className="px-[12px] text-[14px] text-[#FCFCFC] border-r border-[#272B30] h-[44px] flex items-center">
                            +998
                        </span>
                        <input
                            value={login}
                            onChange={(e) => setLogin("+998" + e.target.value.replace(/\D/g, ""))}
                            placeholder="__ ___ __ __"
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

            {/* Parol */}
            <div className="flex flex-col gap-[8px]">
                <div className="flex items-center justify-between">
                    <label className="text-[14px] text-[#9DA1A3]">Parol</label>
                    <button
                        onClick={onForgotPassword}
                        className="text-[13px] text-[#2470FF] cursor-pointer hover:underline"
                    >
                        Parolni unutdingizmi?
                    </button>
                </div>
                <div className="flex items-center border border-[#272B30] rounded-[8px] overflow-hidden focus-within:border-[#2470FF] transition-colors">
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        placeholder="Parolingizni kiriting"
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
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

            {/* Xato */}
            {error && (
                <p className="text-[13px] text-red-400">{error}</p>
            )}

            {/* Kirish tugmasi */}
            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full h-[48px] bg-[#2470FF] rounded-[8px] text-[16px] font-medium text-white cursor-pointer hover:bg-[#1a5fe0] transition-colors disabled:opacity-60"
            >
                {loading ? "Yuklanmoqda..." : "Kirish"}
            </button>

            <div className="flex items-center gap-[12px]">
                <div className="flex-1 h-px bg-[#272B30]"></div>
                <span className="text-[13px] text-[#6F767E]">yoki</span>
                <div className="flex-1 h-px bg-[#272B30]"></div>
            </div>

            <button
                onClick={onSwitchToRegister}
                className="w-full h-[48px] bg-[#272B30] rounded-[8px] text-[16px] font-medium text-[#FCFCFC] cursor-pointer hover:bg-[#2E3338] transition-colors"
            >
                Ro&apos;yxatdan o&apos;tish
            </button>
        </div>
    );
}