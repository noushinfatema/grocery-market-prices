'use client';

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

const toBnNum = (num: number | string): string => {
  if (num === undefined || num === null) return "০";
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => bnDigits[parseInt(d)]);
};

function ProductDetailContent() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string; 

  const { data: session, isPending: sessionLoading } = useSession();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    if (!sessionLoading && !session?.user) {
      router.push("/sign-in");
    }
  }, [session, sessionLoading, router]);

  useEffect(() => {
    if (!slug) return;
    
    fetch(`https://openapi.programming-hero.com/api/bazardor/products/${slug}`)
      .then((res) => {
        if (!res.ok) {
          setIsNotFound(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        const item = data?.data || data;
        if (!data || data.status === false || (!item?.id && !item?.nameBn)) {
          setIsNotFound(true);
        } else {
          setProduct(item);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsNotFound(true);
        setLoading(false);
      });
  }, [slug]);

  if (isNotFound) {
    notFound();
  }

  if (sessionLoading || loading) {
    return <div className="py-20 text-center text-gray-400">পণ্য লোড হচ্ছে...</div>;
  }

  if (!product) return null;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  
  const difference = (product.today || 0) - (product.yesterday || 0);
  const diffText = difference > 0 ? `বেড়েছে + ${toBnNum(difference)}` : difference < 0 ? `কমেছে - ${toBnNum(Math.abs(difference))}` : "অপরিবর্তিত আছে";
  const unitText = product.unit === 'kg' ? 'কেজি' : product.unit === 'lit' || product.unit === 'liter' ? 'লিটার' : product.unit;

  const rawMarkets = product.markets || [];

  const markets = rawMarkets.map((m: any) => {
    const minVal = m.min ?? 0;
    const maxVal = m.max ?? 0;
    const avgVal = m.avg ?? Number(((minVal + maxVal) / 2).toFixed(1));
    return {
      ...m,
      marketName: m.market || m.name || "বাজার",
      min: minVal,
      max: maxVal,
      avg: avgVal
    };
  });
  const allMins = markets.map((m: any) => m.min);
  const allMaxs = markets.map((m: any) => m.max);
  const overallMin = allMins.length ? Math.min(...allMins) : (product.today || 0);
  const overallMax = allMaxs.length ? Math.max(...allMaxs) : (product.today || 0);
  const overallAvg = markets.length ? Math.round(markets.reduce((acc: number, m: any) => acc + m.avg, 0) / markets.length) : (product.today || 0);

  return (
    <div className="bg-[#F0F5F0]/40 py-8 min-h-[85vh]">
      <div className="container mx-auto px-4 max-w-5xl space-y-6">
        
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:underline">হোম</Link>
          <span>›</span>
          <Link href={`/?category=${product.category}`} className="hover:underline">{product.categoryNameBn || "ক্যাটাগরি"}</Link>
          <span>›</span>
          <span className="text-gray-800 font-medium">{product.nameBn}</span>
        </nav>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-[#F4F6F4] flex items-center justify-center text-4xl shrink-0">
              {product.image || product.categoryIcon || "🛒"}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-[#1D271F]">{product.nameBn}</h1>
                <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full font-medium">
                  {product.categoryNameBn}
                </span>
              </div>
           
              <p className="text-xs text-gray-500 font-medium">
                প্রতি {unitText}
              </p>

              <p className="text-xs text-gray-500 mt-1.5">
                গতকালকের তুলনায় আজ দাম <span className="font-semibold text-gray-700">{diffText} টাকা</span>
              </p>
            </div>
          </div>

          <div className="bg-[#F8FAF9] px-8 py-4 rounded-xl border border-gray-100 text-center sm:text-right w-full sm:w-auto shrink-0">
            <span className="text-[11px] text-gray-400 block font-medium">আজকের দাম</span>
            <span className="text-3xl font-bold text-[#1D271F] block mt-0.5">
              {toBnNum(product.today || 0)}
            </span>
            <span className="text-[11px] text-gray-500">টাকা / {unitText}</span>
            {isUp && product.change?.pct && (
              <span className="text-xs text-red-500 font-bold block mt-1">
                ▲ {toBnNum(product.change.pct)}%
              </span>
            )}
            {isDown && product.change?.pct && (
              <span className="text-xs text-emerald-600 font-bold block mt-1">
                ▼ {toBnNum(product.change.pct)}%
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h2 className="text-lg font-bold text-[#1D271F]">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-2xs">
              <span className="text-xs font-semibold text-gray-500 block">সর্বনিম্ন দাম</span>
              <span className="text-xl font-bold text-emerald-600 block my-1.5">
                {toBnNum(overallMin)} টাকা
              </span>
              <span className="text-[11px] text-gray-400">সবচেয়ে কম দামের বাজার</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-2xs">
              <span className="text-xs font-semibold text-gray-500 block">সর্বাধিক দাম</span>
              <span className="text-xl font-bold text-red-500 block my-1.5">
                {toBnNum(overallMax)} টাকা
              </span>
              <span className="text-[11px] text-gray-400">সবচেয়ে বেশি দামের বাজার</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-2xs">
              <span className="text-xs font-semibold text-gray-500 block">গড় দাম</span>
              <span className="text-xl font-bold text-[#05893e] block my-1.5">
                {toBnNum(overallAvg)} টাকা
              </span>
              <span className="text-[11px] text-gray-400">প্রতি {unitText}-এর হিসাব</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h2 className="text-lg font-bold text-[#1D271F]">বাজারভিত্তিক আজকের দাম</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-500 bg-[#F9FAF9]">
                    <th className="p-4 font-semibold">বাজার</th>
                    <th className="p-4 font-semibold">বিভাগ</th>
                    <th className="p-4 font-semibold">সর্বনিম্ন</th>
                    <th className="p-4 font-semibold">সর্বাধিক</th>
                    <th className="p-4 font-semibold">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-gray-700">
                  {markets.map((m: any, idx: number) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-medium text-gray-900">{m.marketName}</td>
                      <td className="p-4 text-gray-500">{m.division}</td>
                      <td className="p-4">{toBnNum(m.min)} টাকা</td>
                      <td className="p-4">{toBnNum(m.max)} টাকা</td>
                      <td className="p-4 font-semibold text-gray-900">{toBnNum(m.avg)} টাকা</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-400">লোড হচ্ছে...</div>}>
      <ProductDetailContent />
    </Suspense>
  );
}