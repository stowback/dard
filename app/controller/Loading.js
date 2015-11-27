var loadingGameView = YoloJS.View.extend({

  tagName: '#app',
  pageName: "loading",
  tpl: 'loading',
  timingAnimationIntro: 2800,
  // js: ['GameSound', 'MapSound', 'CharacterSound', 'DistrictSound'],

  app: function () {
    
    // Request
    var jsonCall = $.getJSON('js/sound-engine/config.json');
    
    // Success
    jsonCall.success(function (data)
    {
      
      // Store
      config = data;

      // Create map
      Daredevil.map = new Map(config);

      // Init
      Daredevil.map.init(
        function (progress, state){ console.log(progress + ' | ' + state); },
        function (){ alert('chargé');
         },
        function (error){ console.log(error); });
    });

    // Error
    jsonCall.error(function (err){ console.log(err); });
    
  }
});