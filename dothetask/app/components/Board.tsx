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
        const res = await fetch(`http://localhost:8000/api/columns/${boardId}`)
        if(!res.ok){
            setErrorMessage('Failed to get current board columns')
            return
        }
        const data = await res.json()
        console.log(data)
        setColumns(data)
    }

    useEffect(() => {
        getCurrentBoard()
    }, [boardSlug])

    return (
        <h1>This is the board page</h1>
    )
}