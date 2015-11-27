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

    if (YoloJS.previousPage == null) {
      this.timingAnimationIntro = 0;
    };

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

    var self = this,
        tpl;

    var html = app.tplLoaded[self.tpl];

    if (html) {

      self.templating(self.compile(html), data)
      cb(null, true);
    } else {

      $.ajax({
        url: "views/" + this.tpl + ".hbs",
      }).done(function (hbs) {

        app.tplLoaded[self.tpl] = hbs;

        self.templating(self.compile(hbs), data);
        cb(null, true);
      });
    }
  },

  compile: function (html) {

    return Handlebars.compile(html);
  },

  templating: function (template, data) {

    var self = this;

    $(self.tagName).append('<div class="page page-' + self.pageName + '">' + template(data) + '</div>');
  }, 

  // Render the page
  render: function (data) {
    
    var self = this,
        animationOutro;

    self.load(data, function () {
      
    
      self.loadJS(function (res) {
        self.app.apply(self, arguments);
      });

      if (YoloJS.previousPage) {
        $('.page-' + YoloJS.previousPage.pageName).addClass('hide');
        animationOutro = YoloJS.previousPage.timingAnimationOutro;
      } else {
        animationOutro = 0;
      }

      setTimeout(function(){
        self.setPageClass();
        self.deleteOldPage();

      }, animationOutro);

    });
  },

  // Apply when template is loaded, allow execute some code for this page.
  app: function () {},

  setPageClass: function () {

    var self = this;

    $(self.tagName + ' .page-' + self.pageName).addClass('show');
  },

  deleteOldPage: function () {

    var self = this;

    if (YoloJS.previousPage) {
      $('.page-' + YoloJS.previousPage.pageName).remove();
    };

    YoloJS.previousPage = self;
  },

  getTpl: function (tpl, data) {

    var hbs = YoloJS.tplLoaded[tpl],
        self = this;

    if (hbs) {
      return self.compile()
    };
  } 
});

View.extend = extend;