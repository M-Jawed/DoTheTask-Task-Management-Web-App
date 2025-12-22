" use client ";

import Form from "next/form";
import { RiCloseLargeFill } from "react-icons/ri";
import { useBoard } from "../components/BoardContextProvider";
import type { Columns } from "../components/Board";
import { useActionState } from "react";

export type NewTaskProps = {
  name: string;
  description: string;
  status: string;
  column_id: string;
  message?: string
  success?: boolean
};

export default function NewTaskModal({
  newTaskModal,
  closeTaskModal,
}: {
  newTaskModal: boolean;
  closeTaskModal: () => void;
}) {
  const { columns } = useBoard();
  const handleNewTask = async (
    prevState: NewTaskProps,
    formData: FormData
  ): Promise<NewTaskProps> => {
    const name = formData.get("taskName") as string;
    const description = formData.get("taskDesc") as string;
    const status = formData.get("status") as string;
    const currentColumn = columns.find((item:Columns) => item.name === status)

    if(!name || !description) {
        return {...prevState, message: 'All fields are required', success: false}
    }

    if(!currentColumn) {
        console.error('Failed to find the column with the name of', status)
        return prevState
    }

    const column_id = currentColumn?.id

    const newTaskData = {
        name,
        description,
        status,
        column_id
    }

    try {
        const res = await fetch('http://localhost:8001/api/tasks/newTask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newTaskData)
        })
        if(!res.ok){
          console.error('Failed to send data')
          return {...prevState, message: 'Failed to send data', success: false}
        }
        const data = await res.json()
        console.log(data)

    } catch(err){
      console.error(err instanceof Error ? err.message : String(err))
    }

    return {name, description, status, column_id, message: 'Task created succesfully', success: true}
  };

  const [data, action, isPending] = useActionState<NewTaskProps, FormData>(
    handleNewTask,
    {name: '', description: '', status: '', column_id: ''}
  );
  return (
    <section className="w-full h-screen inset-0 absolute flex items-center justify-center bg-black/50 z-50">
      <div className="w-[40%] flex flex-col items-start bg-white rounded-lg px-6 py-10">
        <div className="w-full flex items-center justify-between px-3">
          <h1 className="text-xl font-medium">Add New Task</h1>
          <button
            type="button"
            className="cursor-pointer"
            onClick={closeTaskModal}
          >
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
            disabled={isPending}
          >
            {isPending ? 'Adding...' : 'Add Task'}
          </button>

          {data?.message ? <p className={`${data?.success ? 'text-green-500' : 'text-red-500'} font-lg mt-5 font-medium text-center w-full`}> {data.message} </p> : ''}
        </Form>
      </div>
    </section>
  );
}
