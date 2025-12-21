import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path: path.resolve(__dirname, "../../.env")})
import type { Express } from 'express'
import type { Request, Response } from 'express'
import { boardRouter } from './routes/boardRouter'
import { columnRouter } from './routes/columnRouter'
import { taskRouter } from './routes/taskRouter'


const PORT: number = 8001

const app:Express = express()

app.use(cors())

app.use(express.json())


app.use('/api', boardRouter)
app.use('/api', columnRouter)
app.use('/api', taskRouter)


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))