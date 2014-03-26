(function() {
  'use strict';

  function Preloader() {
    this.asset = null
    this.ready = false
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloader')
      this.asset.anchor.setTo(0.5, 0.5)
      
      this.load.image('background', 'assets/background.png')
      this.load.image('headerClouds', 'assets/header_clouds.png')
      this.load.image('headerText', 'assets/header_text.png')
      this.load.image('littleBird', 'assets/little_bird.png')

      this.load.onLoadComplete.addOnce(function(){ this.ready = true }, this)
      this.load.setPreloadSprite(this.asset)
    },

    create: function () {
      this.asset.cropEnabled = false
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('game')
      }
    }
  };

  window['daymap'] = window['daymap'] || {}
  window['daymap'].Preloader = Preloader

}());
