"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardRouter = void 0;
const express_1 = __importDefault(require("express"));
const boardController_1 = require("../controllers/boardController");
exports.boardRouter = express_1.default.Router();
exports.boardRouter.get('/boards', boardController_1.getBoards);
exports.boardRouter.post('/boards/addNewBoard', boardController_1.addNewBoard);
exports.boardRouter.delete('/boards/deleteBoard/:boardId', boardController_1.deleteBoard);
exports.boardRouter.post('/boards/editBoard', boardController_1.editBoard);
//# sourceMappingURL=boardRouter.js.map