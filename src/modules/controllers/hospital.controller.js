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
        res.send({ data: result });
    }).catch(err => new Error(err));
}

module.exports.createNewRecord = async (req, res) => {
    if (Object.keys(req.body).length == 0) {
        return res.send('Not send data');
    }
    _.mapObject(req.body, (val, key) => {
        if (val == '') {
            return res.send('You have not entered data');
        }
    })
    let token = req.headers.authorization;
    token = token.split(' ')[1];
    const decoded = jwt.verify(token, secret);
    const obj = {
        ...req.body,
        userId: decoded.id
    }
    const record = new Record(obj);
    record.save().then(r => {
        res.send(r);
    }).catch(err => new Error(err));
}

module.exports.updateInfoRecord = async (req, res) => {
    if (Object.keys(req.body).length == 0) {
        return res.send('Not send data');
    }
    const { _id, name, doctor, date, complaint } = req.body;
    Record.updateOne(
        { _id },
        { name, doctor, date, complaint },
    ).then(r => {
        res.send(r);
    }).catch(err => new Error(err));
}

module.exports.deleteRecord = async (req, res) => {
    Record.deleteOne({
        _id: req.params.id
    }
    ).then(r => {
        res.send("Record delete");
    }).catch(err => new Error(err));
}
