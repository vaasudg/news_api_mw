/**
 * Common function to call GET, POST methods, (This is not correct way for huge app, but still tried)
 * 
 */

const NewsAPI = require('newsapi')
const newsApi = new NewsAPI(process.env.NEWS_API)

const Utils = require('../utils')

class NewsApiGenerator {

    constructor() {
        this.endPoint = ''
    }

    async call(req, resp) {

        const { body: { q, sortBy = 'publishedAt' } } = req

        this.endPoint = Utils.endPoints(req.method, newsApi, resp)

        try {
            // Thit code may not be readable, let refactor on later this
            const { status, totalResults, articles } = await this.endPoint.url({
                country: this.endPoint.country,
                q: this.endPoint.name === 'POST' ? q : null,
                sortBy: this.endPoint.name === 'POST' ? sortBy : null,
                language: 'en',
                pageSize: this.endPoint.totalPageSize
            })

            if (status === 'ok') {
                resp.send({
                    totalResults,
                    size: articles && articles.length,
                    news: articles && articles.map(({ title, author, description, url, urlToImage, publishedAt, source: { name } }) => {
                        return {
                            title,
                            author: Utils.authorNameUtil(author, name),
                            description,
                            url,
                            urlToImage,
                            date: Utils.publishDateUtils(publishedAt)
                        }
                    })
                })

            } else {
                resp.status(400).send({
                    message: 'The server did not understand the request.'
                })
            }

        } catch (error) {

            resp.send({
                error: error.message + ' Please buy paid version'
            })

        }
    }
}

module.exports = new NewsApiGenerator()