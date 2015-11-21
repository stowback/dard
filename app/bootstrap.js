var YoloJS = function () {

  this.version = '0.0.1';
};


var dard = YoloJS.Daredevil = function () {

}

_.extend(dard.prototype, {

  previousPage: null,
  
  process: function (faceData) {
    if (faceData.faceRotation[1] > 0.10) {
      $.event.trigger({
        type: "lookLeft",
        time: new Date()
      });
    } else if (faceData.faceRotation[1] <= 0.10 && faceData.faceRotation[1] >= -0.10) {
      $.event.trigger({
        type: "lookCenter",
        time: new Date()
      });
    } else {
      $.event.trigger({
        type: "lookRight",
        time: new Date()
      });
    }

    if (faceData.eyeClosure[0] == 0 && faceData.eyeClosure[1] == 0) {
      $.event.trigger({
        type: "eyesClosed",
        time: new Date()
      });
    }
  }
});

var Daredevil = new dard();

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

