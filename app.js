import express from 'express'
import generate from './routes/api/generate.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let app = express()
app.use(express.static(__dirname))
app.use('/api', generate)

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
  })

app.listen(3000, () => console.log("i'm started"))