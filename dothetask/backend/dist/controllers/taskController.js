"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasks = getTasks;
exports.addNewTask = addNewTask;
exports.editTask = editTask;
exports.deleteTask = deleteTask;
const supabase_client_1 = __importDefault(require("../supabase-client"));
async function getTasks(req, res) {
    try {
        const { error, data } = await supabase_client_1.default.from("tasks").select("*");
        if (error) {
            return res
                .status(400)
                .json({ message: "Failed to fetch data from the supabase" });
        }
        res.status(200).json(data);
    }
    catch (err) {
        return res.status(400).json({ message: err instanceof Error ? err.message : String(err) });
    }
}
async function addNewTask(req, res) {
    const { name, description, status, column_id } = req.body;
    try {
        const { error } = await supabase_client_1.default.from('tasks').insert({ name, description, status, column_id });
        if (error) {
            return res.status(400).json({ message: 'Failed to insert the data to the supabase table' });
        }
        res.status(200).json({ message: 'Succesfully inserted new data to the supabase table' });
    }
    catch (err) {
        return res.status(400).json({ message: err instanceof Error ? err.message : String(err) });
    }
}
async function editTask(req, res) {
    const { name, description, status, taskId: id, boardId } = req.body;
    if (!name || !description || !status) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (!id) {
        return res.status(400).json({ message: 'Task id is invalid' });
    }
    try {
        const { data: column, error: columnError } = await supabase_client_1.default.from('columns').select('id').eq('name', status).eq('board_id', boardId).single();
        if (columnError || !column) {
            return res.status(400).json({ message: 'Invalid status.' });
        }
        const { error } = await supabase_client_1.default.from('tasks').update({ name, description, status, column_id: column.id }).eq('id', id);
        if (error) {
            return res.status(400).json({ message: 'Failed to edit task' });
        }
        res.status(200).json({ message: 'Task updated succesfully' });
    }
    catch (err) {
        return res.status(400).json({ message: err instanceof Error ? err.message : String(err) });
    }
}
async function deleteTask(req, res) {
    const { id } = req.params;
    try {
        const { error } = await supabase_client_1.default.from('tasks').delete().eq('id', id);
        if (error) {
            return res.status(400).json({ message: 'Failed to delete the task' });
        }
        res.status(200).json({ message: 'Task deleted succesfully' });
    }
    catch (err) {
        return res.status(400).json({ message: err instanceof Error ? err.message : String(err) });
    }
}
//# sourceMappingURL=taskController.js.map