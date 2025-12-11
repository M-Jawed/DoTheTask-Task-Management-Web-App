import supabase from "@/supabase-client";
import type { BoardProps } from "../components/SideNav";

type BoardResulst = {success: true, board: BoardProps} | {success: false, message: string}

const getBoardDataBySlug = async (boardSlug: string): Promise<BoardResulst> => {
    if(!boardSlug) return {success: false, message: 'Please provide a board slug'}
    const {error, data} = await supabase.from('boards').select('*').eq("slug", boardSlug).single()
    if(error){
        return {success: false, message: `Failed to get the board with the slug ${boardSlug}`}
    }
    return {success: true, board: data as unknown as BoardProps}
}

export default getBoardDataBySlug