'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authClient.signIn.email({ email, password, callbackURL: "/" });
      if (res?.error) {
        toast.error(res.error.message || "সাইন ইন করতে সমস্যা হয়েছে।");
      } else {
        toast.success("সফলভাবে সাইন ইন হয়েছে!");
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err?.message || "একটি ত্রুটি ঘটেছে।");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } catch (err: any) {
      toast.error(err?.message || "Google সাইন ইন ব্যর্থ হয়েছে।");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 bg-[#F0F5F0]/40">
      <div className="text-center max-w-md mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1D271F]">সাইন ইন</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md space-y-5">
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">ইমেইল</label>
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
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">পাসওয়ার্ড</label>
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
            className="w-full bg-[#05893E] hover:bg-[#047233] text-white font-medium py-2.5 rounded-lg text-sm transition-colors shadow-xs disabled:opacity-50"
          >
            {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
          </button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-gray-400">অথবা</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 border border-gray-200 py-2.5 px-4 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.3 7.31 24 12 24z" />
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 10.02 0 12s.46 3.83 1.26 5.42l4.02-3.15z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
          </svg>
          Google দিয়ে চালিয়ে যান
        </button>

        <div className="text-center pt-2">
          <p className="text-xs text-gray-500">
            অ্যাাকাউন্ট নেই?{" "}
            <Link href="/sign-up" className="text-[#05893E] font-semibold hover:underline">
              সাইন আপ করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}