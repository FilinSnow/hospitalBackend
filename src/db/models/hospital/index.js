const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemeRecords = new Schema({
  name: String,
  doctor: String,
  date: String,
  complaint: String,
  userId: { type: String, required: true }
});

module.exports = Record = mongoose.model('records', schemeRecords);