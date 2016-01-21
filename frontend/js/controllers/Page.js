module.exports = Ractive.extend({
  template: require('../../tpl/pages'),
  components: {
    header: require('../views/Header'),
    navigation: require('../views/Navigation'),
    appfooter: require('../views/Footer')
  },
  data: { },
  onrender: function() {
  }
});