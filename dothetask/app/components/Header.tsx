'use client'

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useBoard } from "./BoardContextProvider";
import { useEffect, useState } from "react";
import type { BoardProps } from "./SideNav";
import DeleteBoard from "../modals/DeleteBoard";
import EditBoard from "../modals/EditBoard";

export default function Header({boardSlug}: {boardSlug: string}) {
  const {boards, activeBoard, setActiveBoard} = useBoard()
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)

  useEffect(() => {
    if(boards.length > 0){
      const current = boards.find((item: BoardProps) => item.slug.toLowerCase() === boardSlug.toLowerCase())
      if(!current) {
        console.error('Could not find the current board')
        return
      }
      setActiveBoard(current)
    }
  }, [boards, boardSlug])

  const showDeleteModal = () => {
    setOpenDeleteModal(prev => !prev)
  }

  const closeDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  const showEditModal = () => {
    setOpenEditModal(prev => !prev)
  }

  const closeEditModal = () => {
    setOpenEditModal(false)
  }

  return (
    <header className="z-2 w-full h-[90px] flex items-center ">
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
          <button onClick={showEditModal} className="w-[15%] py-2 px-[10px] bg-green-300 flex items-center justify-center text-xl rounded-lg cursor-pointer">
            {" "}
            <FaEdit fill="white" />{" "}
          </button>
        </div>
      </div>
      {openDeleteModal && activeBoard && <DeleteBoard deleteModal={openDeleteModal} closeDeleteModal={closeDeleteModal} currentBoard={activeBoard} />}
      {openEditModal && activeBoard && <EditBoard currentBoard={activeBoard} editModal={openEditModal} closeEditModal={closeEditModal} />}
    </header>
  );
}
