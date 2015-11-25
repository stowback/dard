 var View = YoloJS.View = function (options) {

  this.libs = new Array();
  this.libs['js'] = new Array();
  this.libs['js']['bezier'] = 'visage/bezier-spline.js';
  this.libs['js']['visage'] = 'visage/visage.js';
  this.libs['js']['visageSDK'] = 'visage/visage/visageSDK.js';
  this.libs['js']['GameSound'] = 'sound-engine/class/Game.class.js';
  this.libs['js']['MapSound'] = 'sound-engine/class/Map.class.js';
  this.libs['js']['CharacterSound'] = 'sound-engine/class/Character.class.js';
  this.libs['js']['DistrictSound'] = 'sound-engine/class/District.class.js';

  // Put in YoloJS variable the current view
  YoloJS.curentView = this;
  this.previousPage = null;

  this.initialize.apply(this, arguments);
};

_.extend(View.prototype, {

  /**
   * Variables
   * for configure the view.
   */
  
  // tagName for append element
  tagName: 'div',

  // Name for the classe
  pageName: 'default',
  
  // selector of the div
  pageDiv: $(this.tagName).find('.' + this.pageName),

  // tpl HBS
  tpl: null,

  // Timing animation Intro
  timingAnimationIntro: 0,

  // Timing animation Outro
  timingAnimationOutro: 0,

  // Body class
  bodyClass: null,

  // JS loaded
  js: [],

  
  initialize: function () {
    this.render();
  },

  // Load the JS by js array, libs is in core/View.js
  loadJS: function (cb) {

    var self = this;
    var count = 0;
    _.each(self.js, function (lib) {
      var tag = document.createElement("script");
      tag.src = 'js/' + self.libs['js'][lib];
      document.getElementsByTagName("head")[0].appendChild(tag);
      count++;
    });

    if (count == self.libs.length) {
      cb(true);
    };
  },

  // Load the hbs
  load: function (data, cb) {

    var self = this;

    $.ajax({
      url: "views/" + this.tpl + ".hbs",
    }).done(function (hbs) {
      
      var tpl = Handlebars.compile(hbs);  
      $(self.tagName).append('<div class="page page-' + self.pageName + '">' + tpl(data) + '</div>');
      cb(null, true)
    });
  },

  // Render the page
  render: function (data) {
    
    var self = this;

    self.load(data, function () {
      self.setPageClass();
      self.app.apply(self, arguments);
    });
    
    self.loadJS(function (res) {
    });

    setTimeout(function(){
      
      self.deleteOldPage();

    }, self.timingAnimationIntro);
  },

  // Apply when template is loaded, allow execute some code for this page.
  app: function () {},

  setPageClass: function () {

    var self = this;

    if (YoloJS.previousPage != null) {
      $('.page-' + YoloJS.previousPage).addClass('hide');
    };

    $(self.tagName + ' .page-' + self.pageName).addClass('show');
  },

  deleteOldPage: function () {

    var self = this;

    $('.page-' + YoloJS.previousPage).remove();

    YoloJS.previousPage = self.pageName;
  }
});

View.extend = extend;