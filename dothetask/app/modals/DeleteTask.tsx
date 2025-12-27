'use client'

import { useBoard } from "../components/BoardContextProvider"
import { useDarkMode } from "../components/DarkModeProvider"

export default function DeleteTask(){
    const {currentTask, setPreviewTask, setDeleteTaskModal, getAllTasks} = useBoard()
    const {darkMode} = useDarkMode()

    const handleCancel = () => {
        setDeleteTaskModal(false)
        setPreviewTask(true)
    }

    const handleDelete = async () => {
        try {
            const res = await fetch(`http://localhost:8001/api/tasks/delete/${currentTask?.id}`, {method: 'DELETE'})
            if(!res.ok){
                console.error('Failed to delete task')
                return
            }
            const data = await res.json()
            await getAllTasks()
            setDeleteTaskModal(false)
        } catch(err){
            console.error(err instanceof Error ? err.message : String(err))
        }
    }
    return (
      <section className="w-full absolute h-screen inset-0 bg-black/50 flex items-center justify-center z-50 shadow-lg">
        <div className={`w-[30%] ${darkMode ? 'bg-[#222831] text-white' : 'bg-white'} flex flex-col items-start rounded-lg px-6 py-6`}>
            <div className="w-full flex flex-col items-start mb-5">
                <h1 className="text-red-500 text-2xl font-medium mb-4">Delete this task?</h1>
                <p className="text-gray-400 font-medium text-sm">Are you sure you want to delete "{currentTask?.name}" task? This action cannnot be reversed.</p>
            </div>

            <div className="w-full flex items-center justify-center gap-6">
                <button onClick={handleDelete} className={`text-red-500 ${darkMode ? 'bg-red-300 hover:bg-red-200 hover:text-red-600 ' : 'bg-red-200 hover:bg-red-300'} font-medium text-lg w-full py-2 rounded-lg cursor-pointer`}>Delete</button>
                <button onClick={handleCancel} className="w-full bg-gray-300 py-2 rounded-lg font-medium cursor-pointer hover:bg-gray-200">Cancel</button>
            </div>
        </div>
      </section>  
    )
}