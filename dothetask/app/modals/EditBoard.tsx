'use client'

import Form from "next/form"
import { useActionState, useEffect } from "react"
import type { BoardProps } from "../components/SideNav"
import { RiCloseLargeFill } from "react-icons/ri";
import { useState } from "react";
import { useBoard } from "../components/BoardContextProvider";
import { useRouter } from "next/navigation";
import type { Columns } from "../components/Board";
import EditColumns from "./EditColumns";

type EditBoard = {
    name: string
    currentBoard: BoardProps
    columns: Columns[]
}

type EditModalProps = {
    currentBoard: BoardProps
    editModal: boolean
    closeEditModal: () => void
    currentBoardColumns: Columns[]
    onColumnsChange: () => void
    
}

export default function EditBoard({currentBoard, editModal, closeEditModal, currentBoardColumns, onColumnsChange}: EditModalProps) {
    const [editFieldData, setEditFieldData] = useState('')
    const [columns, setColumns] = useState<Columns[]>([])
    const {getBoards} = useBoard()
    const router = useRouter()

    const handleEdit = async (prevState: {boardName: string}, formData: FormData): Promise<{ boardName: string, message?: string }> => {
        const boardName = formData.get('boardName') as string
        const boardData: EditBoard = {name: editFieldData, currentBoard, columns}

        try {
            if(!boardName || boardName.toLowerCase() === currentBoard.name.toLowerCase()){
                closeEditModal()
                return prevState
            }

            const res = await fetch(`http://localhost:8001/api/boards/editBoard`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(boardData)
            })
            if(!res.ok){
                return {...prevState, message: 'Failed to edit board'}
            }
            const data =  await res.json()
            await getBoards()
            console.log(data.message)

            if(data.slug){
                router.push(`/boards/${data.slug}`)
            }
        } catch(err){
            console.error(err)
        }

        return { boardName }
    }

    const [data, action, isPending] = useActionState<{boardName: string}, FormData>(handleEdit, {boardName: ""})

    const closeEdit = () => {
        closeEditModal()
    }

    return (
        <section className={editModal ? 'w-full h-screen inset-0 absolute flex items-center justify-center bg-black/50 z-50' : 'hidden'}>
            <div className="w-[40%] flex flex-col items-start bg-white px-10 py-10 rounded-lg">
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-xl font-medium">Edit Board</h1>
                    <RiCloseLargeFill className="hover:fill-red-500 cursor-pointer" onClick={closeEdit} />
                </div>

                <Form action={action} className="flex flex-col items-start mt-10 w-full">
                    <div className="w-full">
                    <label htmlFor="boardName" className="mb-5">Board Name</label>
                    <input type="text"
                    onChange={(e) => setEditFieldData(e.target.value)}
                    name="boardName"
                    id="boardName"
                    placeholder="Platform Launch"
                    className="w-full border-1 px-2 py-2 rounded-lg mt-2 outline-none"
                    defaultValue={currentBoard.name}
                     />
                    </div>
                    {currentBoardColumns && <EditColumns currentBoardColumns={currentBoardColumns} onChange={setColumns} onColumndsDelete={onColumnsChange} />}
                    <button type="submit" className="w-full text-center bg-[#4682B4] text-white font-medium text-xl py-2 mt-6 rounded-lg cursor-pointer">Save Changes</button>  
                </Form>
            </div>
        </section>
    )
}