const ObjectId = require('mongoose').Types.ObjectId
const QuestionController = require('./questionController')
const Form = require('../models/form')

exports.findAll = async (req, res) => {
  try {
    const forms = await Form.find()
    res.json(forms)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.findOne = async (req, res) => {
  try {
    const questions = await QuestionController.findByForm(res.form._id)

    if (!questions) {
      return res.status(400).json({ message: 'Cannot find form\'s questions' })
    }

    res.json({ form: res.form, questions })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.insert = async (req, res) => {
  const form = new Form({})

  try {
    const newForm = await form.save()
    const newQuestion = await QuestionController.insertQuestion(newForm)

    const resData = {
      form: newForm,
      questions: [ newQuestion ]
    }

    res.status(201).json({ ...resData })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.update = async (req, res) => {
  if (req.body.title)
    res.form.title = req.body.title
  if (req.body.questions && req.body.questions.length)
    res.form.numberOfQuestions = req.body.questions.length

  try {
    const form = await res.form.save()
    const questions = await QuestionController.update(form._id, req.body.questions)
    res.json({ form, questions })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.delete = async (req, res) => {
  try {
    await res.form.remove()
    await QuestionController.delete(res.form)
    res.json({ message: 'Deleted form' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.addAnswer = async (form) => {
  try {
    const filter = { _id: ObjectId(form) }
    const update = { $inc: { numberOfAnswers: 1 }}
    await Form.findOneAndUpdate(filter, update)
  } catch (error) {
    throw new Error(error.message)
  }
}

exports.getForm = async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.id)
    
    if (!form) {
      return res.status(400).json({ message: 'Cannot find form' })
    }

    res.form = form
    next()
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}