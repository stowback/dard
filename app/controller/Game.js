var gameView = YoloJS.View.extend({


  // Global
  tagName: '#app',
  pageName: "game",
  tpl: 'game',


  // App
  app: function ()
  {
    // Game
    var game = new Game(Daredevil.map);

    // Callbacks
    game.callbacks.onWin = function (data){ console.log(data); };
    game.callbacks.onLose = function (data){ console.log(data); };
    game.callbacks.onClue = function (data){ console.log(data); }; 

    // Webcam
    if (Daredevil.navigation == "webcam") {
      // try {
      //   navigator.getUserMedia_({
      //     video: true,
      //     audio: false
      //   }, startStream, function () {
      //     $.event.trigger({
      //       type: "notAllowWebcam",
      //     });
      //   });
      // } catch (e) {
      //   try {
      //     navigator.getUserMedia_('video', startStream, function () {
      //       $.event.trigger({
      //         type: "notAllowWebcam",
      //       });
      //     });
      //   } catch (e) {
      //     errorStream(e);
      //   }
      // }
      // startStream();

      // $(document).on({

      //   lookLeft: function() {
      //     console.log('gauche')
      //     game.setDaredevilMove("left");
      //   },

      //   lookRight: function () {
      //     console.log('right')
      //     game.setDaredevilMove("right");
      //   }

      // });
    }

    // Keyboard
    else
    {
      $(window).on('keydown', function (e)
      {  
        switch(e.keyCode) {
          case 37: game.setDaredevilMove("left"); break;
          case 39: game.setDaredevilMove("right"); break;
        }
      });
    }

    game.init(function ()
    {
      game.start();
    });
  },


});