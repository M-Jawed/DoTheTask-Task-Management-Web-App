'use client'

import getBoardDataBySlug from "../utils/getBoardDataBySlug"
import type { BoardProps } from "./SideNav"
import { useBoard } from "./BoardContextProvider"
import EditBoard from "../modals/EditBoard"

export type Columns = {
    id: string
    created_at: string
    name: string
    order: number
    board_id: string
}

export default function Board({boardSlug}: {boardSlug: string}){
    const {editModal, activeBoard, columns, setEditModal, getCurrentBoardColumns} = useBoard()

    const showEditModal = () => {
        setEditModal(prev => !prev)
    }

    const hideEditModal = () => {
        setEditModal(false)
    }

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
                    <button onClick={showEditModal} className="w-full h-full bg-gray-200 cursor-pointer text-xl font-medium text-gray-400 hover:bg-gray-300">+New Column</button>
                </div>
            </div>
                {editModal ? <EditBoard currentBoard={activeBoard!} editModal={editModal} currentBoardColumns={columns} closeEditModal={hideEditModal} onColumnsChange={() => {
                    if(activeBoard) getCurrentBoardColumns(activeBoard.id)
                }} /> : ''}
        </section>
    )
}