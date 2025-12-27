"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColumns = getColumns;
exports.deleteColumn = deleteColumn;
exports.addNewColumn = addNewColumn;
const supabase_client_1 = __importDefault(require("../supabase-client"));
async function getColumns(req, res) {
    const { boardId } = req.params;
    try {
        const { error, data } = await supabase_client_1.default.from('columns').select('*').eq("board_id", boardId);
        if (error) {
            return res.status(400).json({ message: 'Board with that id not found' });
        }
        return res.status(200).json(data);
    }
    catch (err) {
        return res.status(400).json({ message: 'Failed to get columns' });
    }
}
async function deleteColumn(req, res) {
    const { columnId } = req.params;
    try {
        const { error, data } = await supabase_client_1.default.from('columns').delete().eq("id", columnId).select();
        if (error) {
            return res.status(400).json({ message: 'Failed to delete the column', error });
        }
        if (data.length === 0) {
            return res.json({ message: 'Failed to delete row, RLS is enabled' });
        }
        res.status(200).json({ message: 'Deleted the column', data });
    }
    catch (err) {
        return res.status(400).json({ message: 'Failed to delete the column', err });
    }
}
async function addNewColumn(req, res) {
    const { name, boardId: board_id } = req.body;
    try {
        const { error } = await supabase_client_1.default.from('columns').insert({ name, board_id });
        if (error) {
            return res.status(400).json({ message: 'Failed to add new column', error });
        }
        return res.status(200).json({ message: 'Added new column' });
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}
//# sourceMappingURL=columnController.js.map