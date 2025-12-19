import type { Columns } from "./Board"

export default function Column({item}: {item: Columns}){
    return (
        <div className="min-w-[300px] shrink-0 h-full px-2 py-2">
            <h1> {item.name} </h1>
            <div>
                <h1>Tasks goes here</h1>
            </div>
        </div>
    )
}