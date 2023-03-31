import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './routes'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
const URL = process.env.URL || 'http://localhost'
const DB_NAME = process.env.DB_NAME || 'sistema-api-local'

mongoose.connect(`mongodb://localhost/${DB_NAME}`)

app.use(express.json())
app.use(router)
app.listen(PORT, () => {
  console.log(`Server is running on port ${URL}:${PORT} 🚀`)
})