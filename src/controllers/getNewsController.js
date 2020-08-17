const NewsApiGenerator = require('../helpers/newsApiGenerator')

const getLatestNews = (req, resp) => NewsApiGenerator.call(req, resp)

module.exports = getLatestNews