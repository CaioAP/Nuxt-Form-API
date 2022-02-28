const Answer = require('../models/answer')
const FormController = require('../controllers/formController')

exports.save = (req, res) => {
  if (res.answer) {
    res.answer.answers = req.body.answers
    return this.update(res)
  }

  const answerData = {
    form: req.params.form,
    email: req.params.email,
    answers: req.body.answers
  }

  return this.insert(res, answerData)
}

exports.insert = async (res, answerData) => {
  try {
    const answer = new Answer({
      formId: answerData.form,
      email: answerData.email,
      answers: answerData.answers
    })

    const newAnswer = await answer.save()
    await FormController.addAnswer(answerData.form)

    res.status(201).json(newAnswer)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.update = async (res) => {
  try {
    const query = {
      $and: [
        { formId: res.answer.formId },
        { email: res.answer.email }
      ]
    }
    const update = {
      answers: res.answer.answers
    }

    const answer = await Answer.findOneAndUpdate(query, update, { new: true })
    res.json(answer)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getAnswer = async (req, res, next) => {
  try {
    const query = {
      $and: [
        { formId: req.params.form },
        { email: req.params.email }
      ]
    }

    const answer = await Answer.find(query)

    res.answer = answer.length ? answer[0] : null
    next()
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}