import Image from "next/image";
import logo from "../../public/logo-mobile.svg";
import { MdOutlineTableChart } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaLinesLeaning } from "react-icons/fa6";

export default function SideNav() {
  return (
    <section className="w-[20%]">
      <div className="">
        <div className="flex items-center gap-2 px-8 py-4">
          <FaLinesLeaning fill="#4682B4" className="text-4xl" />
          <h1 className="text-4xl font-bold">DoTheTask</h1>
        </div>

        <div className="mt-7 px-5">
          <p className="text-sm font-bold text-gray-400 tracking-widest">
            ALL BOARDS (1)
          </p>
        </div>

        <div className="mt-5 flex flex-col justify-between h-[520px] gap-y-1">
          <div>
            <button className="flex items-center gap-2 bg-[#4682B4] w-[80%] h-[50px] px-5 text-lg text-white font-medium rounded-r-xl">
              {" "}
              <MdOutlineTableChart /> Platform launch{" "}
            </button>
            <button className="flex items-center gap-2 w-[80%] h-[50px] px-5 text-lg text-black font-medium rounded-r-xl">
              {" "}
              <MdOutlineTableChart /> Marketing Plan{" "}
            </button>
          </div>

          <div className="px-5">
            <button className="w-[80%] bg-gray-200 h-[50px]">Button</button>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-center w-[80%]">
            <button className="flex items-center gap-2 cursor-pointer"> <FaRegEyeSlash /> Hide Navbar</button>
        </div>
      </div>
    </section>
  );
}
