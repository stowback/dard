/**
 * Initialize the framework YoloJS
 * tpl for load the HBS file before everything is called
 */
var Yolo = YoloJS.Daredevil.extend({
  tpl: ['about', 'tuto', 'final', 'game', 'goal', 'help', 'home', 'intro', 'loading', 'webcam', 'win', 'clue', 'finish'],
  tplLoaded: []
});

// New instance of our framework
var Daredevil = app = new Yolo();

$(function () {

  // New router
  var router = new Router();

  router.config();

  router.add(/intro/, function () {
    
    new introView();
  });

  router.add(/game/, function () {
    if (Daredevil.map != null) {
      new gameView(); 
    } else {
      Daredevil.router.navigate('/configuration');
    }
  });

  /**
   * GET /configuration
   */
  router.add(/configuration/, function () {

    new tutoView();
  });

  /**
   * GET /loading
   */
  router.add(/loading/, function () {

    new loadingGameView();
  });

  /**
   * GET /final
   */
  router.add(/about/, function () {

    new finalView();

  });

  /**
   * GET /win
   */
  router.add(/win/, function () {

    new winView();
  });

  /**
   * GET /
   */
  router.add(function() {

    new homeView();
  });

  /**
   * Listen the URL change
   */
  router.listen();
  
  // Put router in our Object
  Daredevil.router = router;

});