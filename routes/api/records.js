const express = require('express');
const router = express.Router();

const Record = require('../../models/Record');

router.get('/', async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  }
  
  catch(err) {
    res.status(500).json({ messege: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  const { params: { id } } = req;

  try {
    const record = await Record.findById(id);
    res.json(record);
  }
  
  catch(err) {
    if (err.name === 'CastError')
      res.status(404).json({ messege: 'Not found' });
    else
      res.status(500).json({ messege: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const { body: { data } } = req;

  try {
    const newRecord = new Record({ data });
    const result = await newRecord.save();
    res.json(result);
  }
  
  catch(err) {
    res.status(500).json({ messege: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  const { params: { id }, body: { data } } = req;

  try {
    const record = await Record.findById(id);

    record.data = data;
    const result = await record.save();

    res.json(result);
  }

  catch(err) {
    if (err.name === 'CastError')
      res.status(404).json({ messege: 'Not found' });
    else
      res.status(500).json({ messege: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  const { params: { id } } = req;
  
  try {
    const record = await Record.findById(id);

    await record.remove();
    res.json( {messege: "Success"} );
  }

  catch(err) {
    if (err.name === 'CastError')
      res.status(404).json({ messege: 'Not found' });
    else
      res.status(500).json({ messege: 'Server error' });
  }
});

module.exports = router;