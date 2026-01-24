"use client";

import { useState } from "react";
import type { BoardProps } from "../components/SideNav";
import { useBoard } from "../components/BoardContextProvider";
import { useDarkMode } from "../components/DarkModeProvider";
import { useRouter } from "next/navigation";

export default function DeleteBoard({
  deleteModal,
  currentBoard,
  closeDeleteModal,
}: {
  deleteModal: boolean;
  currentBoard: BoardProps;
  closeDeleteModal: () => void;
}) {
  const { getBoards, boards } = useBoard();
  const { darkMode } = useDarkMode();
  const router = useRouter();

  const handleDelete = async () => {
    if (!currentBoard) {
      console.error("No active board found");
      return;
    }

    try {
      const { id } = currentBoard;
      const res = await fetch(
        `http://localhost:8001/api/boards/deleteBoard/${id}`,
        { method: "DELETE" },
      );
      const data = await res.json();

      if (res.status === 200) {
        getBoards();
        closeDeleteModal();
        router.push(`/boards/${boards[0].slug}`);
      }

      if (res.status === 404) {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error instanceof Error && error.message);
    }
  };

  const closeDelete = () => {
    closeDeleteModal();
  };
  return (
    <section
      className={
        deleteModal
          ? "w-full h-screen absolute inset-0 flex items-center justify-center bg-black/50 z-50"
          : "hidden"
      }
    >
      <div
        className={`${darkMode ? "bg-[#222831] text-white" : "bg-white"} flex w-[50%] items-center px-10 py-6 rounded-lg`}
      >
        <div className="w-full flex flex-col items-start">
          <h1 className="text-red-500 text-xl font-medium mb-5">
            Delete this board?
          </h1>
          <p
            className={`mb-5 text-sm ${darkMode ? "font-medium text-gray-300" : "text-gray-500"} `}
          >
            Are you sure you wanna delete this platform-launch board? This
            action will permanently delete the board and is not reverseable.
          </p>

          <div className="flex items-center justify-center w-full">
            <div className="w-[40%] flex gap-5 items-center justify-between">
              <button
                onClick={handleDelete}
                className="bg-red-400 text-white px-10 py-3 rounded-lg cursor-pointer hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={closeDelete}
                className={`${darkMode ? "bg-blue-300" : "bg-blue-100"} px-10 py-3 rounded-lg cursor-pointer hover:bg-blue-400`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
