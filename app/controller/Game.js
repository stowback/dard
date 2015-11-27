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
    this.game.callbacks.onWin = function (data){ self.getFinish(self.game.map.config.messages.win); };

    // Lose
    this.game.callbacks.onLose = function (data){ self.getFinish(self.game.map.config.messages.lose); };

    // Clue
    this.game.callbacks.onClue = function (data){ self.getClue(data); };

    // Webcam
    if (Daredevil.navigation == "webcam") {

      $(document).on({
        lookLeft: function() { self.game.setDaredevilMove("left"); },
        lookRight: function () { self.game.setDaredevilMove("right"); },
        lookCenter: function () { self.game.setDaredevilMove("center"); }
      });
    }

    // Keyboard
    else
    {
      $(window).on('keydown', function (e)
      {  
        switch(e.keyCode) {
          case 37: self.game.setDaredevilMove("left"); break;
          case 39: self.game.setDaredevilMove("right"); break;
          case 32:
            // Pause 
            if(!self.game.pause && !self.game.clue)
            {
              self.game.setPause(true);
              $('.game-pause').addClass('show').removeClass('hide');
            }

            // Resume
            else if(self.game.pause && !self.game.clue)
            {
              self.game.setPause(false);
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


  // Finish
  getFinish: function (data)
  {
    alert('helo');
    // Reference
    var self = this;

    // Template
    this.getTpl('finish', data, function (template)
    {
      // Elem
      var elem = $(template);
      $('.page-game').append($(template));
      elem = $('.page-finish');

      // Show
      elem.addClass('show').removeClass('hide');

      // Action
      elem.find('.btn.btn-again').on('click', function (e)
      {
        e.preventDefault();
        elem.addClass('hide').removeClass('show');
        setTimeout(function (){ new gameView(); }, 2000);
      });
    });

  },


});