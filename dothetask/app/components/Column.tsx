'use client'

import type { Columns } from "./Board"
import Task from "./Task"
import type { TaskProps } from "./Task"
import { useBoard } from "./BoardContextProvider"
import { useEffect } from "react"

export default function Column({item}: {item: Columns}){
    const {tasks} = useBoard()

    const columnTasks = tasks.filter((task: TaskProps) => task.column_id === item.id)
    const tasksLength = columnTasks.length

    useEffect(() => {
        console.log(columnTasks)
    }, [])

    return (
        <div className="min-w-[300px] shrink-0 h-full px-2 py-2">
            <h1 className="mb-5 text-gray-400 font-medium tracking-widest"> {item.name} ({tasksLength}) </h1>
            <div className="w-full h-full">
                {columnTasks.length > 0 && columnTasks.map((item: TaskProps) => <Task key={item.id} task={item} />)}
            </div>
        </div>
    )
}