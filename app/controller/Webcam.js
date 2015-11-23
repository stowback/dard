var webcamView = YoloJS.View.extend({

  tagName: '#app',
  pageName: "wbecam",
  tpl: 'webcam',
  timingAnimationIntro: 1000,
  js: ['bezier', 'visage', 'visageSDK'],

  app: function () {
    $(document).on({
      lookLeft: function () {
        console.log("coucou")
      },

      allowWebcam: function () {
        console.log("allowed")
        $('#continue-webcam').removeClass('disabled')
      } 
    });

    $('#continue-webcam').click(function () {
      Daredevil.router.navigate('/game');
    });
  }

});