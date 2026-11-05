
import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <main className="relative min-h-[70vh] flex flex-col items-center justify-center bg-[#071C16] px-4 py-16 overflow-hidden">

            <div className="absolute w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -top-20 -left-20" />
            <div className="absolute w-96 h-96 bg-green-400/10 rounded-full blur-[120px] -bottom-20 -right-20" />

            <div className="relative text-center max-w-xl">

                <h1 className="text-[140px] md:text-[200px] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 to-emerald-700">
                    404
                </h1>

                <h2 className="text-3xl md:text-4xl font-bold text-white mt-6">
                    Lost in the Green?
                </h2>

                <p className="text-emerald-100/50 mt-4 text-base md:text-lg leading-relaxed max-w-md mx-auto">
                    Looks like you've wandered into an unknown corner.
                    The page you're looking for doesn't exist.
                </p>

                <div className="mt-10 flex justify-center">
                    <Link
                        href="/"
                        className="group flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-[#071C16] font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:-translate-y-1"
                    >
                        <Home size={19} />
                        Back to Homepage
                        <ArrowLeft size={18} className="rotate-180 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <p className="mt-12 text-xs tracking-[0.3em] uppercase text-emerald-500/40">
                    Error 404 · Page Not Found
                </p>
            </div>
        </main>
    );
};

export default NotFound;
