"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.columnRouter = void 0;
const express_1 = __importDefault(require("express"));
const columnController_1 = require("../controllers/columnController");
exports.columnRouter = express_1.default.Router();
exports.columnRouter.delete('/columns/deleteColumn/:columnId', columnController_1.deleteColumn);
exports.columnRouter.post('/columns/newColumn', columnController_1.addNewColumn);
exports.columnRouter.get('/columns/:boardId', columnController_1.getColumns);
//# sourceMappingURL=columnRouter.js.map