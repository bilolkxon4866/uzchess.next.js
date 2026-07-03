"use client";
import { useState } from "react";
import Image from "next/image";
import RegisterForm from "./registerForm";
import LoginForm from "./loginForm";
import OtpForm from "./otpForm";
import SetPasswordForm from "./setPasswordForm";
import ForgotPassword from "./forgotPassword";

export type AuthMode = "register" | "login" | "forgot";
export type AuthStep = "form" | "otp" | "password";

export interface AuthData {
    login: string;
    loginType: "phone" | "email";
    fullName?: string;
    code?: string;
}

interface AuthModalProps {
    onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
    const [mode, setMode] = useState<AuthMode>("login");
    const [step, setStep] = useState<AuthStep>("form");
    const [authData, setAuthData] = useState<AuthData>({
        login: "",
        loginType: "phone",
    });

    function goToOtp(data: AuthData) {
        setAuthData(data);
        setStep("otp");
    }

    function goToPassword(code: string) {
        setAuthData((prev) => ({ ...prev, code }));
        setStep("password");
    }

    function goBack() {
        if (step === "otp") setStep("form");
        if (step === "password") setStep("otp");
    }

    function switchMode(newMode: AuthMode) {
        setMode(newMode);
        setStep("form");
        setAuthData({ login: "", loginType: "phone" });
    }

    return (
        <div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="relative w-[780px] bg-[#1A1D1F] rounded-[16px] overflow-hidden flex"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Yopish tugmasi */}
                <button
                    onClick={onClose}
                    className="absolute top-[16px] right-[16px] z-10 cursor-pointer"
                >
                    <Image src="/close.svg" alt="yopish" width={24} height={24} />
                </button>

                {/* Chap qism — forma */}
                <div className="w-[380px] shrink-0 p-[32px]">
                    {/* Logo */}
                    <div className="flex justify-center mb-[24px]">
                        <Image src="/icon.svg" alt="UzChess" width={120} height={32} />
                    </div>

                    {/* Forma */}
                    {step === "form" && mode === "register" && (
                        <RegisterForm
                            onSuccess={goToOtp}
                            onSwitchToLogin={() => switchMode("login")}
                        />
                    )}
                    {step === "form" && mode === "login" && (
                        <LoginForm
                            onSuccess={onClose}
                            onSwitchToRegister={() => switchMode("register")}
                            onForgotPassword={() => switchMode("forgot")}
                        />
                    )}
                    {step === "form" && mode === "forgot" && (
                        <ForgotPassword
                            onSuccess={goToOtp}
                            onBack={() => switchMode("login")}
                        />
                    )}
                    {step === "otp" && (
                        <OtpForm
                            authData={authData}
                            mode={mode}
                            onSuccess={goToPassword}
                            onBack={goBack}
                        />
                    )}
                    {step === "password" && (
                        <SetPasswordForm
                            authData={authData}
                            onSuccess={onClose}
                            onBack={goBack}
                        />
                    )}
                </div>

                {/* O'ng qism — rasm */}
                <div className="flex-1 relative bg-[#0D1B2A] min-h-[500px]">
                    <Image
                        src="/Screen.png"
                        alt="UzChess preview"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute bottom-[32px] left-[32px] right-[32px]">
                        <h3 className="text-[32px] font-bold text-white leading-[40px]">
                            Shaxmatni
                        </h3>
                        <p className="text-[20px] text-white">
                            biz bilan o&apos;rganing!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}