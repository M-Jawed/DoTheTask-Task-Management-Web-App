import Column from "@/app/components/Column"
import getBoardDataBySlug from "@/app/utils/getBoardDataBySlug"
import type { BoardProps } from "@/app/components/SideNav"
import Board from "@/app/components/Board"

export default async function boardSlug({params} : {params: Promise<{boardSlug: string}>}){
    const {boardSlug} = await params
    return (
        <section className="w-full flex flex-col items-center h-screen overflow-y-auto scrollbar-hide">
            <Board boardSlug={boardSlug} />
        </section>
    )
}