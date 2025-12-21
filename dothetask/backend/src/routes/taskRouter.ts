import express from 'express'
import type { Router } from 'express'
import { getTasks } from '../controllers/taskController'

export const taskRouter:Router = express.Router()

taskRouter.get('/tasks', getTasks)