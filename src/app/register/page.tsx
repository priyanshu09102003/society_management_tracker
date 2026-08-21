"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Eye, EyeOff, Home } from "lucide-react";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthHero } from "@/components/auth/AuthHero";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, flatNumber }),
    });

    setLoading(false);
    const data = await res.json();

    if (!res.ok) {
      setError(data.error?.formErrors?.[0] ?? data.error ?? "Registration failed.");
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/login"), 2000);
  }

  return (
    <AuthHero fullScreen>
      <div className="min-h-screen w-full flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px] rounded-[24px] border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.37)] p-8 flex flex-col gap-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="size-[34px] rounded-full bg-[#375DFB]" />
            <h1 className="text-[26px] font-bold text-[#eee] leading-[1.3] tracking-[-0.5px]">
              Create account
            </h1>
            <div className="flex gap-1.5 items-center text-[12px] tracking-[-0.12px]">
              <span className="text-white/80 font-medium">Already have an account?</span>
              <a href="/login" className="text-[#7DA3F5] font-semibold underline">
                Login
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <AuthInput
                icon={<User size={16} />}
                name="name"
                placeholder="Full name"
                value={name}
                onChange={setName}
                required
              />
              <AuthInput
                icon={<Mail size={16} />}
                type="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={setEmail}
                required
              />
              <AuthInput
                icon={<Home size={16} />}
                name="flatNumber"
                placeholder="Flat number (optional)"
                value={flatNumber}
                onChange={setFlatNumber}
              />
              <AuthInput
                icon={<Lock size={16} />}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={setPassword}
                required
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-[#1A1C1E]"
                  >
                    {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                }
              />
            </div>

            {error && <p className="text-[13px] text-red-300">{error}</p>}
            {success && (
              <p className="text-[13px] text-green-300">
                Registered! Awaiting admin approval — redirecting to login...
              </p>
            )}

            <button
              type="submit"
              disabled={loading || success}
              className="h-[48px] w-full rounded-[10px] text-white text-[14px] font-medium tracking-[-0.14px] shadow-[0px_1px_2px_0px_rgba(37,62,167,0.48),0px_0px_0px_1px_#375dfb] disabled:opacity-60"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%), linear-gradient(90deg, #1D61E7 0%, #1D61E7 100%)",
              }}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 w-full">
                <div className="flex-1 h-px bg-white/15" />
                <span className="text-[12px] text-white/50 tracking-[-0.12px]">Or sign up with</span>
                <div className="flex-1 h-px bg-white/15" />
              </div>
              <div className="flex gap-[15px] w-full">
                <SocialButton provider="google" />
                <SocialButton provider="facebook" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </AuthHero>
  );
}

function SocialButton({ provider }: { provider: "google" | "facebook" }) {
  return (
    <button
      type="button"
      disabled
      title="Not implemented — email/password only for this assignment"
      className="flex-1 h-[48px] flex items-center justify-center gap-[10px] rounded-[10px] border border-white/20 bg-white/90 backdrop-blur px-6 opacity-70"
    >
      {provider === "google" ? <GoogleIcon /> : <FacebookIcon />}
      <span className="text-[14px] font-semibold text-[#1A1C1E] tracking-[-0.14px] capitalize">
        {provider}
      </span>
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.87 2.7-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.95v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.95A9 9 0 0 0 0 9c0 1.45.35 2.83.95 4.03l3-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58A9 9 0 0 0 .95 4.97l3 2.33C4.66 5.17 6.65 3.58 9 3.58z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path
        fill="#1877F2"
        d="M18 9a9 9 0 1 0-10.4 8.89v-6.29H5.31V9h2.29V7.02c0-2.26 1.35-3.5 3.41-3.5.99 0 2.02.18 2.02.18v2.22h-1.14c-1.12 0-1.47.7-1.47 1.41V9h2.5l-.4 2.6H10.4v6.29A9 9 0 0 0 18 9z"
      />
    </svg>
  );
}