/**
 * 
 * Creating UTILS function as class because we may extend the function in the future
 * 
 */
const { country, totalPageSizeGet, totalPageSizePost, currentPage } = require('./constants')

class Utils {
    constructor() { }


    /**
     * 
     * Formating date as per UK magazine's format
     * ex: 17 Aug 2020, 08:26 PM
     * 
     */
    publishDateUtils(pDate) {
        if (!pDate) return null;

        const publishedDate = new Date(pDate)
        const formatedDate = {
            date: publishedDate.getDate(),
            month: publishedDate.toDateString().split(' ')[1],
            year: publishedDate.getFullYear(),
            time: publishedDate.toLocaleTimeString()
        }
        const { date, month, year, time } = formatedDate

        return `${date} ${month} ${year}, ${time}`
    }


    /**
     * Checking if author name is 'null' or mentioned the url instead of author's name
     * 
     * if both true get name from the source data
     *  
     * */
    authorNameUtil(author, name) {
        return !author ? name : author && (author.includes('http') || author === null) ? name : author
    }


    /**
     * 
     * @param {*} endPoint 
     * 
     * Single function to create multiple endpoints endPoints
     */
    endPoints(endPoint, newsApi, resp) {
        switch (endPoint) {
            case 'GET':
                return {
                    name: 'GET',
                    url: newsApi.v2.topHeadlines,
                    totalPageSize: totalPageSizeGet,
                    currentPage,
                    country
                }
            case 'POST':
                return {
                    name: 'POST',
                    url: newsApi.v2.everything,
                    totalPageSize: totalPageSizePost
                }

            default:
                return resp.status(404).send('Not Found')
        }
    }
}

module.exports = new Utils()