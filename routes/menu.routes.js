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

router.use(multer({ dest: "routes" }).single("filedata"))

router.post('/generate', async (req, res, next) => {
    try {
        const filedata = req.file
        let sheetArray = []
        // console.log(filedata)
        if (!filedata) {
            res.send('файла нету')
            return
        }
        if (filedata.originalname.includes('.csv')) {
            await sleep(100)
            fs.rename(`./routes/${filedata.filename}`, `./routes/${filedata.filename}.csv`, err => {
                if (err) throw err
                console.log('renamed complete')
            })
            await sleep(100)
            fs.createReadStream(path.resolve(__dirname, '', `${filedata.filename}.csv`))
                .pipe(csv.parse())
                .on('error', error => console.error(error))
                .on('data', row => sheetArray.push(row))
                .on('close', err => console.log("stream has been destroyed"))
            await sleep(100)
            console.log(sheetArray)
            fs.unlinkSync(`./routes/${filedata.filename}.csv`)
        } else {
            fs.unlinkSync(`./routes/${filedata.filename}.csv`)
            res.send('файл не .csv')
        }

        const baseUrl = config.get('baseUrl')
        const code = shortid.generate()
        // console.log(code)
        // const existing = await Menu.findOne({})

        const menuUri = baseUrl + '/' + code
        const menu = new Menu({
            codeMenu: code, menuUri, sheetArray
        })

        await menu.save()
        res.status(201).json({ code, data: menu, sheetArray, })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something wrong" })
    }
})

module.exports = router