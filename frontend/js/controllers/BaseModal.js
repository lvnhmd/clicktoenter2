var MyRactive = Ractive.extend({
  template: 'I can be instantiated _or_ be a component!'
});

var ractive = new MyRactive({
  el: 'container'
});

var ractive2 = new Ractive({
  el: 'container2',
  template: '<widget/>',
  components: {
    widget: MyRactive
  }
});