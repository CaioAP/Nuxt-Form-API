const express = require('express')
const router = express.Router()

const QuestionController = require('../controllers/questionController')

router.get('/', QuestionController.findAll)

router.get('/:id', QuestionController.getQuestion, QuestionController.findOne)

router.post('/', QuestionController.insert)

router.delete('/:id', QuestionController.getQuestion, QuestionController.delete)

module.exports = router