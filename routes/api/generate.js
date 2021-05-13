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
    let sheetArray = []
    console.log(filedata)
    if (!filedata) {
        res.send('файла нету')
        return
    }
    if (filedata.originalname.includes('.csv')) {
        fs.rename(`./routes/api/${filedata.filename}`, `./routes/api/${filedata.filename}.csv`, err => {
            if (err) throw err
            console.log('renamed complete')
        })
        fs.createReadStream(path.resolve(__dirname, '', `${filedata.filename}.csv`))
            .pipe(csv.parse())
            .on('error', error => console.error(error))
            .on('data', row => sheetArray.push(row))

        setTimeout(() => {
            console.log(sheetArray)
            res.json({ sheet: sheetArray })
        }, 1000);
        fs.unlinkSync(`./routes/api/${filedata.filename}.csv`)
    } else {
        fs.unlinkSync(`./routes/api/${filedata.filename}.csv`)
        res.send('файл не .csv')
    }
})


export default router