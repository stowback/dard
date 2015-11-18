var View = YoloJS.View = function (options) {
  this.initialize.apply(this, arguments);
};

_.extend(View.prototype, {

  tagName: 'div',
  tpl: null,
  timingAnimationIntro: 0,
  timingAnimationOutro: 0,

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

    console.log(self.timingAnimationIntro)

    return setTimeout(function(){
      self.load(data);
    }, self.timingAnimationIntro);
  }
});

View.extend = extend;