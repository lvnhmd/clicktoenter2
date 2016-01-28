var Router = require('./lib/Router')();
var Home = require('./controllers/Home');
var Register = require('./controllers/Register');

var Profile = require('./controllers/Profile');
var UserModel = require('./models/User');
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

  console.log(util.inspect(currentPage.get('user')));
  console.log(currentPage.get('user').email);

  currentPage.on('header.stayat', function(e, route) {
    switch (route) {
      case 'logout':
        userModel.logout(function(error, result) {
          currentPage.set('user', null);
        });
        break;
      default:
        break;
    }
  });

  currentPage.on('header.goto', function(e, route) {
    Router.navigate(route);
  });

  currentPage.on('header.modal', function(e, route) {
    switch (route) {
      case 'login':
        // login only if not alredy logged in
        var u = currentPage.get('user');
        if (null == u || (null != u && !u.email)) {
          var modref = new LoginModal();
          modref.on('event_login', function() {
            currentPage.set('user', userModel.get('value'));
          });
        }
        break;
      default:
        break;
    }
  });
}

window.onload = function() {

  body = document.querySelector('body');
  //global user ref 
  userModel = new UserModel();
  userModel.fetch(function(error, result) {

    var goToHomepage = function() {
        var page = new Home();
        page.set('user', userModel.get('value'));
        showPage(page);
    }

    Router
      .add('home', goToHomepage)
      // .add('logout', function() {
      //   console.log('step 1');
      //   userModel.logout(function(error, result) {
      //     var page = new Home();
      //     page.set('user', null);
      //     showPage(page);
      //   });
      // })
      // .add('profile', function() {
      //   if (user.isLogged()) {
      //     var page = new Profile();
      //     showPage(page);
      //   } else {
      //     //Router.navigate('login');
      //   }
      // })
      .add(goToHomepage)
      .info()
      .listen()
      .check();
  });
}