'use client'

import { useBoard } from "../components/BoardContextProvider"

export default function PreviewTask(){
    const {currentTask, previewTask} = useBoard()
    return (
        <section className='w-full h-screen inset-0 absolute bg-black/50 z-50 flex items-center justify-center'>
            <div className="w-[40%] flex flex-col items-start bg-white px-5 py-5 rounded-lg">
                <h1>{currentTask?.name}</h1>
                <p>Description</p>
                <div>{currentTask?.description}</div>
                <p>Current Status</p>
                <input type="text" name="status" id="status" value={currentTask?.status} readOnly />
            </div>
        </section>
    )
}