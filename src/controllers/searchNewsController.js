const NewsApiGenerator = require('../helpers/newsApiGenerator')

const searchAllNews = (req, resp) => NewsApiGenerator.call(req, resp)

module.exports = searchAllNews