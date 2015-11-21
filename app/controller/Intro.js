var introView = YoloJS.View.extend({

  tagName: '#app',
  pageName: 'intro',
  tpl: 'intro',
  timingAnimationIntro: 1000,

  app: function () {
    $page = $('.page-'+this.pageName);
    var player = $page.find('video.video-intro').get(0);
    player.play();

    player.onended = function () {
      endVideoIntro();
    }

    setTimeout(function () {
      $page.find('h2').fadeIn();
    }, 10000)

    $(document).on('keyup', endVideoIntro);
  }
});


function endVideoIntro() {
  Daredevil.router.navigate('/configuration');
}