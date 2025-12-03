import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default async function Header(){
    return (
        <header className="w-full h-[90px] flex items-center">
            <div className="w-full flex items-center justify-between">
                <div>
                    <h1 className="font-medium text-3xl">Board title</h1>
                </div>
                <div className="w-[20%] flex items-center gap-2 px-2">
                    <button className="w-[65%] bg-[#4682B4] px-2 py-2 text-white rounded-lg text-lg font-medium cursor-pointer">Add new task</button>
                    <button className="w-[15%] py-2 px-[10px] bg-red-500 flex items-center justify-center text-xl rounded-lg cursor-pointer"> <MdDelete fill="white" /> </button>
                    <button className="w-[15%] py-2 px-[10px] bg-green-300 flex items-center justify-center text-xl rounded-lg cursor-pointer"> <FaEdit fill="white" /> </button>
                </div>
            </div>
        </header>
    )
}