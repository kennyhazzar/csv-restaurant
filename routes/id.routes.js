const { Router } = require('express')
const Menu = require('../model/Menu')
const router = Router()

router.get('/all', async (req, res) => {
    try {
        const menu = await Menu.find()
        if (!menu || menu.length == 0) {
            res.status(404).json({error: "menus was not found"})
            return
        }
        res.json({ menus: menu })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "something wrong" })
    }
})

router.get('/:code', async (req, res) => {
    try {
        const menu = await Menu.findOne({ codeMenu: req.params.code })
        if (menu) {
            menu.views++
            await menu.save()
            return res.json({ menu })
        } else return res.status(404).json({error: 'menu not found'})

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "something wrong in server" })
    }
})

module.exports = router