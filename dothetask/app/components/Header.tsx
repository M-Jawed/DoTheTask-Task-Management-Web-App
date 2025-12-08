'use client'

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaLinesLeaning } from "react-icons/fa6";
import { useBoard } from "./BoardContextProvider";
import { useState } from "react";
import type { BoardProps } from "./SideNav";
import DeleteBoard from "../modals/DeleteBoard";

export default function Header({boardSlug}: {boardSlug: string}) {
  const {boards, activeBoard, setActiveBoard} = useBoard()
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  const showDeleteModal = () => {
    setOpenDeleteModal(prev => !prev)
  }

  const closeDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  return (
    <header className="w-full h-[90px] flex items-center ">
      <div className="flex items-center gap-2 px-1 py-4">
        <FaLinesLeaning fill="#4682B4" className="text-4xl" />
        <h1 className="text-4xl font-bold">DoTheTask</h1>
      </div>
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="font-medium text-3xl"> {activeBoard?.name} </h1  >
        </div>
        <div className="w-[25%] flex items-center gap-2 px-2">
          <button className="w-[65%] bg-[#4682B4] px-2 py-2 text-white rounded-lg text-lg font-medium cursor-pointer hover:bg-[#0077B6]">
            Add new task
          </button>
          <button onClick={showDeleteModal} className="w-[15%] py-2 px-[10px] bg-red-500 flex items-center justify-center text-xl rounded-lg cursor-pointer">
            {" "}
            <MdDelete fill="white" />{" "}
          </button>
          <button className="w-[15%] py-2 px-[10px] bg-green-300 flex items-center justify-center text-xl rounded-lg cursor-pointer">
            {" "}
            <FaEdit fill="white" />{" "}
          </button>
        </div>
      </div>
      {openDeleteModal && activeBoard && <DeleteBoard deleteModal={openDeleteModal} closeDeleteModal={closeDeleteModal} />}
    </header>
  );
}
