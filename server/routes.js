const router = require('express').Router();
const controller = require('./controller');

router.route('/gomoku')
  .get(controller.get)
  .put(controller.update)

router.route('/gomokuWipe')
  .put(controller.update2)

module.exports = router;