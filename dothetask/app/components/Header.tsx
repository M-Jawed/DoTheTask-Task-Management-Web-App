'use client'

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useBoard } from "./BoardContextProvider";
import { useEffect, useState } from "react";
import type { BoardProps } from "./SideNav";
import DeleteBoard from "../modals/DeleteBoard";
import EditBoard from "../modals/EditBoard";
import type { Columns } from "./Board";

export default function Header({boardSlug}: {boardSlug: string}) {
  const {boards, activeBoard, setActiveBoard, editModal, setEditModal} = useBoard()
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [columns, setColumns] = useState<Columns[]>([])

  const getCurrentBoardColumns = async (boardId: string) => {
    try {
      const res = await fetch(`http://localhost:8001/api/columns/${boardId}`)
      if(!res.ok){
        console.error('Failed to fetch current board')
        return
      }
      const data = await res.json()
      console.log(data)
      setColumns(data)
    } catch(err){
      console.error(err)
    }
  }

  const refreshColumns = () => {
    if(activeBoard?.id){
      getCurrentBoardColumns(activeBoard.id)
    }
  }

  const showDeleteModal = () => {
    setOpenDeleteModal(prev => !prev)
  }

  const closeDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  const showEditModal = () => {
    setEditModal(prev => !prev)
  }

  const closeEditModal = () => {
    setEditModal(false)
  }

  useEffect(() => {
    if(boards.length > 0){
      const current = boards.find((item: BoardProps) => item.slug.toLowerCase() === boardSlug.toLowerCase())
      if(!current) {
        console.error('Could not find the current board')
        return
      }
      setActiveBoard(current)
      getCurrentBoardColumns(current?.id)
    }
  }, [boards, boardSlug])

  return (
    <header className="z-2 w-full h-[90px] flex items-center sticky ">
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
      {editModal && activeBoard && <EditBoard currentBoard={activeBoard} editModal={editModal} currentBoardColumns={columns} closeEditModal={closeEditModal} onColumnsChange={refreshColumns} />}
    </header>
  );
}
