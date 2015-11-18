var YoloJS = function () {
  this.version = '0.0.1';
};

// Backbone extend
var extend = function(protoProps, staticProps) {
  var parent = this;
  var child;

  if (protoProps && _.has(protoProps, 'constructor')) {
    child = protoProps.constructor;
  } else {
    child = function(){ return parent.apply(this, arguments); };
  }

  _.extend(child, parent, staticProps);

  child.prototype = _.create(parent.prototype, protoProps);
  child.prototype.constructor = child;

  child.__super__ = parent.prototype;

  return child;
};