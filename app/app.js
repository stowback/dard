$(function () {
  var router = new Router();

  router.config();

  router.add(/about/, function () {
    new aboutView();
  });

  router.add(/experience/, function () {
    console.log("salut")
  });

  router.add(/tuto/, function () {
    new tutoView();

    $(document).on('lookLeft', function () {
      console.log("left ta mere")
    });
  });

  router.add(/game/, function () {
    
    var g = new gameView();

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

  var tutoView = YoloJS.View.extend({
  
    tagName: '#app',
    tpl: 'tuto',
    timingAnimationIntro: 1000,
    js: ['visageSDK', 'visage', 'bezier']
  });

  var gameView = YoloJS.View.extend({

    tagName: '#app',
    tpl: 'game',
    timingAnimationIntro: 1000,
    bodyClass: 'game'
  });
});