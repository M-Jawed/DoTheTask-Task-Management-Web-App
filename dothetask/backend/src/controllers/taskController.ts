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
    res.status(200).json(data as Tasks[])
  } catch (err) {
    return res.status(400).json({message: err instanceof Error ? err.message : String(err)})
  }
}

export async function addNewTask(req: Request, res: Response<{message: string}>) {
  const {name, description, status, column_id} = req.body

  try {
    const {error} = await supabase.from('tasks').insert({name, description, status, column_id})
    
    if(error){
      return res.status(400).json({message: 'Failed to insert the data to the supabase table'})
    }

    res.status(200).json({message: 'Succesfully inserted new data to the supabase table'})
  } catch(err){
    return res.status(400).json({message: err instanceof Error ? err.message : String(err)})
  }
} 

export async function editTask(req:Request, res:Response<{message: string}>){
  const {name, description, status, taskId: id} = req.body

  if(!name || !description || !status) {
    return res.status(400).json({message: 'All fields are required'})
  }

  if(!id){
    return res.status(400).json({message: 'Task id is invalid'})
  }

  try {
    const {error} = await supabase.from('tasks').update({name, description, status}).eq('id', id)
    if(error){
      return res.status(400).json({message: 'Failed to edit task'})
    }
    res.status(200).json({message: 'Task updated succesfully'})
  } catch(err){
    return res.status(400).json({message: err instanceof Error ? err.message : String(err)})
  }
}


export async function deleteTask(req:Request, res:Response){
  const {id} = req.params

  try {
    const {error} = await supabase.from('tasks').delete().eq('id', id)
    if(error){
      return res.status(400).json({message: 'Failed to delete the task'})
    }
    res.status(200).json({message: 'Task deleted succesfully'})
  } catch(err){
    return res.status(400).json({message: err instanceof Error ? err.message : String(err)})
  }
}