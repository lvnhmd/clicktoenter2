// ¯\(ツ)/¯ 
module.exports = Ractive.extend({
  template: require('../../tpl/header'),
  onconstruct: function() {
    this.data.isLogged = !!userModel.isLogged();
 //    console.log('Header.js onconstruct user logged : ' + !!userModel.isLogged());
	// userModel.set('isLogged', !!userModel.isLogged());
  }
});