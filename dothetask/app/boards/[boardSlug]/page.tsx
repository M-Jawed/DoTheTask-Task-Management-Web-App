import Column from "@/app/components/Column"
import getBoardDataBySlug from "@/app/utils/getBoardDataBySlug"
import type { BoardProps } from "@/app/components/SideNav"
import Board from "@/app/components/Board"

export default async function boardSlug({params} : {params: Promise<{boardSlug: string}>}){
    const {boardSlug} = await params
    const currentBoard = await getBoardDataBySlug(boardSlug)
    let getCurrentColumns
    
    try {
        if(currentBoard.success){
            
            const res = await fetch(`http://localhost:8000/api/columns/${currentBoard.board.id}`)

            if(!res.ok){
                console.error('Failed to get columns')
                return
            }

            const data = await res.json()
            getCurrentColumns = data
        }
    } catch(err){
        console.error(err)
    }
    console.log('Current column data is: ', getCurrentColumns)
    return (
        <section className="w-full flex flex-col items-center">
            <Board boardSlug={boardSlug} />
        </section>
    )
}