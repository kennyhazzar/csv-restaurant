const express = require('express')
const generate = require('./routes/menu.routes')
const path = require('path')
const mongoose = require('mongoose')
const config = require('config')
const PORT = 3000
const menuFromId = require('./routes/id.routes')
let app = express()
// app.use(express.static(__dirname))
app.use('/api', generate)
app.use('/menu', menuFromId)

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT || 3000, () => console.log("i'm started"))
    } catch (error) {
        console.log(`Server error ${error.message}`)
        process.exit(1)
    }
}

start()