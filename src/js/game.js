(function() {
  'use strict';

  function Game() {
  }

  Game.prototype = {

    create: function () {
      this.game.world.setBounds(0, 0, 1920, 5760)
      this.game.add.sprite(0, 0, 'background')

      // Header title
      var headerCloudsSprite = this.game.add.sprite(this.game.world.centerX, 500, 'headerClouds')
      headerCloudsSprite.anchor.set(0.5, 0.5)

      var littleBirdSprite = this.game.add.sprite( this.game.world.width, 500, 'littleBird' )
      littleBirdSprite.scale.set(0.5, 0.5)
      this.game.add.tween(littleBirdSprite)
          .to( { y: 540 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, Number.MAX_VALUE, true)
      this.game.add.tween(littleBirdSprite)
          .to( { x: -600 }, 20000, Phaser.Easing.Linear.In, true, 0, Number.MAX_VALUE, false)

      var littleBirdSprite2 = this.game.add.sprite( this.game.world.width + 340, 500, 'littleBird' )
      littleBirdSprite2.scale.set(0.35, 0.35)
      this.game.add.tween(littleBirdSprite2)
          .to( { y: 550 }, 1500, Phaser.Easing.Quadratic.InOut, true, 0, Number.MAX_VALUE, true)
      this.game.add.tween(littleBirdSprite2)
          .to( { x: -400 }, 20000, Phaser.Easing.Linear.In, true, 0, Number.MAX_VALUE, false)

      var littleBirdSprite3 = this.game.add.sprite( this.game.world.width + 440, 500, 'littleBird' )
      littleBirdSprite3.scale.set(0.25, 0.25)
      this.game.add.tween(littleBirdSprite3)
          .to( { y: 640 }, 800, Phaser.Easing.Quadratic.InOut, true, 0, Number.MAX_VALUE, true)
      this.game.add.tween(littleBirdSprite3)
          .to( { x: -100 }, 20000, Phaser.Easing.Linear.In, true, 0, Number.MAX_VALUE, false)
      
      var headerTextSprite = this.game.add.sprite(this.game.world.centerX, 500, 'headerText')
      headerTextSprite.anchor.set(0.5, 0.5)

      // Questions
      var text1Sprite = this.game.add.sprite(this.game.world.centerX, 1200, 'text1')
      text1Sprite.anchor.set(0.5, 0.5)
      this.game.add.button(60, 1350, 'text1_1', null, null, 2, 1, 0)
      this.game.add.button(500, 1350, 'text1_2', null, null, 2, 1, 0)
      this.game.add.button(1200, 1350, 'text1_3', null, null, 2, 1, 0)

      var text2Sprite = this.game.add.sprite(this.game.world.centerX, 1750, 'text2')
      text2Sprite.anchor.set(0.5, 0.5)
      var text2$1Sprite = this.game.add.button(this.game.world.centerX, 1920, 'text2_1', null, null, 2, 1, 0)
      text2$1Sprite.anchor.set(0.5, 0.5)

      var text3Sprite = this.game.add.sprite(this.game.world.centerX, 2300, 'text3')
      text3Sprite.anchor.set(0.5, 0.5)

      var text4Sprite = this.game.add.sprite(this.game.world.centerX, 2850, 'text4')
      text4Sprite.anchor.set(0.5, 0.5)

      var text5Sprite = this.game.add.sprite(this.game.world.centerX, 3400, 'text5')
      text5Sprite.anchor.set(0.5, 0.5)

      var text6Sprite = this.game.add.sprite(this.game.world.centerX, 3950, 'text6')
      text6Sprite.anchor.set(0.5, 0.5)

      var text7Sprite = this.game.add.sprite(this.game.world.centerX, 4500, 'text7')
      text7Sprite.anchor.set(0.5, 0.5)

      var text8Sprite = this.game.add.sprite(this.game.world.centerX, 5050, 'text8')
      text8Sprite.anchor.set(0.5, 0.5)

      this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function () {
      if (this.cursors.up.isDown) {
        this.game.camera.y -= 40;
      } else if (this.cursors.down.isDown) {
        this.game.camera.y += 40;
      }

      if (this.cursors.left.isDown) {
        this.game.camera.x -= 40;
      } else if (this.cursors.right.isDown) {
        this.game.camera.x += 40;
      }
    }

  };

  window['daymap'] = window['daymap'] || {}
  window['daymap'].Game = Game

}());
