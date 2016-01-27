var Router = require('./lib/Router')();
var Home = require('./controllers/Home');
var Register = require('./controllers/Register');

var Profile = require('./controllers/Profile');
var User = require('./models/User');
var FindFriends = require('./controllers/FindFriends');
var PostContent = require('./controllers/PostContent');
var Pages = require('./controllers/Page');
var LoginModal = require('./controllers/LoginModal');
var currentPage;
var body;
var util = require('util');

var showPage = function(newPage) {
  if (currentPage) currentPage.teardown();
  currentPage = newPage;
  body.innerHTML = '';
  currentPage.render(body);
  currentPage.on('header.goto', function(e, route) {
    Router.navigate(route);
  });

  currentPage.on('header.modal', function(e, route) {
    var modref = new LoginModal();
    modref.on('loginsuccess', function() {
      currentPage.set('user', user);
    });
  });
}

window.onload = function() {

  body = document.querySelector('body');
  //global user ref 
  user = new User();
  user.fetch(function(error, result) {
    Router
      .add('home', function() {
        var page = new Home();
        showPage(page);
      })
      .add('logout', function() {
        user.logout(function(error, result) {
          var page = new Home();
          showPage(page);
        });
      })
      // .add('profile', function() {
      //   if (user.isLogged()) {
      //     var page = new Profile();
      //     showPage(page);
      //   } else {
      //     //Router.navigate('login');
      //   }
      // })
      .add(function() {
        var page = new Home();
        showPage(page);
      })
      .info()
      .listen()
      .check();
  });
}