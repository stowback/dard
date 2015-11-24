  var finalView = YoloJS.View.extend({

    tagName: '#app',
    tpl: 'final',
    timingAnimationIntro: 1000,
    pageName: 'final',

    app: function () {

      $(".countdown").countdown("2016/01/01", function(event) {
        $this = $(this);
        $this.empty();

        var offset = event.offset;

        $.each(offset.seconds.toString(), function (index, item) {
          $this.append('<span>' + item + '</span>');
        });
      });
    }
  });