export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[75vh] bg-[#F0F5F0]/40 px-4">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl flex flex-col items-center space-y-4 max-w-sm w-full">
                {/* Animated Spinner */}
                <div className="relative w-14 h-14">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-emerald-100 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-[#05893e] rounded-full animate-spin border-t-transparent"></div>
                </div>
                
                {/* Text Information */}
                <div className="text-center space-y-1">
                    <h3 className="text-base font-bold text-[#1D271F]">বাজার দর লোড হচ্ছে...</h3>
                    <p className="text-xs text-gray-400">দয়া করে একটু অপেক্ষা করুন</p>
                </div>
            </div>
        </div>
    );
}