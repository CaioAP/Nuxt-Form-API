const mongoose = require('mongoose')

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    default: '',
  },
  numberOfQuestions: {
    type: Number,
    default: 1,
    min: 1,
  },
  numberOfAnswers: {
    type: Number,
    default: 0,
    min: 0,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Form', formSchema)