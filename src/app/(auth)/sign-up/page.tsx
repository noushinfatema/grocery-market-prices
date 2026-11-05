'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle state

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authClient.signUp.email({ name, email, password });
      
      if (res?.error) {
        toast.error(res.error.message || "রেজিস্ট্রেশন করতে সমস্যা হয়েছে।");
      } else {
        // Force sign out to prevent BetterAuth's default auto-login
        await authClient.signOut(); 
        
        toast.success("অ্যাকাউন্ট তৈরি সফল হয়েছে! সাইন ইন করুন।");
        router.push("/sign-in");
      }
    } catch (err: any) {
      toast.error(err?.message || "একটি ত্রুটি ঘটেছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center py-12 px-4 bg-[#F0F5F0]/40">
      <div className="text-center max-w-md mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1D271F]">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md space-y-4">
        <form onSubmit={handleRegister} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">নাম</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="রহিম উদ্দিন"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#05893E]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">ইমেইল</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#05893E]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">পাসওয়ার্ড</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#05893E] pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#05893E] hover:bg-[#047233] text-white font-medium py-2.5 rounded-lg text-sm transition-colors shadow-xs mt-2 disabled:opacity-50"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-gray-500">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/sign-in" className="text-[#05893E] font-semibold hover:underline">
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}