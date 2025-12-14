import express from 'express'
import type { Router } from 'express'
import { getColumns } from '../controllers/columnController'

export const columnRouter:Router = express.Router()

columnRouter.get('/columns/:boardId', getColumns)
