const csv = require('@fast-csv/parse')
const { Router } = require('express')
const multer = require('multer')
const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

const uploadUserData = async (req, res, next) => {
    console.log(req.data)
}

router.post(
    '/test_generate',
    upload.single('csvFile'),
    uploadUserData
)



module.exports = router