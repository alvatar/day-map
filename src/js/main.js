window.onload = function () {
  'use strict';

  var game
    , ns = window['daymap']

  game = new Phaser.Game(1024, 768, Phaser.AUTO, 'daymap-game')
  game.state.add('boot', ns.Boot)
  game.state.add('preloader', ns.Preloader)
  game.state.add('game', ns.Game)

  game.state.start('boot')
};
