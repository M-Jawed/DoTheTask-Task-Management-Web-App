"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
exports.taskRouter = express_1.default.Router();
exports.taskRouter.get('/tasks', taskController_1.getTasks);
exports.taskRouter.post('/tasks/newTask', taskController_1.addNewTask);
exports.taskRouter.post('/tasks/edit', taskController_1.editTask);
exports.taskRouter.delete('/tasks/delete/:id', taskController_1.deleteTask);
//# sourceMappingURL=taskRouter.js.map