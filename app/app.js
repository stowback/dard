var Yolo = YoloJS.Daredevil.extend({
  tpl: ['about', 'tuto', 'final', 'game', 'goal', 'help', 'home', 'intro', 'loading', 'webcam', 'win'],
  tplLoaded: []
});

var Daredevil = app = new Yolo();

$(function () {

  var router = new Router();

  router.config();

  router.add(/intro/, function () {
    
    new introView();
  });

  router.add(/game/, function () {

    if (Daredevil.map != null) {
      new gameView(); 
    } else {
      new loadingGameView();
    }
  });

  router.add(/configuration/, function () {

    new tutoView();
  });

  router.add(/loading/, function () {

    new loadingGameView();
  });

  router.add(/final/, function () {

    new finalView();
  });

  router.add(/win/, function () {

    new winView();
  });

  router.add(function() {

    new homeView();
  });


  router.listen();
  
  Daredevil.router = router;

});