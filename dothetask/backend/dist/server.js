"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
const boardRouter_1 = require("./routes/boardRouter");
const columnRouter_1 = require("./routes/columnRouter");
const taskRouter_1 = require("./routes/taskRouter");
const PORT = 8001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', boardRouter_1.boardRouter);
app.use('/api', columnRouter_1.columnRouter);
app.use('/api', taskRouter_1.taskRouter);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//# sourceMappingURL=server.js.map