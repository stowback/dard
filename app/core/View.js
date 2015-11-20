var View = YoloJS.View = function (options) {

  this.libs = new Array();
  this.libs['js'] = new Array();
  this.libs['js']['bezier'] = 'visage/bezier-spline.js'
  this.libs['js']['visage'] = 'visage/visage.js'
  this.libs['js']['visageSDK'] = 'visage/visage/visageSDK.js'

  this.initialize.apply(this, arguments);
};

_.extend(View.prototype, {

  tagName: 'div',
  tpl: null,
  timingAnimationIntro: 0,
  timingAnimationOutro: 0,
  bodyClass: null,
  libs: [],

  initialize: function () {
    this.render();
  },

  loadJS: function (libs, cb) {

    var self = this;
    var count = 0;
    _.each(libs, function (lib) {
      var tag = document.createElement("script");
      tag.src = 'js/' + self.libs['js'][lib];
      document.getElementsByTagName("head")[0].appendChild(tag);
      count++;
    });

    if (count == libs.length) {
      cb(true);
    };
  },

  load: function (data) {

    var self = this;

    $.ajax({
      url: "views/" + this.tpl + ".hbs",
    }).done(function (hbs) {
      
      var tpl = Handlebars.compile(hbs);  
      $(self.tagName).html(tpl(data));
    });
  },

  render: function (data) {
    
    var self = this;

   
      return setTimeout(function(){
        self.setBodyClass();
        self.load(data);
        self.loadJS(self.js, function (res) {
          console.log("loaded")
        });
      }, self.timingAnimationIntro);
  },

  setBodyClass: function () {
    if (this.bodyClass) {
      $('body').removeClass().addClass(this.bodyClass);
    };
  }
});

View.extend = extend;