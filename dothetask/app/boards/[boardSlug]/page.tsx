import Column from "@/app/components/Column"
import getBoardDataBySlug from "@/app/utils/getBoardDataBySlug"
import type { BoardProps } from "@/app/components/SideNav"

export default async function boardSlug({params} : {params: Promise<{boardSlug: string}>}){
    const {boardSlug} = await params
    const currentBoard = await getBoardDataBySlug(boardSlug)
    
    try {
        if(currentBoard.success){
            console.log(currentBoard.board.id)
            const res = await fetch(`http://localhost:8000/api/columns/${currentBoard.board.id}`)

            if(!res.ok){
                console.error('Failed to get columns')
                return
            }

            const data = await res.json()
            console.log(data)
        }
    } catch(err){
        console.error(err)
    }
    return (
        <section className="w-full flex flex-col items-center">
            <div className="w-full grid grid-cols-3">

            </div>
        </section>
    )
}