  var finalView = YoloJS.View.extend({

    tagName: '#app',
    tpl: 'final',
    timingAnimationIntro: 1000,
    pageName: 'final',

    app: function () {

      $(".countdown").countdown("2016/01/01", function(event) {
        $this = $(this);

        var offset = event.offset;

        var $days = $this.find('.days');
        $days.find('.replace').empty();
        if (offset.totalDays.toString().length < 2) {
          $days.find('.replace').append('<span>0</span>');
        };
        $.each(offset.totalDays.toString().split(''), function (index, item) {
          $days.find('.replace').append('<span>' + item + '</span>');
        });

        var $hours = $this.find('.hours');
        $hours.find('.replace').empty();
        if (offset.hours.toString().length < 2) {
          $hours.find('.replace').append('<span>0</span>');
        };
        $.each(offset.hours.toString().split(''), function (index, item) {
          $hours.find('.replace').append('<span>' + item + '</span>');
        });

        var $minutes = $this.find('.minutes');
        $minutes.find('.replace').empty();
        if (offset.minutes.toString().length < 2) {
          $minutes.find('.replace').append('<span>0</span>');
        };
        $.each(offset.minutes.toString().split(''), function (index, item) {
          $minutes.find('.replace').append('<span>' + item + '</span>');
        });

        var $seconds = $this.find('.seconds');
        $seconds.find('.replace').empty();
        if (offset.seconds.toString().length < 2) {
          $seconds.find('.replace').append('<span>0</span>');
        };
        $.each(offset.seconds.toString().split(''), function (index, item) {
          $seconds.find('.replace').append('<span>' + item + '</span>');
        });

      });
    }
  });