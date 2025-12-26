'use client'

import getBoardDataBySlug from "../utils/getBoardDataBySlug"
import type { BoardProps } from "./SideNav"
import { useBoard } from "./BoardContextProvider"
import EditBoard from "../modals/EditBoard"
import Column from "./Column"
import PreviewTask from "../modals/PreviewTask"
import EditTask from "../modals/EditTask"
import DeleteTask from "../modals/DeleteTask"

export type Columns = {
    id: string
    created_at: string
    name: string
    order: number
    board_id: string
}

export default function Board({boardSlug}: {boardSlug: string}){
    const {editModal, activeBoard, columns, setEditModal, getCurrentBoardColumns, previewTask, currentTask, setToggleEditTask, toggleEditTask, deleteTaskModal} = useBoard()

    const showEditModal = () => {
        setEditModal(prev => !prev)
    }

    const hideEditModal = () => {
        setEditModal(false)
    }

    return (
        <section className="w-full flex flex-col items-center bg-gray-100 h-full px-5 py-2 overflow-y-auto overflow-x-auto scrollbar-hide">
            <div className={`flex gap-4 w-full px-5 py-2 h-full overflow-x-auto scrollbar-hide`}>
                {columns?.map((item) => <Column key={item.id} item={item} /> )}
                <div className="flex items-center justify-center h-full min-w-[150px]">
                    <button onClick={showEditModal} className="w-ful h-full bg-gray-200 px-3 cursor-pointer text-lg font-medium text-gray-400 hover:bg-gray-300">+New Column</button>
                </div>
            </div>
                {editModal ? <EditBoard currentBoard={activeBoard!} editModal={editModal} currentBoardColumns={columns} closeEditModal={hideEditModal} onColumnsChange={() => {
                    if(activeBoard) getCurrentBoardColumns(activeBoard.id)
                }} /> : ''}
                {previewTask ? <PreviewTask /> : ''}
                {toggleEditTask ? <EditTask task={currentTask!} /> : ''}
                {deleteTaskModal ? <DeleteTask /> : ''}
        </section>
    )
}