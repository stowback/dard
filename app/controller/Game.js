var gameView = YoloJS.View.extend({


  // Global
  tagName: '#app',
  pageName: "game",
  tpl: 'game',


  // App
  app: function ()
  {

    // Self
    var self = this;

    // Game
    var game = new Game(Daredevil.map);

    // Win
    game.callbacks.onWin = function (data){ console.log(data); };

    // Lose
    game.callbacks.onLose = function (data){ console.log(data); };

    // Clue
    game.callbacks.onClue = function (data){ self.getClue(data); }; 

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


  // Clue
  getClue: function (clue)
  {

    // Template
    this.getTpl('clue', clue, function (template)
    {
      console.log(template);
    });

  },


});