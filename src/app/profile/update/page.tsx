'use client';

import { useState, useEffect } from "react";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  if (isPending) {
    return <div className="py-20 text-center text-gray-400">লোড হচ্ছে...</div>;
  }

  if (!user) {
    router.push("/sign-in");
    return null;
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নামের ঘরটি পূরণ করুন।");
      return;
    }

    setLoading(true);

    try {
      const res = await authClient.updateUser({
        name: name.trim(),
      });

      if (res?.error) {
        toast.error(res.error.message || "তথ্য আপডেট করতে সমস্যা হয়েছে।");
      } else {
        toast.success("তথ্য সফলভাবে আপডেট করা হয়েছে!");
        // Force a hard navigation so the Navbar picks up the DB changes immediately
        window.location.href = "/profile";
      }
    } catch (err: any) {
      toast.error(err?.message || "একটি ত্রুটি ঘটেছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F0F5F0]/40 py-10 min-h-[75vh]">
      <div className="container mx-auto px-4 max-w-xl space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1D271F]">তথ্য আপডেট করুন</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            আপনার প্রোফাইলের নাম পরিবর্তন করুন।
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs space-y-4">
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">নতুন নাম</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: রেজোয়ান আহমেদ"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#05893E]"
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Link
                href="/profile"
                className="w-1/2 text-center border border-gray-200 text-gray-700 hover:bg-gray-50 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                বাতিল করুন
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="w-1/2 bg-[#05893E] hover:bg-[#047233] text-white font-medium py-2.5 rounded-lg text-sm transition-colors shadow-xs disabled:opacity-50"
              >
                {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}