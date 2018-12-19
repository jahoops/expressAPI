const helper = require('../helpers/helper.js');
let questions = require('../data/questions.json');
let filename = '';

function getQuestions() {
    return new Promise((resolve, reject) => {
        if (questions.length === 0) {
            reject({
                message: 'no questions available',
                status: 202
            });
        }
        resolve(questions);
    });
}

function getQuestion(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(questions, id)
        .then(question => resolve(question))
        .catch(err => reject(err));
    });
}

function insertQuestion(question, answer) {
    return new Promise((resolve, reject) => {
        const id = helper.getNewId(questions);
        newQuestion = { ID:id, Q:question, A:answer };
        questions.push(newPost);
        helper.writeJSONFile(filename, questions);
        resolve(newQuestion);
    });
}

function updateQuestion(id, editedQuestion, editedAnswer) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(questions, id)
        .then(question => {
            const index = questions.findIndex(p => p.id == question.id);
            id = question.id;
            questions[index] = { ID:id, Q:editedQuestion, A:editedAnswer };
            helper.writeJSONFile(filename, questions);
            resolve(questions[index]);
        })
        .catch(err => reject(err));
    });
}

function deleteQuestion(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(questions, id)
        .then(() => {
            questions = questions.filter(p => p.ID !== id)
            helper.writeJSONFile(filename, questions);
            resolve();
        })
        .catch(err => reject(err));
    });
}

module.exports = {
    insertQuestion,
    getQuestions,
    getQuestion, 
    updateQuestion,
    deleteQuestion
};