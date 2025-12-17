import express from 'express'
import type { Router } from 'express'
import { getColumns, deleteColumn, addNewColumn } from '../controllers/columnController'

export const columnRouter:Router = express.Router()

columnRouter.delete('/columns/deleteColumn/:columnId', deleteColumn)
columnRouter.post('/columns/newColumn', addNewColumn)
columnRouter.get('/columns/:boardId', getColumns)
