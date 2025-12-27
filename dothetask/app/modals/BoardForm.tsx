"use client";

import { useState, useActionState } from "react";
import Form from "next/form";
import { RiCloseLargeFill } from "react-icons/ri";
import { useBoard } from "../components/BoardContextProvider";
import { useDarkMode } from "../components/DarkModeProvider";

type BoardFormProps = {
  toggleForm?: boolean;
  closeBoardForm: () => void
  boardName: string;
};

export default function BoardForm({ toggleForm, closeBoardForm }: Omit<BoardFormProps, "boardName">) {
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [successMessage, setSuccessMessage] = useState<string>("")
    const {getBoards} = useBoard()
    const {darkMode} = useDarkMode()

  const handleNewBoardForm = async (prevData: any, formData: FormData) => {
    const boardName = formData.get("boardName");

    const formObj = {
      name: boardName,
    };

    try {
      const res = await fetch("http://localhost:8001/api/boards/addNewBoard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObj),
      });
      await getBoards()
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message)
        return;
      }
      console.log(data);
      setSuccessMessage(data.message)
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseBoardForm = () => {
    closeBoardForm()
  }

  const [data, action, isPending] = useActionState(
    handleNewBoardForm,
    undefined
  );
  return (
    <section
      className={` ${
        toggleForm
          ? "fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          : "hidden"
      }`}
      onClick={handleCloseBoardForm}
    >
      <div className={`${darkMode ? 'bg-[#222831] text-white' : 'bg-white'} w-[450px] h-[40%] py-10 px-6 rounded-xl`}
      onClick={e => e.stopPropagation()}>
      <div className="w-full flex items-center justify-between px-2">
        <h1 className="text-xl font-medium">Add a new board</h1>
        <button onClick={handleCloseBoardForm} className="hover:text-red-500 cursor-pointer">
          {" "}
          <RiCloseLargeFill />{" "}
        </button>
      </div>
      <Form
        action={action}
        className="px-2 mt-8 flex flex-col items-start [&_label]:text-sm"
      >
        <label htmlFor="boardName" className="font-bold text-gray-500">
          Board Name
        </label>
        <input
          type="text"
          name="boardName"
          id="boardName"
          placeholder="Platform Marketing"
          className="w-[90%] mt-2 border-1 rounded-lg px-2 py-2"
        />

        <button
          type="submit"
          className="w-full text-center mt-10 bg-[#4682B4] py-2 rounded-lg text-xl font-medium text-white cursor-pointer hover:bg-[#0077B6]"
          disabled={isPending}
        >
          {isPending ? 'Adding...' : 'Add'}
        </button>

        {errorMessage && <p className="text-red-500 mt-3 text-center font-medium text-sm w-full"> {errorMessage} </p>}
        {successMessage && <p className="text-green-500 mt-3 text-center font-medium text-sm w-full"> {successMessage} </p>}
      </Form>
      </div>
    </section>
  );
}
