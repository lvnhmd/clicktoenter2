// var MyRactive = Ractive.extend({
// 	template: require('../../tpl/header')
// });

// module.exports = new MyRactive({
// 	onconstruct: function() {
// 		console.log(' user logged : ' + userModel.isLoisgged());
// 		// this.data.isLogged = !!userModel.isLogged();
// 		this.set('isLogged', !!userModel.isLogged());
// 	}
// });
// ¯\(ツ)/¯ 
module.exports = Ractive.extend({
  template: require('../../tpl/header'),
  onconstruct: function() {
    // this.data.isLogged = !!userModel.isLogged();
    console.log('Header.js onconstruct user logged : ' + !!userModel.isLogged());
	userModel.set('isLogged', !!userModel.isLogged());
  }
});