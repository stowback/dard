$(function () {
  var router = new Router();

  router.config();

  router.add(/intro/, function () {
    new introView();

    var checked = {
      left: false,
      right: false,
      center: false
    }

    var count = 0;

    if (!checked.left) {
      $(document).on('lookLeft', function () {
        count++;
        if (!checked.right && count == 3) {
          count = 0;
          checked.left = true;
          $(document).on('lookRight', function () {
            count++;
            if (!checked.center && count == 3) {
              count = 0;
              checked.right = true;
              $(document).on('lookCenter', function () {
                count++;
                if (count == 3) {
                  console.log("done :)");
                };
              });
            };
          });
        };
      });
    };
  });

  router.add(/game/, function () {
    
    var g = new gameView();

  });

  router.add(function() {
    new homeView();
  });

  router.listen();

});