const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
  formId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  answers: {
    type: Array,
    required: true,
  },
})

module.exports = mongoose.model('Answer', answerSchema)