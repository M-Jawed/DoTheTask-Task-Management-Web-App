import express from 'express'
import type { Express } from 'express'
import type { Request, Response } from 'express'

const PORT: number = 8000

const app:Express = express()

app.get('/api/items', (req: Request, res: Response) => {
    res.send('Server works')
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))