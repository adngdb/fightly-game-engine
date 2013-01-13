require(['src/fightly', 'config/config'], function (
          fightly,       config
) {
    var F = new fightly(config);
    F.init();
});
