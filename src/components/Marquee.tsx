'use client';
import { useEffect, useState } from "react";
interface Product {
  id: number;
  slug: string;
  nameBn: string;
  categoryIcon?: string;
  image?: string;
  unit: string;
  today: number;
  change?: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

// Helper to convert English numbers to Bengali digits (e.g., 148 -> ১৪৮)
const toBnNum = (num: number | string) => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num?.toString().replace(/\d/g, (d) => bnDigits[parseInt(d)]);
};

const translateUnit = (unit: string) => {
  const units: Record<string, string> = { kg: "কেজি", gm: "গ্রাম", hali: "হালি", lit: "লিটার", dozen: "ডজন", pcs: "পিস" };
  return units[unit?.toLowerCase()] || unit;
};

const Marquee = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.data || [];
        setProducts(list);
      })
      .catch((err) => console.error("Products fetch error:", err));
  }, []);

  if (!products.length) return null;

  const tickerItems = [...products, ...products];

  return (
    <div className="w-full bg-[#f8faf9] border-y border-gray-200 overflow-hidden py-2 text-[12px]">
      <div className="flex w-max animate-marquee">
        {tickerItems.map((item, index) => {
          const isUp = item.change?.dir === "up";
          const isDown = item.change?.dir === "down";
          const displayIcon = item.image || item.categoryIcon;

          return (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center gap-1.5 px-4 border-r border-gray-200 whitespace-nowrap shrink-0"
            >
              {displayIcon && <span>{displayIcon}</span>}
              <span className="font-semibold text-gray-800">{item.nameBn}</span>
              
              <span className="text-gray-500 ml-1">
                {toBnNum(item.today)} টাকা/{translateUnit(item.unit)}
              </span>

              {isUp && item.change?.pct && (
                <span className="flex items-center text-red-500 font-semibold gap-0.5 ml-1">
                  ▲ {toBnNum(item.change.pct)}%
                </span>
              )}
              
              {isDown && item.change?.pct && (
                <span className="flex items-center text-[#05893e] font-semibold gap-0.5 ml-1">
                  ▼ {toBnNum(item.change.pct)}%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Marquee;