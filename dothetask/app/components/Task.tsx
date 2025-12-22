export type TaskProps = {
    id: string
    created_at: string
    name: string
    description: string
    status: string
    order: number
    column_id: string
}

export default function Task({task}: {task: TaskProps}) {
    return (
        <div className="w-full flex flex-col items-start px-2 py-2 border-1 mb-3">
            <h1> {task.name} </h1>
            <p> {task.description} </p>
        </div>
    )
}