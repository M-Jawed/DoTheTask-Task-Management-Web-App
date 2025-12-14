import express from 'express'
import type { Router } from 'express'
import { getColumns, deleteColumn } from '../controllers/columnController'

export const columnRouter:Router = express.Router()

columnRouter.get('/columns/deleteColumn/:columnId', deleteColumn)
columnRouter.get('/columns/:boardId', getColumns)
