/**
 * YoloJS Framework routing
 */
var Router = YoloJS.Router = function () {

  this.routes = [];
  this.mode = null;
  this.root = '/';
  this.updated = false;
};

// Extend Router
_.extend(Router.prototype, {

  /**
   * Config
   * history: url in / but need URL REWRITING for work well
   * hash: Work everywhere
   */
  config: function  (options) {
    this.mode = options && options.mode && options.mode == 'history' 
                && !!(history.pushState) ? 'history' : 'hash';
    this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
    return this;
  },

  /**
   * Add a route to the router
   * @param {regex} route       the regex of the route
   * @param {function} handlr   the callback
   */
  add: function (route, handler) {

    if(typeof route == 'function') {
      handler = route;
      route = '';
    }
    this.routes.push({ route: route, handler: handler});
    return this;
  },

  /**
   * Get the current fragment of the url
   * @return {string} the url
   */
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
  
  /**
   * Clean the url
   */
  clearSlashes: function(path) {

    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  },

  /**
   * Check the url
   */
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

  /**
   * Listen the router
   */
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

  /**
   * Navigate into the router and the App
   * @param  {string} path the string of the url
   */
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