window.onload = function () {
  'use strict';

  var app = window['daymap']

  //var winH = window.innerHeight * window.devicePixelRatio
    //, winW = window.innerWidth * window.devicePixelRatio 

  var appW, appH
  app.Globals.size.width = appW = 1920
  app.Globals.size.height = appH = 1920 / 1.5

  //app.Globals.size.width = appW = 1920
  //app.Globals.size.height = appH = Math.floor( winH * (1920 / winW) )
  //app.Globals.size.height = appH = Math.floor( winH * (1920 / winW) )
  //console.log('Game canvas size is: ' + appW + ' x ' + appH)
    
  var game = new Phaser.Game(appW, appH, Phaser.AUTO, 'daymap-game')
  game.state.add('boot', app.Boot)
  game.state.add('preloader', app.Preloader)
  game.state.add('game', app.Game)

  game.state.start('boot')
};
