import Image from "next/image";
import navLogo from "@/assets/Nav logo.png"

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-2">
          <div>
            <Image src={navLogo} width={40} height={40} alt="Navbar logo"/>
          </div>
          <div >
            <p className="font-bold">বাজার দর</p>
            <p className="text-[12px]">মঙ্গলবার, ৬ অক্টোবর, ২০২৬</p>
          </div>
        </div>
        <div className="flex gap-2">
          {/* <input
            type="text"
            placeholder="Search"
            className="input w-24 md:w-auto"
          /> */}
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
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
