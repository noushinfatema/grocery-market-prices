import { Suspense } from "react";
import ProductSection from "@/components/ProductSection";

export default function Home() {
  return (
    <div className="w-full">
      <Suspense fallback={<div className="py-12 text-center text-gray-400">লোড হচ্ছে...</div>}>
        <ProductSection />
      </Suspense>
    </div>
  );
}