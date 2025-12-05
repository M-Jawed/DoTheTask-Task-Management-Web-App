import express from 'express'
import type { Router } from 'express'
import { getBoards, addNewBoard } from '../controllers/boardController'

export const boardRouter: Router= express.Router()

boardRouter.get('/boards', getBoards)
boardRouter.post('/boards/addNewBoard', addNewBoard)