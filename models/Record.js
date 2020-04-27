const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  data: {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is requierd'],
    },
  },
});

module.exports = Record = mongoose.model('record', RecordSchema);