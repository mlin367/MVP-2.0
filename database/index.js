const mongoose = require('mongoose');
mongoose.connect('mongodb://db/Gomoku');

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error: '));
connection.once('open', () => {
  console.log('MongoDB connected!');
})

module.exports = connection;