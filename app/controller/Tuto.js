var tutoView = YoloJS.View.extend({

  // Config
  tagName: '#app',
  pageName: "tuto",
  tpl: 'tuto',
  timingAnimationOutro: 3000,

  // Vue
  current: 1,
  total: 3,

  app: function () {

    // Reference
    var that = this;

    // Controls
    $('.btn.btn-next').on('click', function (e)
    {
      e.preventDefault();
      if(!$(this).hasClass('disabled')){ that.next(); }
    });

  },

  // Next
  next: function ()
  {
    
    // Section
    if(this.current < this.total)
    {
      // Update
      this.current++;

      // Leave previous
      var previous = $('.tuto-content[data-step='+(this.current-1)+'], .tuto-title[data-step='+(this.current-1)+']');
      previous.addClass('hide').removeClass('show');

      // Add next
      var next = $('.tuto-content[data-step='+this.current+'], .tuto-title[data-step='+this.current+']');
      if(next.get(1) && next.get(1).getAttribute('data-init'))
      {
        this[next.get(1).getAttribute('data-init')](function ()
        {
          // Show
          next.addClass('show').removeClass('hide');
        });
      }
      else
      {
        // Show
        next.addClass('show').removeClass('hide');
      }
    }

    // Game
    else
    {
      // Transition
      $('.tuto-title.show').addClass('hide').removeClass('show');
      $('.tuto-content.show').addClass('hide').removeClass('show');

      // Next
      console.log(Daredevil.navigation);
      if(Daredevil.navigation == "webcam"){ new webcamView(); }
      else
      {
        if(!Daredevil.map){ new loadingGameView();  }
        else{ Daredevil.router.navigate('/game'); }
      }
    }

  },


  // Choice
  initChoice: function (callback)
  {

    // Reference
    var self = this;

    // Choice
    Daredevil.navigation = null;

    // Selection
    $('.choices .choice').on('click', function (e)
    {
      e.preventDefault();

      if($(this).attr('data-help') != Daredevil.navigation)
      {
        // Selected
        Daredevil.navigation = $(this).attr('data-help');

        // Active state
        $('.choice').removeClass('active');
        $(this).addClass('active');

        // Button
        $('.tuto-choice .btn.disabled').removeClass('disabled');
      }
    });

    // Callback
    callback();

  },


  // Commands
  initCommands: function (callback)
  {

    // Content
    var contents = {
      webcam: '<div class="tuto-command"><h3>Move</h3><p>Turn your head on left, right or top <strong>down</strong> to steer you in the right direction and catch up the kidnapper.</p></div><div class="tuto-command"><h3>Pause</h3><p>Just open your eyes to pause the game.</p></div>',
      keyboard: '<div class="tuto-command"><h3>Move</h3><p>Maintain the left, ahead or right key down to steer yourself. You must maintain the key pressed on the kidnapper direction.</p></div><div class="tuto-command"><h3>Pause</h3><p>Just open your eyes to pause the game.</p></div>'
    };
    $('.tuto-commands').prepend($(contents[Daredevil.navigation]));

    // Callback
    callback();

  },

});