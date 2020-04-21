const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  data: {
    name: {
      type: String,
      require: [true, 'Name is required'],
    },
    email: {
      type: String,
      require: [true, 'Email is requierd'],
    },
  },
});

module.exports = Record = mongoose.model('record', RecordSchema);