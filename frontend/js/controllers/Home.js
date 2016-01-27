module.exports = Ractive.extend({
  template: require('../../tpl/home'),
  components: {
    header: require('../views/Header'),
    navigation: require('../views/Navigation'),
    content: require('../views/Content'),
    appfooter: require('../views/Footer')
  },
  oninit: function() {
    var header = this.findComponent('header');
    this.observe('user', function(n) {
      header.reset(n);
    });
  }
});