var ObjectId = require('mongodb').ObjectID;
var helpers = require('./helpers');
var response = helpers.response;
var error = helpers.error;
var getDatabaseConnection = helpers.getDatabaseConnection;
var getCurrentUser = helpers.getCurrentUser;

module.exports = function(req, res) {
    if (req.session && req.session.user) {
      getCurrentUser(function(user) {
        if (!user.friends || user.friends.length === 0) {
          console.log('aww, no friends for ' + user.firstName);
          return response({
            friends: []
          }, res);
        }
        if (user.friends && user.friends.length > 0) {
          console.log('type of user.friends ' + (typeof user.friends));
          user.friends.forEach(function(value, index, arr) {
            arr[index] = ObjectId(value);
          });
        }
        getDatabaseConnection(function(db) {
          var collection = db.collection('user');
          collection.find({
            _id: {
              $in: user.friends
            }
          }).toArray(function(err, result) {
            result.forEach(function(value, index, arr) {
              arr[index].id = value.id;
              delete arr[index].password;
              delete arr[index].email;
              delete arr[index]._id;
            });
            response({
              friends: result
            }, res);
          });
        });
      }, req, res);
    } else {
      error('You must be logged in to use this method.', res);
    }
  };