/**
 * Intro ViewController
 * /intro
 */

var introView = YoloJS.View.extend({

  tagName: '#app',
  pageName: 'intro',
  tpl: 'intro',
  timingAnimationOutro: 2000,

  app: function () {

    // DOM
    $page = $('.page-'+this.pageName);
    $player = $page.find('video.video-intro');

    // Launch
    setTimeout(function (){
      $player.get(0).play();
      $('.skip-btn').css('display', 'block');
    }, 2000);

    $('.skip-btn').click(function (e) {
      e.preventDefault();
    });


    $player.get(0).onended = function () { endVideoIntro(); };
    $('.video-intro').on('click', function (e)
    {
      e.preventDefault();
      endVideoIntro();
    });

  }
});


// End video Intro
function endVideoIntro() {
  $player.animate({ volume: 0 }, 2000);
  Daredevil.router.navigate('/configuration');
}