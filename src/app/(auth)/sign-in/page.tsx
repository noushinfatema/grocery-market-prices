'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (res?.error) {
        setErrorMsg(res.error.message || "সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      } else {
        setSuccessMsg("সফলভাবে সাইন ইন হয়েছে! রিডাইরেক্ট করা হচ্ছে...");
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1000);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err: any) {
      setErrorMsg(err?.message || "Google সাইন ইন করতে ব্যর্থ হয়েছে।");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 bg-[#F0F5F0]/40">
      {/* Title & Subtitle */}
      <div className="text-center max-w-md mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1D271F]">সাইন ইন</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md space-y-5">
        {/* Error Toast / Alert Banner */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-lg text-xs font-medium animate-fadeIn">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Success Alert Banner */}
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-[#05893E] px-4 py-2.5 rounded-lg text-xs font-medium animate-fadeIn">
            ✅ {successMsg}
          </div>
        )}

        {/* Form Skeleton during active submission */}
        {loading && !errorMsg && !successMsg ? (
          <div className="space-y-4 py-2 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-10 bg-gray-100 rounded-lg w-full" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-10 bg-gray-100 rounded-lg w-full" />
            <div className="h-10 bg-[#05893E]/30 rounded-lg w-full" />
          </div>
        ) : (
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">ইমেইল</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#05893E] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">পাসওয়ার্ড</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#05893E] transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#05893E] hover:bg-[#047233] text-white font-medium py-2.5 rounded-lg text-sm transition-colors shadow-xs disabled:opacity-50"
            >
              সাইন ইন
            </button>
          </form>
        )}

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-gray-400">অথবা</span>
          </div>
        </div>

        {/* Google Social Login Only */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 border border-gray-200 py-2.5 px-4 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.3 7.31 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 10.02 0 12s.46 3.83 1.26 5.42l4.02-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          Google দিয়ে চালিয়ে যান
        </button>

        {/* Navigation Link to Sign Up */}
        <div className="text-center pt-2">
          <p className="text-xs text-gray-500">
            অ্যাাকাউন্ট নেই?{" "}
            <Link href="/sign-up" className="text-[#05893E] font-semibold hover:underline">
              সাইন আপ করুন
            </Link>
          </p>
        </div>
      </div>

      <Link href="/" className="text-xs text-gray-500 mt-6 hover:text-gray-800">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}