import type { Request, Response } from "express";
import supabase from "../supabase-client";

export async function getColumns(req: Request, res: Response){
    const {boardId} = req.params
    try {
        const {error, data} = await supabase.from('columns').select('*').eq("board_id", boardId)
        if(error){
            return res.status(400).json({message: 'Board with that id not found'})
        }
        return res.status(200).json(data)
    } catch(err){
        return res.status(400).json({message: 'Failed to get columns'})
    }
}

export async function deleteColumn(req: Request, res: Response){
    const {columnId} = req.params
    console.log(columnId)
    try {
        const {error, data} = await supabase.from('columns').delete().eq("id", columnId).select()
        if(error){
            return res.status(400).json({message: 'Failed to delete the column', error})
        }

        if(data.length === 0){
            return res.json({message: 'Failed to delete row, RLS is enabled'})
        }
        res.status(200).json({message: 'Deleted the column', data})
    } catch(err){
        return res.status(400).json({message: 'Failed to delete the column', err})
    }
}