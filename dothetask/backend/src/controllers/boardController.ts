import type { Request, Response } from "express";
import generateSlug from "../utils/generateSlug";
import supabase from "../supabase-client";

type BoardProps = {
    id: string
    created_at: string
    name: string
    slug: string
}

export async function getBoards(req: Request, res: Response<{message?: string} | BoardProps[]>) {
    try {
        const {error, data} = await supabase.from('boards').select('*')
        if(error){
            return res.status(400).json({message: error.message})
        }
        return res.status(200).json(data as BoardProps[])
    } catch(err){
        console.error(err)
        return res.status(400).json({message: 'Failed to get data'})
    }
}

export async function addNewBoard(req: Request, res: Response){
    const {name} = req.body
    const slug = generateSlug(name)
    
    try {
        const {error, data} = await supabase.from('boards').insert({name, slug})

        if(error){
            res.status(400).json({message: 'Failed to add new board'})
            return
        }

        res.status(201).json({message: 'Succesfuly created a new board'})
    } catch(err){
        return res.status(400).json({message: 'Failed to add a new board'})
    }
    
}