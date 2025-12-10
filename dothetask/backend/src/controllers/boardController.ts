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

export async function deleteBoard(req: Request, res: Response){
    const {boardId} = req.params

    if(!boardId){
        return res.status(404).json({message: 'Failed to get boardId'})
    }

    try {
        const {error} = await supabase.from('boards').delete().eq("id", boardId)

        if(error){
            return res.status(404).json({message: 'Board with that id not found'})
        }

        res.status(200).json({message: 'Sucessfully deleted the board'})

    } catch(err){
        console.error(err)
        return
    }

}


export async function editBoard(req: Request, res: Response){
    const {name, currentBoard} = req.body
    const slug = generateSlug(name)
    try {
        const {error} = await supabase.from('boards').update({name, slug}).eq("id", currentBoard.id)
        if(error){
            return res.status(400).json({message: error.message})
        }
        res.status(200).json({message: 'Updated the board name'})
    } catch(err){
        return res.status(400).json({message: err})
    }
}