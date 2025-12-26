'use client'

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useBoard } from "./BoardContextProvider";
import { useEffect, useState } from "react";
import type { BoardProps } from "./SideNav";
import DeleteBoard from "../modals/DeleteBoard";
import EditBoard from "../modals/EditBoard";
import type { Columns } from "./Board";
import NewTaskModal from "../modals/NewTask";

export default function Header({boardSlug}: {boardSlug: string}) {
  const {boards, activeBoard, setActiveBoard, editModal, setEditModal, darkMode} = useBoard()
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [toggleEditModal, setToggleEditModal] = useState<boolean>(false)
  const [openNewTaskModal, setOpenNewTaskModal] = useState<boolean>(false)
  const [columns, setColumns] = useState<Columns[]>([])

  const getCurrentBoardColumns = async (boardId: string) => {
    try {
      const res = await fetch(`http://localhost:8001/api/columns/${boardId}`)
      if(!res.ok){
        console.error('Failed to fetch current board')
        return
      }
      const data = await res.json()
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

  const showTaskModal = () => {
    setOpenNewTaskModal(prev => !prev)
  }

  const closeTaskModal = () => {
    setOpenNewTaskModal(false)
  }

  const showDeleteModal = () => {
    setOpenDeleteModal(prev => !prev)
  }

  const closeDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  const showEditModal = () => {
    setToggleEditModal(prev => !prev)
  }

  const closeEditModal = () => {
    setToggleEditModal(false)
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
    <header className={`z-2 w-full h-[90px] flex items-center sticky ${darkMode ? 'bg-black' : ''}`}>
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="font-medium text-3xl"> {activeBoard?.name} </h1  >
        </div>
        <div className="w-[25%] flex items-center gap-2 px-2">
          <button onClick={showTaskModal} className="w-[65%] bg-[#4682B4] px-2 py-2 text-white rounded-lg text-lg font-medium cursor-pointer hover:bg-[#0077B6]">
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
      {toggleEditModal && activeBoard && <EditBoard currentBoard={activeBoard} editModal={toggleEditModal} currentBoardColumns={columns} closeEditModal={closeEditModal} onColumnsChange={refreshColumns} />}
      {openNewTaskModal && <NewTaskModal newTaskModal={openNewTaskModal} closeTaskModal={closeTaskModal} />}
    </header>
  );
}
