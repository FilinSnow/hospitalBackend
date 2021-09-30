const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemeUsers = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
})

module.exports = User = mongoose.model('users', schemeUsers);