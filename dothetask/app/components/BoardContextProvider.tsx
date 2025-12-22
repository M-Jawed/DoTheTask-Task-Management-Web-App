"use client";

import { createContext, useContext, useState, useEffect } from "react";
import React from "react";
import type { BoardProps } from "./SideNav";
import type { Columns } from "./Board";
import getBoardDataBySlug from "../utils/getBoardDataBySlug";
import type { TaskProps } from "./Task";

type BoardContextProps = {
  boards: BoardProps[];
  activeBoard: BoardProps | null;
  setActiveBoard: (board: BoardProps | null) => void;
  getBoards: () => void
  editModal: boolean
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>
  columns: Columns[]
  getCurrentBoardColumns: (boardId: string) => Promise<void>
  setNewColumnField: React.Dispatch<React.SetStateAction<NewColumn>>
  handleNewColumn: () => void
  newColumnField: NewColumn
  resetNewColumnField: () => void
  tasks: TaskProps[]
};

type NewColumn = {
    name: string
    boardId: string
}

export const BoardContext = createContext<BoardContextProps | null>(null);
export const useBoard = () => {
  const context = useContext(BoardContext)

  if(!context){
    throw new Error('Context is null')
  }

  return context
}

export default function BoardContextProvider({
  children,
  boardSlug
}: {
  children: React.ReactNode;
  boardSlug?: string
}) {
  const [boards, setBoards] = useState<BoardProps[]>([]);
  const [activeBoard, setActiveBoard] = useState<BoardProps | null>(null);
  const [editModal, setEditModal] = useState<boolean>(false)
  const [columns, setColumns] = useState<Columns[]>([])
  const [tasks, setTasks] = useState<TaskProps[]>([])
  const [newColumnField, setNewColumnField] = useState<NewColumn>({name: '', boardId: ''})

   const getBoards = async () => {
    const res = await fetch("http://localhost:8001/api/boards");
    const data = await res.json();

    if (!res.ok) {
      console.error("Failed to get data");
      return;
    }
    setBoards(data);
  };

  const getCurrentBoard = async () => {
    const current = await getBoardDataBySlug(boardSlug!)
    if(current.success){
      getCurrentBoardColumns(current.board.id)
    }
  }

  const getAllTasks = async () => {
    try {
      const res = await fetch('http://localhost:8001/api/tasks')
      if(!res.ok){
        console.error('Failed to get tasks')
        return
      }
      const data = await res.json()
      setTasks(data)
    } catch(err){
      console.error(err instanceof Error ? err.message : String(err))
    }
  }

  const getCurrentBoardColumns = async (boardId: string) => {
    const res = await fetch(`http://localhost:8001/api/columns/${boardId}`)
    if(!res.ok){
      console.error('Failed to fetch current board columns')
      return
    }
    const data = await res.json()
    setColumns(data)
  }

  const handleNewColumn = async () => {
    const {name, boardId} = newColumnField

    if(!name || !boardId) return

    try {
      const res = await fetch(`http://localhost:8001/api/columns/newColumn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, boardId})
      })
      const data = await res.json()
      if(!res.ok){
        console.error(data.message)
      }
    } catch(err){
      console.error(err)
    }
  }

  const resetNewColumnField = () => {
    setNewColumnField({name: '', boardId: ''})
  }

  useEffect(() => {
    getBoards()
    getAllTasks()
  }, [])

  useEffect(() => {
    getCurrentBoard()
  }, [boardSlug, columns])

  return (
    <BoardContext.Provider value={{ boards, activeBoard, setActiveBoard, getBoards, editModal, setEditModal, columns, getCurrentBoardColumns, setNewColumnField, handleNewColumn, newColumnField, resetNewColumnField, tasks }}>
      {" "}
      {children}{" "}
    </BoardContext.Provider>
  );
}
