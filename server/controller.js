const Gomoku = require('../database/models');

module.exports = {
  get: (req, res) => {
    Gomoku.find({ identifier: 1337 })
      .then(result => {
        if (result.length > 0) {
          res.status(200).send(result);
        } else {
          new Gomoku({ identifier: 1337, black: 0, white: 0, board: '', nextTurn: 1 })
            .save()
            .then(result => {
              res.status(201).send('post success');
            });
        }
      })
      .catch(err => {
        console.error(err);
      });
  },

  update: (req, res) => {
    let { black, white, board, nextTurn } = req.body;
    Gomoku.findOneAndUpdate({ identifier: 1337 }, { black, white, board, nextTurn})
      .then(result => {
        res.status(202).send('update success');
      })
      .catch(err => {
        console.error(err);
      });
  },

  update2: (req, res) => {
    let obj;
    if (Object.keys(req.body).length === 2) {
      obj = { black: req.body.black, white: req.body.white};
    } else {
      obj = { board: req.body.board };
    }
    Gomoku.findOneAndUpdate({ identifier: 1337 }, obj)
      .then(result => {
        res.status(202).send('update success');
      })
      .catch(err => {
        console.error(err);
      });
  }
};

