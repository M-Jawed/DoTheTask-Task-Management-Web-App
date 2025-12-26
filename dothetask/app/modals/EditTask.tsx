"use client";

import Form from "next/form";
import { RiCloseLargeFill } from "react-icons/ri";
import type { Columns } from "../components/Board";
import { useBoard } from "../components/BoardContextProvider";
import type { TaskProps } from "../components/Task";
import { useActionState } from "react";

type EditTaskProps = {
    name: string
    description: string
    status: string
    taskId: string
    message?: string
    success?: boolean
}

export default function EditTask({task}: {task: TaskProps}) {
  const { columns, setToggleEditTask, getAllTasks } = useBoard();


  const handleEdit = async (prevState: EditTaskProps, formData: FormData): Promise<EditTaskProps> => {
    const name = formData.get('taskName')
    const description = formData.get('taskDesc')
    const status = formData.get('status')
    const taskId = task.id

    const editTaskObj = {
        name, 
        description,
        status,
        taskId
    }

    if(!name || !description || !status){
      return {...prevState, message: 'All fields are required', success: false}
    }

    try {
      const res = await fetch('http://localhost:8001/api/tasks/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editTaskObj)
      })
      if(!res.ok){
        console.error('Failed send data to the route')
        return {...prevState, message: 'Failed to send data to the route', success: false}
      }
      const data = await res.json()
      console.log(data)
      await getAllTasks()
    } catch(err){
      console.error(err instanceof Error ? err.message : String(err))
    }

    return {name: '', description: '', status: '', taskId: ''}
  }

  const [data, action, isPending] = useActionState<EditTaskProps, FormData>(handleEdit, {name: '', description: '', status: '', taskId: ''})
  const closeEditTask = () => {
    setToggleEditTask(false)
  }
  return (
    <section className="w-full h-screen inset-0 absolute flex items-center justify-center bg-black/50 z-50">
      <div className="w-[40%] flex flex-col items-start bg-white rounded-lg shadow-lg px-6 py-10">
        <div className="w-full flex items-center justify-between px-3">
          <h1 className="text-xl font-medium">Edit Task</h1>
          <button onClick={closeEditTask} type="button" className="cursor-pointer">
            {" "}
            <RiCloseLargeFill className="hover:fill-red-500" />{" "}
          </button>
        </div>

        <Form
          action={action}
          className="w-full flex flex-col items-start px-2 mt-10"
        >
          <label
            htmlFor="taskName"
            className="text-sm text-gray-400 font-medium mb-2"
          >
            Task Name
          </label>
          <input
            type="text"
            name="taskName"
            id="taskName"
            placeholder="Wash the dishes"
            className="border-1 px-2 py-2 w-full rounded-sm outline-none mb-5"
            defaultValue={task.name}
          />

          <label
            htmlFor="taskDesc"
            className="text-sm text-gray-400 font-medium mb-2"
          >
            Description
          </label>
          <textarea
            name="taskDesc"
            id="taskDesc"
            className="border-1 px-2 py-2 w-full rounded-sm outline-none mb-5"
            defaultValue={task.description}
          ></textarea>

          <label
            htmlFor="status"
            className="text-sm text-gray-400 font-medium mb-2"
          >
            Status
          </label>
          <select
            name="status"
            id="status"
            className="w-full px-2 py-2 border-1 rounded-sm"
            defaultValue={task.status}
          >
            {columns.map((item: Columns) => (
              <option key={item.id} value={item.name}> 
                {item.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-[#4682B4] py-2 rounded-sm text-white font-medium mt-5 cursor-pointer"
          >
            {"Save changes"}
          </button>

          {data?.message ? <p className={`${data?.success ? 'text-green-500' : 'text-red-500'} font-lg mt-5 font-medium text-center w-full`}> {data.message} </p> : ''}
        </Form>
      </div>
    </section>
  );
}
