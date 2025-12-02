import express from 'express'
import type { Router } from 'express'
import { getBoards } from '../controllers/boardController'

export const boardRouter: Router= express.Router()

boardRouter.get('/boards', getBoards)