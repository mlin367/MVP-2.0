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

io.on('connection', socket => {
  let total = io.engine.clientsCount;
  if (total > 2) {
    console.log('sorry only two players allowed at a time');
    socket.disconnect();
  } else {
    console.log(`${total} user(s) has connected`);
    socket.emit('getCount', total);
    socket.on('disconnect', () => {
      console.log('user disconnected');
    })
  }
})

http.listen(1337, () => {
  console.log('listening on *:1337')
})

// app.listen(port, () => {
//   console.log(`app is listening on port ${port}`);
// });