import csv from '@fast-csv/parse'
import { Router } from 'express'
import fs from 'fs'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = Router()
router.use(multer({ dest: "routes/api" }).single("filedata"))
router.post('/generate', (req, res, next) => {
    const filedata = req.file
    console.log(filedata)
    fs.rename(`./routes/api/${filedata.filename}`, `./routes/api/${filedata.originalname}`, err => {
        if (err) throw err
        console.log('renamed complete')
    })
    res.redirect('/')

})


export default router