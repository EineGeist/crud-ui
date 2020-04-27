const express = require('express');
const router = express.Router();

const Record = require('../../models/Record');

const handleError = err => {
  let status, message;  

  switch (err.name) {
    case 'CastError':
      status = 404;
      message = { message: 'Not found' };
      break;
    case 'ValidationError':
      const errors = [];
      for (let failure in err.errors) {
        const { path, kind, message } = err.errors[failure];
        errors.push({ path, kind, message });
      }
      
      status = 422;
      message = { errors };
      break;
    default:
      status = 500;
      message = { message: 'Server error' };
      console.log(err);
  }

  return [status, message];
};

router.get('/', async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  }
  
  catch (err) {
    const [status, message] = handleError(err);
    res.status(status).json(message);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const record = await Record.findById(id);
    res.json(record);
  }
  
  catch (err) {
    const [status, message] = handleError(err);
    res.status(status).json(message);
  }
});

router.post('/', async (req, res) => {
  const { data } = req.body;

  try {
    const newRecord = new Record({ data });
    const result = await newRecord.save();
    res.json(result);
  }
  
  catch (err) {
    const [status, message] = handleError(err);
    res.status(status).json(message);
  }
});

router.put('/:id', async (req, res) => {
  const {
    params: { id },
    body: { data },
  } = req;

  try {
    const record = await Record.findById(id);

    record.data = data;
    const result = await record.save();

    res.json(result);
  }
  
  catch (err) {
    const [status, message] = handleError(err);
    res.status(status).json(message);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const record = await Record.findById(id);

    await record.remove();
    res.json({ message: 'Success' });
  }
  
  catch (err) {
    const [status, message] = handleError(err);
    res.status(status).json(message);
  }
});

module.exports = router;
