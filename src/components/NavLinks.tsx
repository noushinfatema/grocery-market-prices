'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  id: string | number;
  nameBn: string;
  slug: string;
  icon?: string;
}

const NavLinks = () => {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("https://api.api-store.workers.dev/api/bazardor/categories")
      .then((res) => res.json())
      .then((data) => {
        // Adjust array path based on backend response shape
        const list = Array.isArray(data) ? data : data?.data || [];
        setCategories(list);
      })
      .catch((err) => console.error("Categories fetch error:", err));
  }, []);

  return (
    <div className="border-t border-gray-100 bg-white">
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-6 overflow-x-auto py-2.5 scrollbar-none text-xs sm:text-sm">
          {categories.map((cat, id) => {
            const href = cat.slug ? `/category/${cat.slug}` : "/";
            const isActive = pathname === href || (pathname === "/" && id === 0);

            return (
              <Link
                key={cat.id || id}
                href={href}
                className={`flex items-center gap-1.5 whitespace-nowrap transition-colors font-medium shrink-0 pb-0.5 ${
                  isActive
                    ? "text-[#05893e] border-b-2 border-[#05893e]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {cat.icon && <span>{cat.icon}</span>}
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default NavLinks;