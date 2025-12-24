'use client'

import { useBoard } from "../components/BoardContextProvider"
import { RiCloseLargeFill } from "react-icons/ri";


export default function PreviewTask(){
    const {currentTask, setPreviewTask} = useBoard()

    const closeModal = () => {
        setPreviewTask(false)
    }
    return (
        <section className='w-full h-screen inset-0 absolute bg-black/50 z-50 flex items-center justify-center'>
            <div className="w-[40%] h-[400px] flex flex-col items-start bg-white px-5 py-5 rounded-lg overflow-y-auto">
                <div className="w-full flex items-center justify-between ">
                    <h1 className="text-3xl font-medium mb-5">{currentTask?.name}</h1>
                    <button onClick={closeModal} className="hover:text-red-500 cursor-pointer"> <RiCloseLargeFill /> </button>
                </div>
                <p className="text-gray-500 text-sm font-medium mb-1">Description</p>
                <div className="w-full border-1 h-[600px] px-2 py-2 rounded-sm mb-4">{currentTask?.description}</div>
                <p className="text-gray-500 text-sm font-medium mb-1">Current Status</p>
                <input type="text" name="status" id="status" value={currentTask?.status} readOnly />
            </div>
        </section>
    )
}