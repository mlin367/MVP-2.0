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
    console.log(req.body)
    let { black, white, board, nextTurn } = req.body;
    Gomoku.findOneAndUpdate({ identifier: 1337 }, { black, white, board, nextTurn})
      .then(result => {
        res.status(202).send('update success');
      })
      .catch(err => {
        console.error(err);
      });
  },

  // delete: (req, res) => {
  //   let { query } = req;
  //   Gomoku.findOneAndDelete({query})
  // }
};

