require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(cors())
app.use(express.json())

const formsRouter = require('./routes/forms')
const questionsRouter = require('./routes/questions')
const answersRouter = require('./routes/answers')
app.use('/forms', formsRouter)
app.use('/questions', questionsRouter)
app.use('/answers', answersRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))