'use client';
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter, notFound } from "next/navigation";
import HeroSection from "@/components/HeroSection";
import { useSession } from "@/lib/auth-client";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon?: string;
  unit: string;
  image?: string;
  today: number;
  yesterday?: number;
  change?: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

type SortOption = "default" | "low-to-high" | "high-to-low";

const toBnNum = (num: number | string): string => {
  if (num === undefined || num === null) return "০";
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const formattedStr = Number(num).toLocaleString('en-US');
  return formattedStr.replace(/\d/g, (digit) => bnDigits[parseInt(digit)]);
};

const getUnitText = (unit: string): string => {
  const normalized = unit?.toLowerCase() || '';
  if (normalized === 'kg') return 'প্রতি কেজি';
  if (normalized === 'lit' || normalized === 'liter') return 'প্রতি লিটার';
  if (normalized === 'dozen') return 'প্রতি ডজন';
  if (normalized === 'hali') return 'প্রতি হালি';
  if (normalized === 'pcs' || normalized === 'piece') return 'প্রতি পিস';
  return `প্রতি ${unit}`;
};

const ProductCard = ({ product, isAuthenticated }: { product: Product; isAuthenticated: boolean }) => {
  const router = useRouter();
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const icon = product.image || product.categoryIcon || "🛒";

  const handleCardClick = () => {
    if (isAuthenticated) {
      router.push(`/products/${product.id}`);
    } else {
      router.push(`/sign-in`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-[#F4F6F4] flex items-center justify-center text-2xl shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-[#1D271F] text-base leading-snug">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            {getUnitText(product.unit)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between pt-2 border-t border-gray-50">
        <div>
          <span className="text-[11px] text-gray-400 font-medium block">
            আজকের দাম
          </span>
          <span className="text-base sm:text-lg font-bold text-[#1D271F]">
            {toBnNum(product.today)} টাকা
          </span>
        </div>

        <div>
          {isUp && (
            <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 text-xs font-semibold px-2 py-1 rounded-md">
              ▲ {toBnNum(product.change?.pct || 0)}%
            </span>
          )}
          {isDown && (
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-xs font-semibold px-2 py-1 rounded-md">
              ▼ {toBnNum(product.change?.pct || 0)}%
            </span>
          )}
          {!isUp && !isDown && (
            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded-md">
              — ০.০%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ProductSection() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  
  const [sortBy, setSortBy] = useState<SortOption>("default");

  useEffect(() => {
    setLoading(true);
    setIsNotFound(false);
    setSortBy("default"); 
    const apiUrl = selectedCategory
      ? `https://openapi.programming-hero.com/api/bazardor/products?category=${selectedCategory}`
      : "https://openapi.programming-hero.com/api/bazardor/products";

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          if (selectedCategory) setIsNotFound(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.data || [];
        
        if (selectedCategory && list.length === 0) {
          setIsNotFound(true);
        } else {
          setProducts(list);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Products fetch error:", err);
        if (selectedCategory) setIsNotFound(true);
        setLoading(false);
      });
  }, [selectedCategory]);

  const sortedCategoryProducts = useMemo(() => {
    if (sortBy === "low-to-high") {
      return [...products].sort((a, b) => Number(a.today) - Number(b.today));
    }
    if (sortBy === "high-to-low") {
      return [...products].sort((a, b) => Number(b.today) - Number(a.today));
    }
    return products; // Default order from API
  }, [products, sortBy]);

  if (isNotFound) {
    notFound();
  }

  const topRisers = [...products]
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  const topFallers = [...products]
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (selectedCategory) {
    const categoryName = products[0]?.categoryNameBn || selectedCategory;
    const categoryIcon = products[0]?.categoryIcon || products[0]?.image || "🛒";

    return (
      <div className="bg-[#F0F5F0]/60 py-8 min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-6xl space-y-6">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200/60 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl">{categoryIcon}</span>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1D271F]">{categoryName}</h1>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">এই বিভাগের আজকের দাম ও পরিবর্তন</p>
              <p className="text-xs sm:text-sm text-gray-500 pt-1 font-medium">
                মোট {toBnNum(sortedCategoryProducts.length)}টি পণ্য দেখানো হচ্ছে
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <label htmlFor="sort-select" className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                সাজান:
              </label>
              <div className="relative inline-block w-48">
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full appearance-none bg-white border border-gray-200 hover:border-gray-300 rounded-xl px-3.5 py-2 pr-9 text-xs sm:text-sm font-medium text-gray-800 shadow-2xs focus:outline-none focus:border-[#05893e] cursor-pointer transition-colors"
                >
                  <option value="default">ডিফল্ট</option>
                  <option value="low-to-high">দাম: কম থেকে বেশি</option>
                  <option value="high-to-low">দাম: বেশি থেকে কম</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedCategoryProducts.map((product) => (
              <ProductCard key={`cat-prod-${product.id}`} product={product} isAuthenticated={isAuthenticated} />
            ))}
          </div>

        </div>
      </div>
    );
  }

  return (
    <div>
      <HeroSection />

      <div className="bg-[#F0F5F0]/60 py-10 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl space-y-12">
          
          {topRisers.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1D271F] flex items-center gap-2">
                <span className="text-red-500">▲</span> আজ দাম বেড়েছে
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topRisers.map((product) => (
                  <ProductCard key={`riser-${product.id}`} product={product} isAuthenticated={isAuthenticated} />
                ))}
              </div>
            </section>
          )}

          {topFallers.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1D271F] flex items-center gap-2">
                <span className="text-emerald-600">▼</span> আজ দাম কমেছে
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topFallers.map((product) => (
                  <ProductCard key={`faller-${product.id}`} product={product} isAuthenticated={isAuthenticated} />
                ))}
              </div>
            </section>
          )}

          <section id="সব-পণ্য" className="space-y-4 pt-4 scroll-mt-24">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1D271F]">সব পণ্য</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">মোট {toBnNum(products.length)}টি পণ্য দেখানো হচ্ছে</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard key={`all-${product.id}`} product={product} isAuthenticated={isAuthenticated} />
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}