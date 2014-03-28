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

      this.load.image('text1', 'assets/text1.png')
      this.load.spritesheet('text1_1', 'assets/text1_1.png', 450, 152)
      this.load.spritesheet('text1_2', 'assets/text1_2.png', 700, 152)
      this.load.spritesheet('text1_3', 'assets/text1_3.png', 700, 145)

      this.load.image('text2', 'assets/text2.png')
      this.load.spritesheet('text2_1', 'assets/text2_1.png', 800, 145)

      this.load.image('text3', 'assets/text3.png')
      this.load.spritesheet('text3_1', 'assets/text3_1.png', 1000, 145)

      this.load.image('text4', 'assets/text4.png')
      this.load.spritesheet('text4_1', 'assets/text4_1.png', 900, 145)

      this.load.image('text5', 'assets/text5.png')
      this.load.image('text6', 'assets/text6.png')
      this.load.image('text7', 'assets/text7.png')
      this.load.image('text8', 'assets/text8.png')

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
