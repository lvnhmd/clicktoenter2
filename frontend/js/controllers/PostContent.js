var FriendModel = require('../models/Friend');

module.exports = Ractive.extend({
  template: require('../../tpl/post-content'),
  components: {
    header: require('../views/Header'),
    navigation: require('../views/Navigation'),
    appfooter: require('../views/Footer')

  },
  data: {
    posting: true,
    taggedFriends: []
  },
  onrender: function() {
    if (userModel.isLogged()) {
      var ContentModel = require('../models/Content');
      var model = new ContentModel();
      var self = this;
      this.on('post', function() {
        var files = this.find('input[type="file"]').files;
        var formData = new FormData();
        if (files.length > 0) {
          var file = files[0];
          if (file.type.match('image.*')) {
            formData.append('files', file, file.name);
          }
        }
        formData.append('text', this.get('text'));
        model.create(formData, function(error, result) {
          self.set('text', '');
          if (error) {
            self.set('error', error.error);
          } else {
            self.set('error', false);
            self.set('success', 'The post is saved successfully.<br />What about adding another one?');
            getPosts();
          }
        });
      });

      var util = require('util');
    
      var getPosts = function() {
        model.fetch(function(err, result) {
          console.log('FOUND POSTS! ' + util.inspect(result.posts));
          if (!err) {
            self.set('posts', result.posts);
          }
        });
      };
      getPosts();

      var friendModel = new FriendModel();
      var getFriends = function() {
        friendModel.fetch(function(err, result) {
          console.log('FOUND FRIENDS! ' + util.inspect(result.friends));
          if (!err) {
            self.set('PFriends', result.friends);
          }
        });
      };
      getFriends();

    } else {
      this.set('posting', false);
    }
  }
});