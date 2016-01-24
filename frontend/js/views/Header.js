// ¯\(ツ)/¯ 
module.exports = Ractive.extend({
  template: require('../../tpl/header'),
  onconstruct: function() {
    this.data.isLogged = !!userModel.isLogged();
  }
});