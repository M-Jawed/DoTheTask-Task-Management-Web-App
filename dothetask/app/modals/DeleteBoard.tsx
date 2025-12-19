'use client'

import { useState } from "react"
import type { BoardProps } from "../components/SideNav"
import { useBoard } from "../components/BoardContextProvider"

export default function DeleteBoard({deleteModal, currentBoard, closeDeleteModal}: {deleteModal: boolean, currentBoard: BoardProps, closeDeleteModal: () => void}){
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const {getBoards} = useBoard()

    const handleDelete = async () => {
        if(!currentBoard){
            console.error('No active board found')
            return
        }
        
        const res = await fetch(`http://localhost:8001/api/boards/deleteBoard/${currentBoard.id}`, {method: 'DELETE'})
        const data = await res.json()

        if(!res.ok){
            console.error('Failed to delete the board')
            setErrorMessage(data.message)
            return
        }

        setSuccessMessage(data.message)
        await getBoards()
        closeDeleteModal()

    }

    const closeDelete = () => {
        closeDeleteModal()
    }
    return (
        <section className={deleteModal ? 'w-full h-screen absolute inset-0 flex items-center justify-center bg-black/50 z-50' : 'hidden'}>
            <div className="bg-white flex w-[50%] items-center px-10 py-6 rounded-lg">
            <div className="w-full flex flex-col items-start">
                <h1 className="text-red-500 text-xl font-medium mb-5">Delete this board?</h1>
                <p className="mb-5 text-sm text-gray-500">Are you sure you wanna delete this platform-launch board? This action will permanently delete the board and is not reverseable.</p>

                <div className="flex items-center justify-center w-full">
                    <div className="w-[40%] flex gap-5 items-center justify-between">
                        <button onClick={handleDelete} className="bg-red-400 text-white px-10 py-3 rounded-lg cursor-pointer hover:bg-red-600">Delete</button>
                        <button onClick={closeDelete} className="bg-blue-100 px-10 py-3 rounded-lg cursor-pointer hover:bg-blue-300">Cancel</button>
                    </div>
                </div>
            </div>
            </div>
        </section>
    )
}