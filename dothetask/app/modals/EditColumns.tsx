"use client";

import type { Columns } from "../components/Board";
import { RiCloseLargeFill } from "react-icons/ri";
import { useBoard } from "../components/BoardContextProvider";
import { useState } from "react";

type EditColumns = {
    currentBoardColumns: Columns[]
    onChange: (updated: Columns[]) => void
    onColumndsDelete: () => void
}

export default function EditColumns({currentBoardColumns, onChange, onColumndsDelete}: EditColumns) {

  const [newColumnInput, setNewColumnInput] = useState<boolean>(false)

  const {activeBoard, setNewColumnField} = useBoard()

  const handleEditColumns = async (id: string, name: string) => {
    onChange(currentBoardColumns.map((item: Columns) => item.id === id ? {...item, name} : item))
  };

  const handleDeleteColumn = async (columnId: string) => {
    console.log('Column id is ', columnId)
    const res = await fetch(`http://localhost:8001/api/columns/deleteColumn/${columnId}`, {method: "DELETE"})
    if(!res.ok){
      console.error('Failed to delete column')
      return
    }
    const data = await res.json()
    console.log('deleted column', data)

    onColumndsDelete()
  }

  const newColumn = () => {
    setNewColumnInput(prev => !prev)
  }

  return (
    <div className="flex flex-col flex-start mt-10 w-full">
      <h1 className="mb-2">Board Columns</h1>
      {currentBoardColumns.length > 0 ? currentBoardColumns.map((item: Columns) => (
        <div key={item.id} className="flex items-center justify-between w-full mb-3">
          <input
          onChange={(e) => handleEditColumns(item.id, e.target.value)}
            type="text"
            name="column"
            id="column"
            defaultValue={item.name}
            className="border-1 rounded-lg w-[90%] px-2 py-2 outline-none"
          />
          <button type="button" className="cursor-pointer" onClick={() => handleDeleteColumn(item.id)}>
            {" "}
            <RiCloseLargeFill className="hover:fill-red-500" />{" "}
          </button>
        </div>
      )) : <p className="text-center mt-5 mb-5 text-xl">No columns</p>}
      {newColumnInput && <input
        type="text"
        name="column"
        id="column"
        className="w-[90%] border-1 rounded-lg px-2 py-2 outline-none mb-3"
        onChange={(e) => setNewColumnField(prev => ({...prev, name:e.target.value, boardId: activeBoard!.id}))}
      />}
      <button type="button" className="w-[50%] text-center mx-auto hover:text-blue-500 cursor-pointer" onClick={newColumn}>+Add new column</button>
    </div>
  );
}
