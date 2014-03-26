window.onload = function () {
  'use strict';

  var app = window['daymap']

  var w = window.innerWidth * window.devicePixelRatio
    , h = window.innerHeight * window.devicePixelRatio

  // Never wider than 1920px
  var appW, appH

  app.Globals.size.width = appW = 1920
  app.Globals.size.height = appH = h * (1920 / w)
  console.log('Game canvas size is: ' + appW + ' x ' + appH)
    
  var game = new Phaser.Game(appW, appH, Phaser.AUTO, 'daymap-game')
  game.state.add('boot', app.Boot)
  game.state.add('preloader', app.Preloader)
  game.state.add('game', app.Game)

  game.state.start('boot')
};
