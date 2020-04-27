const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const { mongoURI: db } = require('./config/keys');
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(console.log);

const server = express();
server.use(express.json());
server.use('/api/records', require('./routes/api/records'));

if (process.env.NODE_ENV === 'production') {
  server.use(express.static('client/build'));

  server.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
