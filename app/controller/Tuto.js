var tutoView = YoloJS.View.extend({

  // Config
  tagName: '#app',
  pageName: "tuto",
  tpl: 'tuto',
  timingAnimationIntro: 1000,

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

  next: function (index)
  {
    
    // Section
    if(this.current <= this.total)
    {
      // Update
      this.current++;

      // Leave previous
      var previous = $('.tuto-content[data-step='+(this.current-1)+'], .tuto-title[data-step='+(this.current-1)+']');
      previous.addClass('hide').removeClass('show');

      // Add next
      var next = $('.tuto-content[data-step='+this.current+'], .tuto-title[data-step='+this.current+']');
      next.addClass('show').removeClass('hide');
      if(next.attr('data-init')){ this[next.attr('data-init')]; }
    }

    // 
    else
    {

    }

  },


  // Choice

  initChoice: function ()
  {

    var selectedChoice = null;

    $('.choices .choice').on('click', function (e)
    {
      e.preventDefault();

      if($(this).attr('data-help') != selectedChoice)
      {
        // Selected
        selectedChoice = $(this).attr('data-help');

        // Active state
        $('.choice').removeClass('active');
        $(this).addClass('active');

        // Texts
        $('.confirm .texts p').removeClass('show').addClass('hide');
        $('.confirm .texts p.' + selectedChoice).addClass('show').removeClass('hide');

        // Button
        $('.btn.disabled').removeClass('disabled');
      }
    });


    $('#confirm-button').on('click', function (e) {
      e.preventDefault();
      Daredevil.navigation = selectedChoice;

      if (selectedChoice == "webcam") {
        new webcamView();
      } else {
        Daredevil.router.navigate('/game');
      }
    });

  },
});