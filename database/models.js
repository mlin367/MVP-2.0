const mongoose = require('mongoose');

const gomokuSchema = new mongoose.Schema({
  identifier: Number,
  black: Number,
  white: Number,
  board: String,
  nextTurn: Number
})

const Gomoku = mongoose.model('Gomoku', gomokuSchema);

module.exports = Gomoku;