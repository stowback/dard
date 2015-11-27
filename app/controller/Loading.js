var loadingGameView = YoloJS.View.extend({

  tagName: '#app',
  pageName: "loading",
  tpl: 'loading',
  timingAnimationIntro: 2800,
  js: ['GameSound', 'MapSound', 'CharacterSound', 'DistrictSound'],

  app: function () {
    alert('loading');
    // Request
    // var jsonCall = $.getJSON('js/sound-engine/config.json');
    
    // // Success
    // jsonCall.success(function (data)
    // {
    //   console.log('config chargée');
    //   // Store
    //   config = data;

    //   // Create map
    //   Daredevil.map = new Map(config);

    //   // Init
    //   map.init(
    //     function (){ console.log('progress'); },
    //     function (){ alert("chargé") },
    //     function (error){ console.log(error); });
    // });

    // // Error
    // jsonCall.error(function (err){ console.log(err); });
    
  }
});