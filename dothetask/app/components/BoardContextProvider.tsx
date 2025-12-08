"use client";

import { createContext, useContext, useState, useEffect } from "react";
import React from "react";
import type { BoardProps } from "./SideNav";

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
  children,
}: {
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
    getBoards()
  }, [])

  return (
    <BoardContext.Provider value={{ boards, activeBoard, setActiveBoard, getBoards }}>
      {" "}
      {children}{" "}
    </BoardContext.Provider>
  );
}
