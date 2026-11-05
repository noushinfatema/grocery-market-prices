'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import navLogo from "@/assets/Nav logo.png";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

interface NavbarProps {
  navLinksSlot?: React.ReactNode;
  marqueeSlot?: React.ReactNode;
}

const Navbar = ({ navLinksSlot, marqueeSlot }: NavbarProps) => {
  const [date, setDate] = useState("");
  const { data: session, isPending } = useSession();
  const user = session?.user;

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট করা হয়েছে!");
    } catch (error) {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    }
  };

  return (
    <header className="bg-white">
   
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">

        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#05893e] flex items-center justify-center p-1.5 shrink-0">
            <Image src={navLogo} width={36} height={36} alt="Navbar logo" className="object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight text-gray-900">বাজার দর</h1>
            <p className="text-[11px] text-gray-500 font-medium" suppressHydrationWarning>
              {date || "..."}
            </p>
          </div>
        </Link>

        <div>
          {isPending ? (
            <div className="w-24 h-8 bg-gray-100 animate-pulse rounded-lg" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-gray-50">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 bg-[#05893e]/10 flex items-center justify-center">
                  {user.image ? (
                    <img
                      alt={user.name || "User Avatar"}
                      src={user.image}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-bold text-[#05893e] text-sm">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline font-medium text-sm text-gray-800">{user.name}</span>
                <span className="text-xs text-gray-400">▼</span>
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-white rounded-box w-52 mt-2 z-50 border border-gray-100">
                <li className="px-3 py-2 border-b border-gray-100">
                  <p className="font-semibold text-sm text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </li>
                <li>
                  <Link href="/profile" className="text-sm py-2 text-gray-700 hover:text-[#05893e]">
                    👤 আমার প্রোফাইল
                  </Link>
                </li>
                <li>
                  <button onClick={handleSignOut} className="text-sm text-red-600 py-2 w-full text-left">
                    ↩ সাইন আউট
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/sign-in" className="btn btn-ghost btn-sm font-medium text-gray-700 text-xs sm:text-sm hover:bg-gray-100">
                সাইন ইন
              </Link>
              <Link href="/sign-up" className="btn btn-sm bg-[#05893e] hover:bg-[#047233] text-white font-medium text-xs sm:text-sm px-4 border-none">
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      {navLinksSlot}
      {marqueeSlot}
    </header>
  );
};

export default Navbar;