'use client'

import { useBoard } from "../components/BoardContextProvider"
import { RiCloseLargeFill } from "react-icons/ri";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useState } from "react";


export default function PreviewTask(){
    const [taskOptionsModal, setTaskOptionsModal] = useState<boolean>(false)
    const {currentTask, setPreviewTask, setToggleEditTask} = useBoard()

    const closeModal = () => {
        setPreviewTask(false)
    }

    const showTaskOptions = () => {
        setTaskOptionsModal(prev => !prev)
    }

    const toggleEditTask = () => {
        setToggleEditTask(prev => !prev)
        closeModal()
    }
    return (
        <section className='w-full h-screen inset-0 absolute bg-black/50 z-50 flex items-center justify-center'>
            <div className="w-[40%] h-[400px] flex flex-col items-start bg-white px-5 py-5 rounded-lg overflow-y-auto">
                <div className="relative w-full flex items-center justify-between ">
                    <h1 className="text-3xl font-medium mb-5">{currentTask?.name}</h1>
                    <div className="flex items-center gap-2">
                        <button onClick={closeModal} className="hover:text-red-500 cursor-pointer"> <RiCloseLargeFill size={20} /> </button>
                        <button onClick={showTaskOptions} className="cursor-pointer"> <HiOutlineDotsVertical size={20} /> </button>
                    </div>
                    {taskOptionsModal && (
                        <div className="absolute right-0 w-[30%] h-[100px] top-12 flex flex-col items-start px-2 py-2 rounded-lg bg-white shadow-xl">
                            <button onClick={toggleEditTask} className="w-full text-start px-2 py-2 cursor-pointer text-md">Edit Task</button>
                            <button className="w-full text-start px-2 py-2 text-md text-red-500 font-medium cursor-pointer">Delete Task</button>
                        </div>
                    )}
                </div>
                <p className="text-gray-500 text-sm font-medium mb-1">Description</p>
                <div className="w-full border-1 h-[600px] px-2 py-2 rounded-sm mb-4">{currentTask?.description}</div>
                <p className="text-gray-500 text-sm font-medium mb-1">Current Status</p>
                <input type="text" name="status" id="status" value={currentTask?.status} readOnly />
            </div>
        </section>
    )
}