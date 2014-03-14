(function () {
  'use strict';

  function Boot() {}

  Boot.prototype = {
    
    preload: function () {
      this.load.image('preloader', 'assets/preloader.gif');
    },

    create: function () {
      this.game.input.maxPointers = 1;
      this.game.stage.backgroundColor = '#fff'
      // this.game.stage.disableVisibilityChange = true;

      if (this.game.device.desktop) {
        //this.game.scale.fullscreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.setShowAll();
        this.game.scale.setScreenSize(true);
      } else {
        this.game.scale.fullscreenScaleMode = Phaser.StageScaleMode.SHOW_ALL;
        this.game.scale.minWidth =  480;
        this.game.scale.minHeight = 260;
        this.game.scale.maxWidth = 640;
        this.game.scale.maxHeight = 480;
        this.game.scale.forceLandscape = true;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.setScreenSize(true);
      }
      this.game.state.start('preloader');
    }
  };

  window['daymap'] = window['daymap'] || {};
  window['daymap'].Boot = Boot;

}());

