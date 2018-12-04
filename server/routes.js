const router = require('express').Router();
const controller = require('./controller');

router.route('/gomoku')
  .get(controller.get)
  .put(controller.update)
  // .delete(controller.delete)

module.exports = router;