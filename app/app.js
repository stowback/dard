$(function () {
  var router = new Router();

  router.config();

  router.add(/about/, function () {
    new aboutView();
  });

  router.add(/experience/, function () {
    console.log("salut")
  });

  router.add(function () {
    console.log("test")
  });

  router.listen();

  var aboutView = YoloJS.View.extend({
  
    tagName: '#app',
    tpl: 'about',

    initialize: function () {
      this.render({name: "Arnaud"});
    }
  });
});