const express = require('express')
const router = express.Router()

const FormController = require('../controllers/formController')

router.get('/', FormController.findAll)

router.get('/:id', FormController.getForm, FormController.findOne)

router.post('/', FormController.insert)

router.patch('/:id', FormController.getForm, FormController.update)

router.delete('/:id', FormController.getForm, FormController.delete)

module.exports = router