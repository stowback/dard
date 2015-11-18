var View = YoloJS.View = function (options) {
  this.initialize.apply(this, arguments);
};

_.extend(View.prototype, {

  tagName: 'div',
  tpl: null,

  render: function () {
    return this;
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
    return this.load(data);
  }
});

View.extend = extend;