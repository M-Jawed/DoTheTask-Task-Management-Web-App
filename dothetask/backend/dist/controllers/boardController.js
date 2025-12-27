"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoards = getBoards;
exports.addNewBoard = addNewBoard;
exports.deleteBoard = deleteBoard;
exports.editBoard = editBoard;
const generateSlug_1 = __importDefault(require("../utils/generateSlug"));
const supabase_client_1 = __importDefault(require("../supabase-client"));
async function getBoards(req, res) {
    try {
        const { error, data } = await supabase_client_1.default.from("boards").select("*");
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(200).json(data);
    }
    catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Failed to get data" });
    }
}
async function addNewBoard(req, res) {
    const { name } = req.body;
    const slug = (0, generateSlug_1.default)(name);
    try {
        const { error } = await supabase_client_1.default
            .from("boards")
            .insert({ name, slug });
        if (error) {
            res.status(400).json({ message: "Failed to add new board" });
            return;
        }
        res.status(201).json({ message: "Succesfuly created a new board" });
    }
    catch (err) {
        return res.status(400).json({ message: "Failed to add a new board" });
    }
}
async function deleteBoard(req, res) {
    const { boardId } = req.params;
    if (!boardId) {
        return res.status(404).json({ message: "Failed to get boardId" });
    }
    try {
        const { error } = await supabase_client_1.default.from("boards").delete().eq("id", boardId);
        if (error) {
            return res.status(404).json({ message: "Board with that id not found" });
        }
        res.status(200).json({ message: "Sucessfully deleted the board" });
    }
    catch (err) {
        console.error(err);
        return;
    }
}
async function editBoard(req, res) {
    const { name, currentBoard, columns } = req.body;
    const slug = (0, generateSlug_1.default)(name);
    try {
        if (columns && Array.isArray(columns)) {
            for (let col of columns) {
                const { id, name } = col;
                const { error } = await supabase_client_1.default
                    .from("columns")
                    .update({ name })
                    .eq("id", id);
                if (error) {
                    console.error(error);
                    return;
                }
            }
        }
        const { error } = await supabase_client_1.default
            .from("boards")
            .update({ name, slug })
            .eq("id", currentBoard.id);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        res.status(200).json({ message: "Updated the board name", slug });
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}
//# sourceMappingURL=boardController.js.map