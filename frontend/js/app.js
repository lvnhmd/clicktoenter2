var Router = require('./lib/Router')();
var Home = require('./controllers/Home');
var Register = require('./controllers/Register');
var Login = require('./controllers/Login');
var Profile = require('./controllers/Profile');
var UserModel = require('./models/User');
var FindFriends = require('./controllers/FindFriends');
var PostContent = require('./controllers/PostContent');
var Pages = require('./controllers/Page');
var LoginModal = require('./controllers/LoginModal');
var currentPage;
var body;

var showPage = function(newPage) {
  if(currentPage) currentPage.teardown();
  currentPage = newPage;
  body.innerHTML = '';
  currentPage.render(body);
  currentPage.on('header.goto', function(e, route) {
    Router.navigate(route);
  });
  currentPage.on('header.modal', function(e, route) {
    console.log('e ' + e);
    console.log('modal: '+ route);
    switch (route) {
      case "login":
        var modref = new LoginModal();
        //modref.on
        modref.on( 'loginsuccess', function () {
          var util = require('util');
          // console.log(util.inspect(currentPage));
          userModel.fetch(function(error, result) {
            console.log(util.inspect(result));
            console.log(util.inspect(currentPage));
            currentPage.reset();
          });
        });
        break;
      default:
        new LoginModal();
        break;
    }
  });
}

window.onload = function() {

  body = document.querySelector('body');
  // Note that we missed the var keyword in front of the variable definition. This is how we make userModel available in the global scope.
  userModel = new UserModel();
  userModel.fetch(function(error, result) {
  Router
    .add('home', function() {
      var p = new Home();
      showPage(p);
    })
    .add('register', function() {
      var p = new Register();
      showPage(p);
    })
    // .add('login', function() {
      // var p = new Login();
      // showPage(p);
    // })
    .add('logout', function() {
      userModel.logout(function(error, result) {
        window.location.href = '/';
      });
    })
    .add('profile', function() {
      if(userModel.isLogged()) {
        var p = new Profile();
        showPage(p);
      } else {
        Router.navigate('login');
      }      
    })
    .add('find-friends', function() {
      if (userModel.isLogged()) {
        var p = new FindFriends();
        showPage(p);
      } else {
        Router.navigate('login');
      }
    })
    .add('post-content', function() {
      if (userModel.isLogged()) {
        var p = new PostContent();
        showPage(p);
      } else {
        Router.navigate('login');
      }
    })
    .add('pages', function() {
      if (userModel.isLogged()) {
        var p = new Pages();
        showPage(p);
      } else {
        Router.navigate('login');
      }
    })
    .add(function() {
      Router.navigate('home');
    })
    .info()
    .listen()
    .check();
  });
}