var introView = YoloJS.View.extend({

  tagName: '#app',
  pageName: 'intro',
  tpl: 'intro',
  timingAnimationIntro: 1000,

  app: function () {
    var player = $('.page-'+this.pageName).find('video.video-intro').get(0);
    player.play();
  }
});


function endVideo() {
  router.navigate('/configuration');
}