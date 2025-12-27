"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../public/logo-mobile.svg";
import { MdOutlineTableChart } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { useBoard } from "./BoardContextProvider";
import { FaFolderPlus } from "react-icons/fa6";
import BoardForm from "../modals/BoardForm";
import { FaLinesLeaning } from "react-icons/fa6";
import { useDarkMode } from "./DarkModeProvider";

export type BoardProps = {
  id: string;
  created_at: string;
  name: string;
  slug: string;
};

export default function SideNav() {
  const [toggleNav, setToggleNav] = useState<boolean>(true);
  const [toggleBoardForm, setToggleBoardForm] = useState<boolean>(false);
  const { boards } = useBoard();
  const {darkMode, setDarkMode} = useDarkMode()
  const router = useRouter();
  const pathname = usePathname();
  const themeText = darkMode ? 'Toggle Lightmode' : 'Toggle Darkmode'

  const hideNav = () => {
    setToggleNav(false);
  };

  const showNav = () => {
    setToggleNav(true);
  };

  const showBoardForm = () => {
    setToggleBoardForm((prev) => !prev);
  };

  const closeBoardForm = () => {
    setToggleBoardForm(false);
  };

  return (
    <section
      className={`${darkMode ? 'bg-[#1A1A1D] text-white ' : ''} ${
        toggleNav
          ? "w-[23%] h-full transition-all duration-200 delay-100 ease-in-out"
          : "w-[0%]"
      }`}
    >
      <div className={`${toggleNav ? "flex flex-col" : "hidden"} `}>
        <div className="flex items-center gap-2 px-1 py-4">
          <FaLinesLeaning fill="#4682B4" className="text-4xl" />
          <h1 className="text-4xl font-bold">DoTheTask</h1>
        </div>
        <div className=" px-5">
          <p className="text-sm font-bold text-gray-400 tracking-widest mt-2">
            ALL BOARDS ({boards.length})
          </p>
        </div>

        <div className="mt-5 flex flex-col justify-between h-[520px] gap-y-1">
          <div className="">
            {boards.length > 0 ? (
              boards.map((item: BoardProps) => {
                const isAcive = pathname === `/boards/${item.slug}`;
                const smallText = item.name.length >= 20 ? 'text-sm' : 'text-lg'
                return (
                  <button
                    onClick={() => router.push(`/boards/${item.slug}`)}
                    key={item.id}
                    className={`flex items-center gap-2 mb-1 w-[96%] h-[50px] px-5 ${smallText} font-medium rounded-r-xl cursor-pointer hover:bg-[#4682B4] hover:text-white ${
                      isAcive ? "bg-[#4682B4] text-white" : ""
                    } `}
                  >
                    <MdOutlineTableChart /> {item.name}
                  </button>
                );
              })
            ) : (
              <p>Loading...</p>
            )}
            <button
              onClick={showBoardForm}
              className="flex items-center gap-2 mb-1 w-[80%] h-[50px] px-5 text-lg font-medium rounded-r-xl cursor-pointer hover:text-[#4682B4]"
            >
              {" "}
              <FaFolderPlus fill="#4682B4" /> New Board
            </button>
          </div>

          <div className="px-5">
            <button
              onClick={() => setDarkMode(prev => !prev)}
              className={`w-[80%] h-[50px] rounded-lg ${
                darkMode ? "bg-gray-200 text-black font-medium" : "bg-black text-white font-medium"
              } `}
            >
              {" "}
              {themeText}{" "}
            </button>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-center w-[80%]">
          {toggleNav && (
            <button
              onClick={hideNav}
              className="flex items-center gap-2 cursor-pointer"
            >
              {" "}
              <FaRegEyeSlash /> Hide Navbar
            </button>
          )}
        </div>
      </div>
      {!toggleNav && (
        <button
          onClick={showNav}
          className="absolute bottom-0 top-140 px-2 w-[2%] flex items-center justify-center bg-[#4682B4] h-[40px] rounded-r-lg cursor-pointer"
        >
          {" "}
          <FaEye fill="white" />{" "}
        </button>
      )}

      {toggleBoardForm && (
        <BoardForm
          toggleForm={toggleBoardForm}
          closeBoardForm={closeBoardForm}
        />
      )}
    </section>
  );
}
