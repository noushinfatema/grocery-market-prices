'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import NavLinks from "@/components/NavLinks";
import navLogo from "@/assets/Nav logo.png";
// import { Button } from "@heroui/react";

const Navbar = () => {
  const [date, setDate] = useState("");
  const user = false;

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
      })
    );
  }, []);

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-2">
          <div>
            <Image src={navLogo} width={40} height={40} alt="Navbar logo" />
          </div>
          <div>
            <p className="font-bold">বাজার দর</p>
            <p className="text-[12px]">{date}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    👤 আমার প্রোফাইল
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>↩ সাইন আউট</a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-[#2]">
              <button className="btn font-normal text-[#1d271f] text-[14px] rounded">
                সাইন ইন
              </button>
              <button className="btn bg-[#05893e] text-white font-normal text-[14px] rounded">
                সাইন আপ
              </button>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Navbar;