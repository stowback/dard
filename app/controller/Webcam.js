var webcamView = YoloJS.View.extend({


  // Global
  tagName: '#app',
  pageName: "wbecam",
  tpl: 'webcam',
  timingAnimationOutro: 0,


  // App
  app: function ()
  {

    // Allow
    $(document).on(
    {
      allowWebcam: function ()
      {
        // Try webcam stream
        try
        {
          navigator.getUserMedia_({
            video: true,
            audio: false
          }, startStream, function () {
            $.event.trigger({
              type: "notAllowWebcam",
            });
          });
        }
        catch (e)
        {
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

        // Start stream
        startStream();

        // Redirect
        if(!Daredevil.map){ new loadingGameView();  }
        else{ Daredevil.router.navigate('/game'); }
      } 
    });
  }

});