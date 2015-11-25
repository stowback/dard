/**
 * Intro ViewController
 * /intro
 */

var introView = YoloJS.View.extend({

  tagName: '#app',
  pageName: 'intro',
  tpl: 'intro',
  timingAnimationIntro: 3000,

  app: function () {
    $page = $('.page-'+this.pageName);
    var player = $page.find('video.video-intro').get(0);
    setTimeout(function (){
      player.play();
      $('.skip-btn').css('display', 'block');
    }, 2000);

    player.onended = function () {
      endVideoIntro();
    }

    $('.video-intro').on('click', function (e)
    {
      e.preventDefault();

      endVideoIntro();
    });

    // Start event
    $(document).on('keyup', function () {
      // Pause video
      player.pause();

      endVideoIntro();
    });
  }
});


// End video Intro
function endVideoIntro() {



  Daredevil.router.navigate('/configuration');
}