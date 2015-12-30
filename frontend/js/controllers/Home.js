module.exports = Ractive.extend({
  template: require('../../tpl/home'),
  components: {
    header: require('../views/Header'),
    navigation: require('../views/Navigation'),
    content: require('../views/Content'),
    appfooter: require('../views/Footer')
  },
  onrender: function() {
    console.log('Home page rendered');
  }
});