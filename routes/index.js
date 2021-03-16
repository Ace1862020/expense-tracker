// index.js 總路由
const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const records = require('./modules/records')
const users = require('./modules/users')

router.use('/', home) //首頁路由
router.use('/records', records) //紀錄路由
router.use('/users', users)

module.exports = router