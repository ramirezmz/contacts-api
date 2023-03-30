import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const URL = process.env.URL || 'http://localhost'

app.use(express.json())

app.listen(PORT, () => {
  console.log(`Server is running on port ${URL}:${PORT}`)
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})