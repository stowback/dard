var loadingGameView = YoloJS.View.extend({

  tagName: '#app',
  pageName: "loading",
  tpl: 'loading',
  timingAnimationIntro: 1000,
  js: ['GameSound', 'MapSound', 'CharacterSound', 'DistrictSound'],

  app: function () {

    var jsonCall = $.getJSON('js/sound-engine/config.json');
    
    jsonCall.success(function (data){
      $('.cadre-content p').append('<br /> JSON loaded');

      // Store
      config = data;

      // Create map
      map = new Map(config);

      Daredevil.map = map;

      // Init
      map.init(
        function (){ console.log('progress'); },
        function ()
        {
          new gameView();
        },
        function (error){ console.log(error); });
    });
    jsonCall.error(function (err){ console.log(err); });
    
  }
});