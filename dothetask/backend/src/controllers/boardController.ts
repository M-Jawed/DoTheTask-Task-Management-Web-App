import type { Request, Response } from "express";
import supabase from "../supabase-client";

export async function getBoards(req: Request, res: Response) {
    try {
        const {error, data} = await supabase.from('boards').select('*')
        if(error){
            return res.status(400).json({message: error})
        }

        return res.status(200).json(data)
    } catch(err){

    }
}   