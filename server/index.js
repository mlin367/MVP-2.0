const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routes');
const connection = require('../database');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));

const port = 1337;

app.use('/api', router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'))
})

io.on('connection', socket => {

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  let total = Object.keys(io.sockets.sockets);
  console.log(`${total.length} user(s) has connected`);
  if (total.length > 2) {
    console.log('sorry only two players allowed at a time');
    socket.emit('getCount', total.length);
    socket.disconnect();
  } else if (total.length === 2) {
    io.to(total[0]).emit('playerColor', 1);
    io.to(total[1]).emit('playerColor', 2);
    io.emit('getCount', total.length);
  } 

  socket.on('fetch', result => {
    io.emit('fetch', result);
  });

  socket.on('placePiece', obj => {
    io.emit('placePiece', obj);
  });

  socket.on('blackWin', obj => {
    io.emit('blackWin', obj);
  });

  socket.on('whiteWin', obj => {
    io.emit('whiteWin', obj);
  });

  socket.on('clearBoard', obj => {
    io.emit('clearBoard', obj);
  });
});

http.listen(1337, () => {
  console.log("listening on 1337")
});

// app.listen(port, () => {
//   console.log(`app is listening on port ${port}`);
// });
