var configurationView = YoloJS.View.extend({

  tagName: '#app',
  pageName: "configuration",
  tpl: 'configuration',
  timingAnimationIntro: 5000,

  app: function () {

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


    // $('.choices .choice').on({
      
    //   mouseenter: function () {

    //     if (selectedChoice != null) {
    //       return false;
    //     };

    //     $(this).addClass('selected');

    //     $('.choices-help p').removeClass('show');
    //     $('.choices-help p#' + $(this).data('help')).addClass('show');
    //   },

    //   mouseleave: function () {

    //     if (selectedChoice != null) {
    //       return false;
    //     };

    //     $(this).removeClass('selected');

    //     $('.choices-help p').removeClass('show');
    //     $('.choices-help p#default').addClass('show');
    //   },

    //   click: function () {

    //     if (selectedChoice != null) {
    //       $('.choices .choice').removeClass('selected');
    //       selectedChoice = null;
    //       $('#configuration-btn').addClass('disabled');
    //       return false;
    //     };

    //     selectedChoice = $(this).data('help');

    //     $('#configuration-btn').removeClass('disabled');

    //     $(this).addClass('selected');
    //     $('.choices-help p').removeClass('show');
    //     $('.choices-help p#' + selectedChoice).addClass('show');
    //   }

    // });

    // $('#configuration-btn').click(function () {
    //   Daredevil.navigation = selectedChoice;

    //   if (selectedChoice == "webcam") {
    //     new webcamView();
    //   } else {
    //     Daredevil.router.navigate('/game');
    //   }
    // });
  }
});