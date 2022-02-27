const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  formId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  possibleAnswers: {
    type: Array,
    required: true,
  },
})

module.exports = mongoose.model('Question', questionSchema)