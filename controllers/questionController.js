const Question = require('../models/question')

// ================ APP ACTIONS ================ //

const FIRST_QUESTION = {
  title: '',
  possibleAnswers: [
    {
      id: 1,
      value: 'Yes'
    },
    {
      id: 2,
      value: 'No'
    }
  ]
}

const FIRST_POSSIBLE_ANSWERS = [
  {
    id: 1,
    value: 'Yes'
  },
  {
    id: 2,
    value: 'No'
  }

]

exports.findByForm = async (formId) => {
  try {
    const query = { formId }
    return await Question.find(query)
  } catch (error) {
    throw new Error(error.message)
  }
}

exports.insertQuestion = async (form, questionData = null) => {
  if (!questionData) questionData = FIRST_QUESTION
  questionData.formId = form._id
  
  try {
    const question = new Question(questionData)
    return await question.save()
  } catch (error) {
    throw new Error(error.message)
  }
}

exports.update = async (form, questionsData) => {
  try {
    this.deleteQuestions(form)

    questionsData.forEach(question => question.formId = form)
    
    console.log(questionsData)
    return await Question.insertMany(questionsData)
  } catch (error) {
    throw new Error(error.message)
  }
}

exports.deleteQuestions = async (form) => {
  const query = { formId: form._id }

  try {
    await Question.deleteMany(query)
  } catch (error) {
    throw new Error(error.message)
  }
}

// ================ API REQUESTS ================ //

exports.findAll = async (req, res) => {
  try {
    const questions = await Question.find()
    res.json(questions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.findOne = async (req, res) => {
  res.json(res.question)
}

exports.insert = async (req, res) => {
  try {
    console.log(req.body)
    const question = new Question({
      formId: req.body.formId,
      possibleAnswers: FIRST_POSSIBLE_ANSWERS
    })

    const newQuestion = await question.save()

    res.status(201).json(newQuestion)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.delete = async (req, res) => {
  try {
    await res.question.remove()
    res.json({ message: 'Deleted question' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id)
    
    if (!question) {
      return res.status(400).json({ message: 'Cannot find question' })
    }

    res.question = question
    next()
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}