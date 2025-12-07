"use client";

import { createContext, useContext, useState, useEffect } from "react";
import React from "react";
import type { BoardProps } from "./SideNav";
import supabase from "@/backend/src/supabase-client";

type BoardContextProps = {
  boards: BoardProps[];
  activeBoard: BoardProps | null;
  setActiveBoard: (board: BoardProps | null) => void;
};

export const BoardContext = createContext<BoardContextProps | null>(null);
export const useBoard = () => useContext(BoardContext);

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

    const current = data.find(
      (item: BoardProps) => item.slug.toLowerCase() === boardSlug!.toLowerCase()
    );
    setActiveBoard(current ?? null);
    console.log(current);
  };

  useEffect(() => {
    const channel = supabase
      .channel("boards-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "switch", table: "boards" },
        (payload) => {
          getBoards();
        }
      )
      .subscribe();

      return () => {
        supabase.removeChannel(channel)
      }
  }, []);

  return (
    <BoardContext.Provider value={{ boards, activeBoard, setActiveBoard }}>
      {" "}
      {children}{" "}
    </BoardContext.Provider>
  );
}
