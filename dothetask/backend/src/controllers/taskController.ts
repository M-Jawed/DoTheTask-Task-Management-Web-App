import type { Request, Response } from "express";
import supabase from "../supabase-client";

type Tasks = {
    id: string
    created_at: string
    column_id: string
    name: string
    description: string
    status: string
    order: number
}

export async function getTasks(req: Request, res: Response<Tasks[] | {message: string}>) {
  try {
    const { error, data } = await supabase.from("tasks").select("*");
    if (error) {
      return res
        .status(400)
        .json({ message: "Failed to fetch data from the supabase" });
    }
    console.log(data)
    res.status(200).json(data as Tasks[])
  } catch (err) {
    return res.status(400).json({message: err instanceof Error ? err.message : String(err)})
  }
}

export async function addNewTask(req: Request, res: Response) {
    
}
