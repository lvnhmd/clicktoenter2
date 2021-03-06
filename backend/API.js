var Router = require('../frontend/js/lib/router')();
Router
  .add('api/version', require('./api/version'))
  .add('api/user/login', require('./api/user-login'))
  .add('api/user/logout', require('./api/user-logout'))
  .add('api/user', require('./api/user'))
  .add('api/friends/find', require('./api/friends-find'))
  .add('api/friends/add', require('./api/friends-add'))
  .add('api/friends', require('./api/friends'))
  .add('api/content', require('./api/content'))
  .add('api/page/:id', require('./api/page'))
  .add('api/page', require('./api/page'))
  .add(require('./api/default'));
module.exports = function(req, res) {
  Router.check(req.url, [req, res]);
}