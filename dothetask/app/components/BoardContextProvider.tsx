"use client";

import { createContext, useContext, useState, useEffect } from "react";
import React from "react";
import type { BoardProps } from "./SideNav";

type BoardContextProps = {
    boards: BoardProps[]
}

export const BoardContext = createContext<BoardContextProps | null>(null);
export const useBoard = () => useContext(BoardContext);

export default function BoardContextProvider({ children }: {children: React.ReactNode}) {
  const [boards, setBoards] = useState<BoardProps[]>([]);

  const getBoards = async () => {
    const res = await fetch("http://localhost:8000/api/boards");
    const data = await res.json();

    if (!res.ok) {
      console.error("Failed to get data");
      return;
    }

    setBoards(data);
    console.log(data);
  };

  useEffect(() => {
    getBoards()
  }, [])

  return (
    <BoardContext.Provider value={{ boards }}>
      {" "}
      {children}{" "}
    </BoardContext.Provider>
  );
}
