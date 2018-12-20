
const filename = '../public/data/questions.json';
const helper = require('../public/data/questions.json');
let questions = require('../data/questions.json');

function getItems() {
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

function getItem(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(questions, id)
        .then(item => resolve(item))
        .catch(err => reject(err));
    });
}

function insertItem(q,a) {
    return new Promise((resolve, reject) => {
        const id = helper.getNewId(questions);
        newItem = { id:id,q:q,a:a };
        questions.push(newItem);
        helper.writeJSONFile(filename, questions);
        resolve(newItem);
    });
}

function updateItem(id,q,a) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(questions, id)
        .then(item => {
            const index = questions.findIndex(p => p.id == item.id);
            questions[index] = { id:item.id,q:q,a:a };
            helper.writeJSONFile(filename, questions);
            resolve(questions[index]);
        })
        .catch(err => reject(err));
    });
}

function deleteItem(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(questions, id)
        .then(() => {
            questions = questions.filter(p => p.id !== id)
            helper.writeJSONFile(filename, questions);
            resolve();
        })
        .catch(err => reject(err));
    });
}

module.exports = {
    insertItem,
    getItems,
    getItem, 
    updateItem,
    deleteItem
};
