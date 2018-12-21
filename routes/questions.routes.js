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

/* update, insert, delete */
router.post('/', async (req, res) => {
    debugger;
    const verb = req.body.verb.toLowerCase();
    switch(verb) {
        case 'update':
            await model.updateItem(req.body)
            .then(item => res.json({
                message: `Question #${item.id} has been updated`,
                content: item
            }))
            .catch(err => {console.log('in error');
                if (err.status) {
                    res.status(err.status).json({ message: err.message })
                }
                res.status(500).json({ message: err.message })
                
            })
        break;
        case 'insert':
            await model.insertItem(req.body)
            .then(item => res.status(201).json({
                message: `The question #${item.id} has been created`,
                content: item
            }))
            .catch(err => res.status(500).json({ message: err.message }))
        break;
        case 'delete':
            const id = req.body.id
            await model.deleteItem(id)
            .then(item => res.json({
                message: `The question #${item.id} has been deleted`
            }))
            .catch(err => {
                if (err.status) {
                    res.status(err.status).json({ message: err.message })
                }
                res.status(500).json({ message: err.message })
            })
        break;
    }
})

module.exports = router