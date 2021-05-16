const csv = require('@fast-csv/parse')
const { Router } = require('express')
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const { fileURLToPath } = require('url')
const Menu = require('../model/Menu')
const router = Router()
const config = require('config')
const shortid = require('shortid')
const { link } = require('fs/promises')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "routes")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    console.log(file.mimetype)
    if (file.mimetype === "text/csv"
        || file.mimetype === "text/csv-schema"
        || file.mimetype === "application/vnd.ms-excel"
        || file.mimetype === "application/vnd.ms-excel.addin.macroEnabled.12"
        || file.mimetype === "application/vnd.ms-excel.sheet.binary.macroEnabled.12"
        || file.mimetype === "application/vnd.ms-excel.sheet.macroEnabled.12"
        || file.mimetype === "application/vnd.ms-excel.template.macroEnabled.12"

    ) {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

router.use(multer({ storage: storageConfig, fileFilter: fileFilter }).single("filedata"))

router.post('/generate', async (req, res, next) => {
    try {
        const filedata = req.file
        let sheetArray = []
        console.log(filedata)
        if (!filedata) {
            return res.send('Пожалуйста, используйте именно формат .csv')
        }
        await sleep(100)
        fs.createReadStream(path.resolve(__dirname, '', `${filedata.filename}`))
            .pipe(csv.parse())
            .on('error', error => console.error(error))
            .on('data', row => sheetArray.push(row))
            .on('close', err => console.log("stream has been destroyed"))
        await sleep(100)
        console.log(sheetArray)
        fs.unlinkSync(`./routes/${filedata.filename}`)

        const baseUrl = config.get('baseUrl')
        const code = shortid.generate()
        const menuUri = baseUrl + '/menu/' + code
        const title = filedata.filename.split('.csv')[0]
        const menu = new Menu({
            title, codeMenu: code, menuUri, sheetArray
        })
        await menu.save()
        res.status(201).json({ title, code, data: menu, sheetArray, })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something wrong" })
    }
})

module.exports = router