var View = YoloJS.View = function (options) {
  this.initialize.apply(this, arguments);
};

_.extend(View.prototype, {

  tagName: 'div',
  tpl: null,
  timingAnimationIntro: 0,
  timingAnimationOutro: 0,
  bodyClass: null,

  initialize: function () {
    this.render();
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
    }, self.timingAnimationIntro);
  },

  setBodyClass: function () {
    if (this.bodyClass) {
      $('body').removeClass().addClass(this.bodyClass);
    };
  }
});

View.extend = extend;