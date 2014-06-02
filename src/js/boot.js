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
        this.load.image('start', 'assets/start.png')
        this.load.image('startMoving', 'assets/start_moving.png')
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
        // Automatically start preloader if on Desktop platform
        this.game.state.start('preloader')
      } else {
        this.game.scale.forceLandscape = true
        this.game.scale.pageAlignHorizontally = true
        this.game.scale.pageAlignVertically = true;
        this.game.scale.setExactFit();
        this.game.scale.setScreenSize(true)

        // Why we do this for mobile devices?
        // A bug in iOS requires that there is some input before loading Audio
        this.backgroundTile = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'webBackground')
        this.backgroundTile.scale.set(2.0, 2.0)
        this.startMoving = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'startMoving' )
        this.startMoving.anchor.set(0.5, 0.5)
        this.game.add.tween( this.startMoving )
            .to( { angle: 360 }, 40000, Phaser.Easing.Linear.In, true, 0, Number.MAX_VALUE, false)
        this.startButton = this.game.add.button(
          this.game.world.centerX, this.game.world.centerY, 'start'
          , function() {
            this.game.add.tween(this.startMoving.scale).to( { x: 1.6, y: 1.6} , 600, Phaser.Easing.Quadratic.Out, true)
            this.game.add.tween(this.startButton.scale).to( { x: 1.6, y: 1.6} , 600, Phaser.Easing.Quadratic.Out, true)
            this.game.add.tween(this.startMobileGroup).to( { alpha: 0 } , 600, Phaser.Easing.Quadratic.Out, true)
                .onComplete.add(function(){
                  this.game.state.start('preloader')
                }, this)
          }
          , this, 0, 0, 0)
        this.startButton.anchor.set(0.5, 0.5)
        this.startMobileGroup = this.game.add.group()
        this.startMobileGroup.add( this.startMoving )
        this.startMobileGroup.add( this.startButton )
      }
    }
  };

  window['daymap'] = window['daymap'] || {};
  window['daymap'].Boot = Boot;

}());

