/**
 * YoloJS
 * VC framework
 */
var YoloJS = function () {

  this.version = '0.0.1';
};


var dard = YoloJS.Daredevil = function () {

  this.loadTpl.apply(this);
}

/**
 * Extend the object with Underscore
 */
_.extend(dard.prototype, {

  previousPage: null,
  map: null,
  tpl: [],
  tplLoaded: [],
  
  // Process trigger for faceData of VisageSDK
  process: function (faceData) {

    if (faceData.faceRotation[1] > 0.10) { // Look Left
      $.event.trigger({
        type: "lookLeft",
        time: new Date()
      });
    } else if (faceData.faceRotation[1] <= 0.10 && faceData.faceRotation[1] >= -0.10) { // Look center
      $.event.trigger({
        type: "lookCenter",
        time: new Date()
      });
    } else { // Look right
      $.event.trigger({
        type: "lookRight",
        time: new Date()
      });
    }

    if (faceData.eyeClosure[0] == 0 && faceData.eyeClosure[1] == 0) { // Eyes Closed
      $.event.trigger({
        type: "eyesClosed",
        time: new Date()
      });
    }
  },

  /**
   * loadTpl
   * return trigger
   */
  loadTpl: function () {

    var self = this;
    var promise = [];

    _.each(self.tpl ,function (tpl) {

      promise.push($.ajax({
        url: "views/" + tpl + ".hbs",
        complete: function (hbs) {
          self.tplLoaded[tpl] = hbs.responseText; 
        }
      }));
    });

    // Promise
    $.when.apply($, promise).then(function () {
      $.event.trigger('tplLoaded');
    });
  }
});

// Extend function
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

dard.extend = extend;