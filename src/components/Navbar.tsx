'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import navLogo from "@/assets/Nav logo.png";
import Link from "next/link";

interface NavbarProps {
  navLinksSlot?: React.ReactNode;
  marqueeSlot?: React.ReactNode;
}

const Navbar = ({ navLinksSlot, marqueeSlot }: NavbarProps) => {
  const [date, setDate] = useState("");
  const [user, setUser] = useState(false); // Toggle to true to test user view

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

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      {/* Top Header Row */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand & Date */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#05893e] flex items-center justify-center p-1.5 shrink-0">
            <Image src={navLogo} width={36} height={36} alt="Navbar logo" className="object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight text-gray-900">বাজার দর</h1>
            <p className="text-[11px] text-gray-500 font-medium" suppressHydrationWarning>
              {date || "..."}
            </p>
          </div>
        </div>

        {/* Auth / Profile Section */}
        <div>
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-gray-50">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200">
                  <img
                    alt="User Profile"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="hidden sm:inline font-medium text-sm text-gray-800">Rezwan</span>
                <span className="text-xs text-gray-400">▼</span>
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-white rounded-box w-52 mt-2 z-50 border border-gray-100">
                <li className="px-3 py-2 border-b border-gray-100">
                  <p className="font-semibold text-sm text-gray-900">Rezwan Ahmed</p>
                  <p className="text-xs text-gray-500 truncate">rezwanahmed@gmail.com</p>
                </li>
                <li>
                  <a className="text-sm py-2">👤 আমার প্রোফাইল</a>
                </li>
                <li>
                  <a className="text-sm text-red-600 py-2">↩ সাইন আউট</a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button className="btn btn-ghost btn-sm font-medium text-gray-700 text-xs sm:text-sm hover:bg-gray-100">
                <Link href={"sign-in"}>সাইন ইন</Link>
              </button>
              <button className="btn btn-sm bg-[#05893e] hover:bg-[#047233] text-white font-medium text-xs sm:text-sm px-4 border-none">
                <Link href={"/sign-up"}>সাইন আপ</Link>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Row 2: Categories (NavLinks Slot) */}
      {navLinksSlot}

      {/* Row 3: Marquee Ticker Slot */}
      {marqueeSlot}
    </header>
  );
};

export default Navbar;