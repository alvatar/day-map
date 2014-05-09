(function () {
  'use strict';

  function Boot() {}

  Boot.prototype = {
    preload: function () {
      this.load.image('preloader', 'assets/preloader.gif')
    },

    create: function () {
      this.game.input.maxPointers = 1
      this.game.stage.backgroundColor = '#1f5e41'
      // this.game.stage.disableVisibilityChange = true

      if (this.game.device.desktop) {

        /*
        this.game.scale.maxWidth = 1920;
        this.game.scale.maxHeight = window.innerHeight * window.devicePixelRatio *
                                  ( 1920 / (window.innerWidth * window.devicePixelRatio) )
                                  */
        /*
        var winH = window.innerHeight * window.devicePixelRatio
          , winW = window.innerWidth * window.devicePixelRatio 
        if( (winW / winH) > 1.5 ) {
          this.game.scale.maxHeight = winH
          this.game.scale.maxWidth = winH * 1.5
        }

        */

        this.game.scale.forceLandscape = true;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        //this.game.scale.fullscreenScaleMode = Phaser.ScaleManager.SHOW_ALL
        this.game.scale.setShowAll();
        this.game.scale.setScreenSize(true);
      } else {
        //this.game.scale.minWidth =  480
        //this.game.scale.minHeight = 260
        // this.game.scale.maxWidth = 640
        // this.game.scale.maxHeight = 480
        this.game.scale.forceLandscape = true
        this.game.scale.pageAlignHorizontally = true
        this.game.scale.pageAlignVertically = true;
        //this.game.scale.fullscreenScaleMode = Phaser.ScaleManager.SHOW_ALL
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

