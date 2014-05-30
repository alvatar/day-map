(function () {
  'use strict';

  function Boot() {}

  Boot.prototype = {
    preload: function () {
      this.load.image('preloader', 'assets/preloader.png')
      this.load.image('littleBird', 'assets/little_bird.png')
      this.load.image('littleBird', 'assets/loading.png')
      this.load.image('loading', 'assets/loading.png')
      // Force a background tilesprite only if we are on mobile
      if (this.game.device.desktop) {
        this.load.image('appStoreBackground', 'assets/appstores_background.png')
        this.load.image('appStore', 'assets/app_store.png')
        this.load.image('googlePlay', 'assets/google_play.png')
        this.load.spritesheet('startTryOut', 'assets/start_tryout.png', 550, 208)
      } else {
        this.load.image('webBackground', 'assets/web_bg.png')
      }
    },

    create: function () {
      this.game.input.maxPointers = 1

      if (this.game.device.desktop) {
        this.game.scale.forceLandscape = true;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        //this.game.scale.fullscreenScaleMode = Phaser.ScaleManager.SHOW_ALL
        this.game.scale.setShowAll();
        this.game.scale.setScreenSize(true);
      } else {
        this.game.scale.forceLandscape = true
        this.game.scale.pageAlignHorizontally = true
        this.game.scale.pageAlignVertically = true;
        this.game.scale.setExactFit();
        this.game.scale.setScreenSize(true)

        // Work around?
        this.game.add.sprite(0,0,'')
      }
      this.game.state.start('preloader')
    }
  };

  window['daymap'] = window['daymap'] || {};
  window['daymap'].Boot = Boot;

}());

