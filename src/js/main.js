window.onload = function () {
  'use strict';

  var app = window['daymap']

  var appW, appH, game
  /*
  if ( typeof window.ontouchstart !== 'undefined' || // If touch device ||
       navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)
      ) {
      */
  if( jscd.mobile || jscd.browser.match(/Ludei/i) ) {
    var winH = window.innerHeight * window.devicePixelRatio
      , winW = window.innerWidth * window.devicePixelRatio
    //app.Globals.size.width = appW = Math.max(winH, winW)
    app.Globals.size.width = appW = 1920
    var ratio = Math.max(winH, winW) / Math.min(winH, winW)
    // Clamp ratio, and stretch ratios beyond that
    if( ratio > 1.55 ) {
      ratio = 1.55
    } else if ( ratio < 1.45 ) {
      ratio = 1.45
    }
    app.Globals.size.height = appH = appW / ratio
    game = new Phaser.Game(appW, appH, Phaser.CANVAS, '')
  } else {
    app.Globals.size.width = appW = 1920
    app.Globals.size.height = appH = 1920 / 1.5
    game = new Phaser.Game(appW, appH, Phaser.CANVAS, '', null, true)
  }

  game.state.add('boot', app.Boot)
  game.state.add('preloader', app.Preloader)
  game.state.add('game', app.Game)

  game.state.start('boot')
}
