import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center py-12 px-4 bg-[#F0F5F0]/40 text-center">
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xs border border-gray-100 max-w-md w-full space-y-6 flex flex-col items-center">

        <div className="w-20 h-20 rounded-2xl bg-[#05893e]/10 flex items-center justify-center text-4xl shadow-xs">
          🔍
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#05893e] bg-[#05893e]/10 px-3 py-1 rounded-full inline-block">
            ৪০৪ | পেজ পাওয়া যায়নি
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1D271F] pt-2">
            ক্ষমা করবেন! এই পৃষ্ঠাটি নেই
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            আপনি যে ঠিকানায় যাওয়ার চেষ্টা করছেন তা সরাতে বা মুছে ফেলা হতে পারে।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
          <Link
            href="/"
            className="w-full sm:w-1/2 bg-[#05893e] hover:bg-[#047233] text-white font-medium py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-colors shadow-xs flex items-center justify-center gap-1.5"
          >
            🏠 হোম পেজ
          </Link>
          <Link
            href="/#সব-পণ্য"
            className="w-full sm:w-1/2 border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5"
          >
            🛍️ সব পণ্য দেখুন
          </Link>
        </div>

      </div>
    </div>
  );
}