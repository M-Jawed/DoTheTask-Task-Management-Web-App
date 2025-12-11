import type { Request, Response } from "express";

export async function getColumns(req: Request, res: Response){
    const {boardId} = req.params
    console.log(boardId)
    res.status(200).json({message: `Board id is ${boardId}`})
}