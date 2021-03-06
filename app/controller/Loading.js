var loadingGameView = YoloJS.View.extend({

  // Global
  tagName: '#app',
  pageName: "loading",
  tpl: 'loading',
  timingAnimationIntro: 2800,
  // js: ['GameSound', 'MapSound', 'CharacterSound', 'DistrictSound'],
  

  // Properties
  currentLoading: 0,


  // DOM
  container: null,


  // App
  app: function () {

    // Self
    var self = this;

    // DOM
    this.container = $('.loading-container');

    // Start
    this.setLoading("Downloading datas");
    
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
        function (message){ self.setLoading(message); },
        function ()
        {
          setTimeout(function () 
          {
            self.setLoading("Initialisation of paths"); 
            self.next();
          }, 2500);
        },
        function (error){ self.loading("Unfortunately, an error occured"); });
    });

    // Error
    jsonCall.error(function (err){ console.log(err); });

    
  },


  // Loading
  setLoading: function (message)
  {

    // Remove previous
    this.container.find('.loading-message.active').removeClass('active').addClass('old');

    // Message
    var message = $('<span class="loading-message active">' + message + '</span>');
    this.container.append(message);

    // Offset
    this.container.css('transform', 'translate3d(0, '+(-this.currentLoading*100)+'px, 0)');

    // Current
    this.currentLoading++;

  },


  // Next
  next: function ()
  {

    // Reference
    var self = this;

    // Webcam
    if(Daredevil.navigation == "webcam")
    {

      StartTracker();

      var closeEyes = _.debounce(function () {

        // Remove event
        $(document).off('eyesOpen');

        // Game
        Daredevil.router.navigate('/game');
      }, 1000);

      $(document).on('eyesOpen', closeEyes);

      setTimeout(function (){ self.setLoading("Maintain your eyes closed to start"); }, 2000);
    }

    // Keyboard
    else
    {
      // Event
      $(window).on('keyup', function (e)
      {
        if(e.keyCode == 32)
        {
          // Remove event
          $(window).off('keyup');

          // Game
          Daredevil.router.navigate('/game');
        }
      });

      // Message
      setTimeout(function (){ self.setLoading("Press space key to start"); }, 2000);
    }

  }


});