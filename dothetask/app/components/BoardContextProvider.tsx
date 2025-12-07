"use client";

import { createContext, useContext, useState, useEffect } from "react";
import React from "react";
import type { BoardProps } from "./SideNav";
import supabase from "@/supabase-client";

type BoardContextProps = {
  boards: BoardProps[];
  activeBoard: BoardProps | null;
  setActiveBoard: (board: BoardProps | null) => void;
  getBoards: () => void
};

export const BoardContext = createContext<BoardContextProps | null>(null);
export const useBoard = () => {
  const context = useContext(BoardContext)

  if(!context){
    throw new Error('Context is null')
  }

  return context
}

export default function BoardContextProvider({
  boardSlug,
  children,
}: {
  boardSlug?: string;
  children: React.ReactNode;
}) {
  const [boards, setBoards] = useState<BoardProps[]>([]);
  const [activeBoard, setActiveBoard] = useState<BoardProps | null>(null);

   const getBoards = async () => {
    const res = await fetch("http://localhost:8000/api/boards");
    const data = await res.json();

    if (!res.ok) {
      console.error("Failed to get data");
      return;
    }

    setBoards(data);
  };

  useEffect(() => {
    if(boards.length > 0){
      const findActiveBoard = boards.find((item: BoardProps) => item.slug === boardSlug)
      if(!findActiveBoard){
        console.log('Failed to find the active board')
        return
      }
      setActiveBoard(findActiveBoard || null)
      console.log(findActiveBoard)
    }
  }, [boards, boardSlug])

  useEffect(() => {
    getBoards()
  }, [])

  return (
    <BoardContext.Provider value={{ boards, activeBoard, setActiveBoard, getBoards }}>
      {" "}
      {children}{" "}
    </BoardContext.Provider>
  );
}
