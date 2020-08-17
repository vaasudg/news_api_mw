const express = require('express')
const cors = require('cors')

const app = express()
require('dotenv').config()

app.use([express.json(), express.urlencoded({ extended: true }), cors()])

console.clear()

app.use('/api', require('./src/routes/newsRoutes'))

app.listen(process.env.PORT, console.log(`App starter @ http://localhost:${process.env.PORT}`))