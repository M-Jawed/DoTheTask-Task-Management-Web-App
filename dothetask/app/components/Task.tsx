'use client'

import { useEffect } from "react"
import { useBoard } from "./BoardContextProvider"
import { useDarkMode } from "./DarkModeProvider"

export type TaskProps = {
    id: string
    created_at: string
    name: string
    description: string
    status: string
    order: number
    column_id: string
}

export default function Task({task}: {task: TaskProps}) {
    const {setCurrentTask, setPreviewTask, currentTask} = useBoard()
    const {darkMode} = useDarkMode()

    const handlePreview = () => {
        setCurrentTask({...task})
        setPreviewTask(true)
    }

    return (
        <div onClick={() => handlePreview()} className={`w-[300px] ${darkMode ? 'bg-[#393E46] text-white' : 'bg-white'} h-[130px] flex flex-col items-start px-5 py-5 rounded-lg shadow-sm mb-3 overflow-hidden cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out`}>
            <h1 className="text-2xl font-medium mb-5 truncate w-full"> {task.name} </h1>
            <p className="text-sm line-clamp-2"> {task.description} </p>
        </div>
    )
}