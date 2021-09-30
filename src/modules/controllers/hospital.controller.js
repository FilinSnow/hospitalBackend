const Record = require('../../db/models/hospital/index');
const jwt = require('jsonwebtoken');
const _ = require('underscore');
const { secret } = require('../../config/config');

module.exports.getAllRecords = async (req, res) => {
    let token = req.headers.authorization;
    token = token.split(' ')[1];
    const decoded = jwt.verify(token, secret);
    Record.find().then(result => {
        result = result.filter(elem => decoded.id === elem.userId);
        console.log(result);
        res.send({ data: result });
    }).catch(err => new Error(err));
}