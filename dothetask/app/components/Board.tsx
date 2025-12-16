'use client'

import getBoardDataBySlug from "../utils/getBoardDataBySlug"
import type { BoardProps } from "./SideNav"
import { useState, useEffect } from "react"

export type Columns = {
    id: string
    created_at: string
    name: string
    order: number
    board_id: string
}

export default function Board({boardSlug}: {boardSlug: string}){
    const [columns, setColumns] =  useState<Columns[] | null>(null)
    const [board, setBoard] = useState<BoardProps | null>(null)
    const [errorMessage, setErrorMessage] = useState<string>('')
    
    const getCurrentBoard = async () => {
        const current = await getBoardDataBySlug(boardSlug)
        if(current.success){
            setBoard(current?.board)
            getCurrentBoardColumns(current?.board?.id)
        }
    }

    const getCurrentBoardColumns = async (boardId: string) => {
        const res = await fetch(`http://localhost:8001/api/columns/${boardId}`)
        if(!res.ok){
            setErrorMessage('Failed to get current board columns')
            return
        }
        const data = await res.json()
        setColumns(data)
    }

    useEffect(() => {
        getCurrentBoard()
    }, [boardSlug])

    useEffect(() => {
        getCurrentBoard()
    }, [columns])

    return (
        <section className="w-full flex flex-col items-center bg-gray-100 h-full px-5 py-2 overflow-y-auto overflow-x-auto scrollbar-hide">
            <div className={`flex gap-4 w-full px-5 py-2 h-full overflow-x-auto scrollbar-hide`}>
                {columns?.map((item) => (
                    <div key={item.id} className="min-w-[300px] shrink-0 h-full px-2 py-2"> 
                        <h1>{item.name}</h1>
                        <div>
                            
                        </div>
                    </div>
                ))}
                <div className="flex items-center justify-center h-full w-[20%]">
                    <button className="w-full h-full bg-gray-200 cursor-pointer text-xl font-medium text-gray-400 hover:bg-gray-300">+New Column</button>
                </div>
            </div>

        </section>
    )
}