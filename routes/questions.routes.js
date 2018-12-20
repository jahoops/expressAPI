const express = require('express');
const router = express.Router();
const model = require('../models/questions.model');
const m = require('../helpers/middlewares');

/* All questions */
router.get('/', async (req, res) => {
    await model.getItems()
    .then(questions => res.json(questions))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* A question by id */
router.get('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    await model.getItem(id)
    .then(question => res.json(question))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new question */
router.post('/', m.mustBeInteger, async (req, res) => {
    await model.inserItem(req.body)
    .then(question => res.status(201).json({
        message: `The question #${question.id} has been created`,
        content: question
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a question */
router.put('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id

    await model.updateItem(id, req.body)
    .then(question => res.json({
        message: `The question #${id} has been updated`,
        content: question
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

/* Delete a question */
router.delete('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id

    await model.deleteItem(id)
    .then(question => res.json({
        message: `The question #${id} has been deleted`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

module.exports = router