import { config } from 'dotenv'

config()

import express from 'express'

const app = express()

import healthRoutes from './routes/health.routes.js'
import userRoutes from './routes/users.routes.js'

app.use(express.json())

app.use('/api/health', healthRoutes)

app.use('/api/users', userRoutes)

export default app
