const app = require('./');
const http = require('http').Server(app);
const io = require('socket.io')(http);


io.on('connection', socket => {
  let total = io.engine.clientsCount;
  if (total > 2) {
    console.log('sorry only two players allowed at a time');
    socket.disconnect();
  } else {
    io.emit('getCount', total);
    if (total === 1) {
      socket.emit('playerColor', 1);
    } else {
      socket.emit('playerColor', 2);
    }
    console.log(`${total} user(s) has connected`);
    
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

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  }
});

http.listen(1338, () => {
  console.log('socket.io listening on *:1338');
});