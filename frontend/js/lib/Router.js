module.exports = function() {
  return {
    routes: [],
    root: '/',
    getFragment: function() {
      var fragment = '';
      fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
      fragment = fragment.replace(/\?(.*)$/, '');
      fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
      console.log(fragment);
      return this.clearSlashes(fragment);
    },
    clearSlashes: function(path) {
      return path.toString().replace(/\/$/, '').replace(/^\//, '');
    },
    add: function(route, handler) {
      if (typeof route == 'function') {
        handler = route;
        route = '';
      }
      this.routes.push({
        route: route,
        handler: handler
      });
      return this;
    },
    check: function(f, params) {

      var fragment, vars;
      if (typeof f !== 'undefined') {
        fragment = f.replace(/^\//, '');
      } else {
        fragment = this.getFragment();
      }
      for (var i = 0; i < this.routes.length; i++) {
        var match, route = this.routes[i].route;
        route = route.replace(/^\//, '');
        var vars = route.match(/:[^\s/]+/g);
        var r = new RegExp('^' + route.replace(/:[^\s/]+/g, '([\\w-]+)'));
        match = fragment.match(r);
        if (match) {
          match.shift();
          var matchObj = {};
          if (vars) {
            for (var j = 0; j < vars.length; j++) {
              var v = vars[j];
              matchObj[v.substr(1, v.length)] = match[j];
            }
          }
          this.routes[i].handler.apply({}, (params || []).concat([matchObj]));
          return this;
        }
      }
      return false;
    },
    listen: function() {
      var self = this;
      var current = self.getFragment();
      var fn = function() {
        if(current !== self.getFragment()) {
          current = self.getFragment();
          self.check(current);
        }
      }
      clearInterval(this.interval);
      this.interval = setInterval(fn, 50);
      return this;
    },
    navigate: function(path) {
      path = path ? path : '';
      history.pushState(null, null, this.root + this.clearSlashes(path));
      // The preceding code uses the HTML5 history API 
      return this;
    },
    modal: function(path) {
      //here I should set the path to the "previous" path because I want to stay on that page 
      path = path ? path : '';
      // history.pushState(null, null, this.root + this.clearSlashes(path));
      // The preceding code uses the HTML5 history API 
      return this;
    },
    info: function() {
      var util = require('util');
      console.log('Supported routes : \n' + util.inspect(this.routes));
      return this;
    }

  }
};