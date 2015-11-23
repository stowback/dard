var gameView = YoloJS.View.extend({

  tagName: '#app',
  pageName: "game",
  tpl: 'game',
  timingAnimationIntro: 1000,

  app: function () {
    try {
      navigator.getUserMedia_({
        video: true,
        audio: false
      }, startStream, function () {
        $.event.trigger({
          type: "notAllowWebcam",
        });
      });
  } catch (e) {
    try {
      navigator.getUserMedia_('video', startStream, function () {
        $.event.trigger({
          type: "notAllowWebcam",
        });
      });
    } catch (e) {
      errorStream(e);
    }
  }
    startStream()
  }
});