const { Router } = require('express')
const Menu = require('../model/Menu')
const router = Router()

router.get('/:code', async (req, res) => {
    try {
        const menu = await Menu.findOne({ code: req.params.codeMenu })
        if (menu) {
            menu.views++
            await menu.save()
            return res.json({ menu })
        } else res.status(404).json('menu not found')
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something wrong in server" })
    }
})

module.exports = router