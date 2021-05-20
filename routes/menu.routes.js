const csv = require('@fast-csv/parse')
const { Router } = require('express')
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const Menu = require('../model/Menu')
const router = Router()
const config = require('config')
const shortid = require('shortid')

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
// , fileFilter: fileFilter
router.use(multer({ storage: storageConfig, fileFilter: fileFilter }).single("file"))

router.post('/generate', async (req, res, next) => {
    try {
        const filedata = req.file // сохранил файл в переменную 
        let dirtySheetArray = []
        let sheetArray = [] // Массив, в который будет записываться меню в виде объекта
        //Если файла нет, то скорее всего его файл не прошел фильтр
        if (!filedata) {
            return res.status(400).json({ error: 'Пожалуйста, используйте именно формат .csv' })
        }

        fs.createReadStream(path.resolve(__dirname, '', `${filedata.filename}`))
            .pipe(csv.parse())
            .on('error', error => console.error(error))
            .on('data', row => { sheetArray.push(row);/* console.log(row); */ })
            .on('close', err => console.log("stream has been destroyed"))
        await sleep(100)
        console.log(sheetArray) //Здесь должен быть по хорошему массив из объектов
        fs.unlinkSync(`./routes/${filedata.filename}`)
        await sleep(100)
        const baseUrl = config.get('baseUrl')
        const code = shortid.generate()
        const menuUri = baseUrl + '/menu/' + code
        const title = filedata.filename.split('.csv')[0]
        const menu = new Menu({
            title, codeMenu: code, menuUri, sheetArray
        })
        await sleep(100)
        await menu.save()
        res.status(201).json({ title, code, data: menu, sheetArray, })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something wrong" })
    }
})

// router.get('/menu/all', async (req, res) => {
//     try {
//         const menu = await Menu.find()
//         if (!menu || menu.length == 0) {
//             res.status(400).json({error: "db was empty"})
//             return
//         }
//         res.json({ menus: menu })
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).json({ error: "something wrong" })
//     }
// })

// router.get('/menu/:code', async (req, res) => {
//     try {
//         const menu = await Menu.findOne({ codeMenu: req.params.code })
//         if (menu) {
//             menu.views++
//             await menu.save()
//             return res.json({ menu })
//         } else return res.status(404).json('menu not found')

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: "something wrong in server" })
//     }
// })

module.exports = router