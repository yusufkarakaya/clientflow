import express from 'express'
const app = express()

import healthRoutes from './routes/health.routes.js'

app.use(express.json())

app.use('/api/health', healthRoutes)

export default app
