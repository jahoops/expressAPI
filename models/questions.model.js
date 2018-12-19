const helper = require('../helpers/helper.js');
let questions = [];
let filename = '';

function getQuestions() {
    return new Promise((resolve, reject) => {
        if (posts.length === 0) {
            reject({
                message: 'no posts available',
                status: 202
            })
        }
        resolve(posts)
    })
}

function getQuestion(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id)
        .then(post => resolve(post))
        .catch(err => reject(err));
    })
}

function insertQuestion(question, answer) {
    return new Promise((resolve, reject) => {
        const id = { ID: helper.getNewId(questions) };
        const date = { 
            createdAt: helper.newDate(),
            updatedAt: helper.newDate()
        } 
        newPost = { id, ...date, ...newPost }
        posts.push(newPost)
        helper.writeJSONFile(filename, posts)
        resolve(newPost)
    })
}

function updateQuestion(id, newQuestion, newAnswer) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(questions, id)
        .then(question => {
            const index = questions.findIndex(p => p.id == question.id)
            id = { id: question.id }
            posts[index] = { ...id, ...newQuestion, ...newAnswer }
            helper.writeJSONFile(filename, questions)
            resolve(questions[index])
        })
        .catch(err => reject(err))
    })
}

function deleteQuestion(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(questions, id)
        .then(() => {
            questions = questions.filter(p => p.id !== id)
            helper.writeJSONFile(filename, questions)
            resolve()
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    insertQuestion,
    getQuestions,
    getQuestion, 
    updateQuestion,
    deleteQuestion
}