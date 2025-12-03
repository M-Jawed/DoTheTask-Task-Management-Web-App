'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../public/logo-mobile.svg";
import { MdOutlineTableChart } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";


export default function SideNav() {
  const [toggleNav, setToggleNav] = useState<boolean>(true)
  const [toggleTheme, setToggleTheme] = useState<boolean>(false)
  const [themeText, setThemeText] = useState<string>()

  const hideNav = () => {
    setToggleNav(false)
  }

  const theme = () => {
    if(toggleTheme){
      setThemeText('Toggle Lightmode')
    } else {
      setThemeText('Toggle Darkmode')
    }
  }

  const toggleDarkmode = () => {
    setToggleTheme(prev => !prev)
  }

  useEffect(() => {
    theme()
  }, [toggleTheme])
  
  const showNav = () => {
    setToggleNav(true)
  }
  return (
    <section className={`${toggleNav ? 'w-[20%]': 'w-[2%]'} relative`}>
      <div className={`${toggleNav ? 'flex flex-col' : 'hidden'} `}>
        <div className=" px-5">
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
            <button onClick={toggleDarkmode} className={`w-[80%] h-[50px] rounded-lg ${toggleTheme ? 'bg-gray-200' : 'bg-black text-white font-medium'} `}> {themeText} </button>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-center w-[80%]">
            { toggleNav && <button onClick={hideNav} className="flex items-center gap-2 cursor-pointer"> <FaRegEyeSlash /> Hide Navbar</button>}
        </div>
      </div>
      {!toggleNav && <button onClick={showNav} className="absolute bottom-0 top-120 px-2 w-[100%] flex items-center justify-center bg-[#4682B4] h-[40px] rounded-r-lg cursor-pointer"> <FaEye fill="white" /> </button>}
    </section>
  );
}
