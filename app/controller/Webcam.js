var webcamView = YoloJS.View.extend({


  // Global
  tagName: '#app',
  pageName: "wbecam",
  tpl: 'webcam',
  timingAnimationOutro: 0,
  js: ['bezier', 'visage', 'visageSDK'],


  // App
  app: function ()
  {
    alert('hello');
    // Allow
    $(document).on(
    {
      allowWebcam: function ()
      {
        alert('allowed');
      } 
    });
  }

});