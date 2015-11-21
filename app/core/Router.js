var Router = YoloJS.Router = function () {

  this.routes = [];
  this.mode = null;
  this.root = '/';
  this.updated = false;
};

_.extend(Router.prototype, {
  config: function  (options) {
    this.mode = options && options.mode && options.mode == 'history' 
                && !!(history.pushState) ? 'history' : 'hash';
    this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
    return this;
  },

  add: function (route, handler) {
    if(typeof route == 'function') {
      handler = route;
      route = '';
    }
    this.routes.push({ route: route, handler: handler});
    return this;
  },

  getFragment: function() {
    var fragment = '';
    if(this.mode === 'history') {
        fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
        fragment = fragment.replace(/\?(.*)$/, '');
        fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
    } else {
        var match = window.location.href.match(/#(.*)$/);
        fragment = match ? match[1] : '';
    }
    return this.clearSlashes(fragment);
  },
  
  clearSlashes: function(path) {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  },

  check: function(f) {
    var fragment = f || this.getFragment();
    for(var i=0; i<this.routes.length; i++) {
      var match = fragment.match(this.routes[i].route);
      if(match) {
        match.shift();
        this.routes[i].handler.apply({}, match);
        return this;
      }
    }
    return this;
  },

  listen: function() {
    var self = this;

    var current = self.getFragment();

    var fn = function() {
      if(current !== self.getFragment() || !self.updated) {
        self.updated = true;
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
    if(this.mode === 'history') {
      history.pushState(null, null, this.root + this.clearSlashes(path));
    } else {
      window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
    }
    return this;
  }
});