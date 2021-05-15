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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

router.use(multer({ dest: "routes" }).single("filedata"))

router.post('/test_generate', async (req, res, next) => {
    try {
        

        /** 
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
        */
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something wrong" })
    }
})

module.exports = router