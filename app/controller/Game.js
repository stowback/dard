var gameView = YoloJS.View.extend({


  // Global
  tagName: '#app',
  pageName: "game",
  tpl: 'game',


  // Properties
  game: null,

  // App
  app: function ()
  {

    // Self
    var self = this;

    // Game
    this.game = new Game(Daredevil.map);

    // Win
    this.game.callbacks.onWin = function (data){ console.log(data); };

    // Lose
    this.game.callbacks.onLose = function (data){ console.log(data); };

    // Clue
    this.game.callbacks.onClue = function (data){ self.getClue(data); };

    // Webcam
    if (Daredevil.navigation == "webcam") {

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
        console.log(e.keyCode);
        switch(e.keyCode) {
          case 37: self.game.setDaredevilMove("left"); break;
          case 39: self.game.setDaredevilMove("right"); break;
          case 32:
            // Pause 
            if(!self.game.pause && !self.game.clue)
            {
              // Update
              self.game.setPause(true);

              // Show
              $('.game-pause').addClass('show').removeClass('hide');
            }

            // Resume
            else if(self.game.pause && !self.game.clue)
            {
              // Update
              self.game.setPause(false);

              // Hide
              $('.game-pause').addClass('hide').removeClass('show');
            }
          break;
        }
      });
    }

    self.game.init(function ()
    {
      self.game.start();
    });
  },


  // Clue
  getClue: function (clue)
  {

    // Reference
    var self = this;

    // Template
    this.getTpl('clue', clue, function (template)
    {
      // Elem
      var elem = $(template);
      $('.page-game').append($(template));
      elem = $('.page-clue');

      // Show
      elem.addClass('show').removeClass('hide');

      // Action
      elem.find('.btn').on('click', function (e)
      {
        e.preventDefault();
        self.game.resume();
        elem.addClass('hide').removeClass('show');
        setTimeout(function (){ elem.remove(); }, 2000);
      });
    });

  },


});