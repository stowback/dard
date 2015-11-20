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

    var checked = {
      left: false,
      right: false,
      center: false
    }

    var count = 0;

    if (!checked.left) {
      $(document).on('lookLeft', function () {
        count++;
        if (!checked.right && count == 3) {
          count = 0;
          checked.left = true;
          $(document).on('lookRight', function () {
            count++;
            if (!checked.center && count == 3) {
              count = 0;
              checked.right = true;
              $(document).on('lookCenter', function () {
                count++;
                if (count == 3) {
                  console.log("done :)");
                };
              });
            };
          });
        };
      });
    };
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