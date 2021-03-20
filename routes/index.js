// index.js 總路由
const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const records = require('./modules/records')
const filters = require('./modules/filters')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')

router.use('/records', authenticator, records) //紀錄路由
router.use('/filters', authenticator, filters)
router.use('/users', users)
router.use('/', authenticator, home) //首頁路由

module.exports = router