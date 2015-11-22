var configurationView = YoloJS.View.extend({

  tagName: '#app',
  pageName: "configuration",
  tpl: 'configuration',
  timingAnimationIntro: 1000,

  app: function () {

    var selectedChoice = null;

    $('.choices .choice').on({
      
      mouseenter: function () {

        if (selectedChoice != null) {
          return false;
        };

        $(this).addClass('selected');

        $('.choices-help p').removeClass('show');
        $('.choices-help p#' + $(this).data('help')).addClass('show');
      },

      mouseleave: function () {

        if (selectedChoice != null) {
          return false;
        };

        $(this).removeClass('selected');

        $('.choices-help p').removeClass('show');
        $('.choices-help p#default').addClass('show');
      },

      click: function () {

        if (selectedChoice != null) {
          $('.choices .choice').removeClass('selected');
          selectedChoice = null;
          return false;
        };

        selectedChoice = $(this).data('help');

        $(this).addClass('selected');
        $('.choices-help p').removeClass('show');
        $('.choices-help p#' + selectedChoice).addClass('show');
      }

    });
  }
});