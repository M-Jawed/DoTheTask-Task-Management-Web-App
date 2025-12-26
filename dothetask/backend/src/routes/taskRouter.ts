import express from 'express'
import type { Router } from 'express'
import { getTasks, addNewTask, editTask } from '../controllers/taskController'

export const taskRouter:Router = express.Router()

taskRouter.get('/tasks', getTasks)
taskRouter.post('/tasks/newTask', addNewTask)
taskRouter.post('/tasks/edit', editTask)