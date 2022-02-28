const express = require('express')
const router = express.Router()

const AnswerController = require('../controllers/answerController')

router.post('/:form/:email', AnswerController.getAnswer, AnswerController.save)

module.exports = router