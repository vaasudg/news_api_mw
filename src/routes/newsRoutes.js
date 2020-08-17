const router = require('express').Router()

const getLatestNews = require('../controllers/getNewsController')
const searchAllNews = require('../controllers/searchNewsController')

router
    .get('/', (req, resp) => getLatestNews(req, resp))
    .post('/', (req, resp) => searchAllNews(req, resp))

module.exports = router