"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import banner from "@/assets/bazar-hero.png";

const HeroSection = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    );
  }, []);

  return (
    <section className="container mx-auto px-4 py-4 max-w-6xl">
      <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm px-6 py-6 md:px-12 md:py-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div
            className="inline-block bg-[#F3FBF4] text-[#05893E] px-4 py-1.5 rounded-full text-sm font-medium"
            suppressHydrationWarning
          >
            {date || "লোড হচ্ছে..."}
          </div>

          {/* Adjusted font size and added xl:whitespace-nowrap to keep it on one line on desktop */}
          <h1 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[36px] font-bold text-[#1D271F] leading-tight xl:whitespace-nowrap">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Removed the <br/> and set max-w-[540px] to naturally wrap into two lines */}
          <p className="text-[#1D271F]/70 text-sm md:text-base leading-relaxed max-w-[540px] mx-auto md:mx-0">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <a
              href="#সব-পণ্য"
              className="inline-flex items-center justify-center bg-[#05893E] hover:bg-[#047233] text-white font-medium text-sm sm:text-base rounded-lg px-8 py-2.5 shadow-md border-0 outline-none transition-all"
            >
              সব পণ্য দেখুন
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 w-full flex justify-center md:justify-end">
          <div className="relative w-full max-w-[240px] sm:max-w-xs md:max-w-sm aspect-square">
            <Image
              src={banner}
              alt="Bazar Prices Hero Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;