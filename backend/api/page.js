var ObjectId = require('mongodb').ObjectID;
var helpers = require('./helpers');
var response = helpers.response;
var error = helpers.error;
var getDatabaseConnection = helpers.getDatabaseConnection;
var getCurrentUser = helpers.getCurrentUser;

module.exports = function(req, res, params) {
  var user;
  if (req.session && req.session.user) {
    user = req.session.user;
  } else {
    error('You must be logged in in order to use this method.', res);
    return;
  }
  switch (req.method) {
    case 'GET':
      getDatabaseConnection(function(db) {
        var collection = db.collection('page');
        collection.find({
          $query: {},
          $orderby: {
            date: -1
          }
        }).toArray(function(err, result) {
          var util = require('util');
          result.forEach(function(value, index, arr) {
            arr[index].id = value._id;
            delete arr[index].userId;
          });
          response({
            pages: result
          }, res);
        });
      });
      break;
    case 'POST':
      var formidable = require('formidable');
      var form = new formidable.IncomingForm();
      form.parse(req, function(err, formData, files) {
        var data = {
          title: formData.title,
          description: formData.description
        };
        if (!data.title || data.title === '') {
          error('Please add some title.', res);
        } else if (!data.description || data.description === '') {
          error('Please add some description.', res);
        } else {
          var done = function() {
            response({
              success: 'OK'
            }, res);
          }
          getDatabaseConnection(function(db) {
            getCurrentUser(function(user) {
              var collection = db.collection('page');
              data.userId = user._id.toString();
              data.userName = user.firstName + ' ' + user.lastName;
              data.date = new Date();
              collection.insert(data, done);
            }, req, res);
          });
        }
      });
      break;
  };
}