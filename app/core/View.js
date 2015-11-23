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

  this.initialize.apply(this, arguments);
};

_.extend(View.prototype, {

  tagName: 'div',
  pageName: 'default',
  pageDiv: $(this.tagName).find('.' + this.pageName),
  tpl: null,
  timingAnimationIntro: 0,
  timingAnimationOutro: 0,
  bodyClass: null,
  js: [],

  initialize: function () {
    this.render();
  },

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

  render: function (data) {
    
    var self = this;



    self.load(data, function () {
      self.setPageClass();
      self.app.apply(self, arguments);
    });
    
    self.loadJS(function (res) {
      console.log("loaded")
    });

    setTimeout(function(){
      
      self.deleteOldPage();

    }, self.timingAnimationIntro);
  },

  app: function () {},

  setPageClass: function () {

    var self = this;

    if (Daredevil.previousPage != null) {
      $('.page-' + Daredevil.previousPage).addClass('hide');
    };

    $(self.tagName + ' .page-' + self.pageName).addClass('show');
  },

  deleteOldPage: function () {

    var self = this;

    $('.page-' + Daredevil.previousPage).remove();

    Daredevil.previousPage = self.pageName;
  }
});

View.extend = extend;