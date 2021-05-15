// import { Schema } from 'mongoose'
const { Schema, model } = require('mongoose')

const schema = new Schema({
    date: { type: Date, required: true, default: Date.now },
    views: { type: Number, default: 0 },
    codeMenu: { type: String, unique: true, required: true },
    sheetArray: { type: Array, unique: false, required: true },
    menuUri: {type: String, unique: true, required: true},
})

module.exports = model('Menu', schema)