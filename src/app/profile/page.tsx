'use client';

import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট করা হয়েছে!");
      router.push("/");
    } catch (error) {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    }
  };

  if (isPending) {
    return <div className="py-20 text-center text-gray-400">প্রোফাইল লোড হচ্ছে...</div>;
  }

  if (!user) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="bg-[#F0F5F0]/40 py-10 min-h-[75vh]">
      <div className="container mx-auto px-4 max-w-2xl space-y-6">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1D271F]">আমার প্রোফাইল</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Info Header Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#05893e]/10 border border-gray-100 flex items-center justify-center shrink-0">
              {user.image ? (
                <img src={user.image} alt={user.name || "User"} className="w-full h-full object-cover" />
              ) : (
                <span className="font-bold text-xl text-[#05893e]">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1D271F]">{user.name}</h2>
              <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-red-600 border border-red-200 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            ↩ সাইন আউট
          </button>
        </div>

        {/* Info & Update Section Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs space-y-4">
          <h3 className="text-lg font-bold text-[#1D271F]">তথ্য</h3>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">নাম</label>
            <input
              type="text"
              value={user.name || ""}
              readOnly
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 text-gray-700 cursor-not-allowed focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <Link
              href="/profile/update"
              className="w-full block text-center bg-[#05893E] hover:bg-[#047233] text-white font-medium py-2.5 rounded-lg text-sm transition-colors shadow-xs"
            >
              তথ্য আপডেট করুন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}