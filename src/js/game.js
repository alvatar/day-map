(function() {
  'use strict';

  function Game() {
  }

  Game.prototype = {

    create: function () {
      this.game.world.setBounds(0, 0, 1920, 5760)
      this.game.add.sprite(0, 0, 'background')

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
          .to( { y: 670 }, 800, Phaser.Easing.Quadratic.InOut, true, 0, Number.MAX_VALUE, true)
      this.game.add.tween(littleBirdSprite3)
          .to( { x: -100 }, 20000, Phaser.Easing.Linear.In, true, 0, Number.MAX_VALUE, false)
      
      var headerTextSprite = this.game.add.sprite(this.game.world.centerX, 500, 'headerText')
      headerTextSprite.anchor.set(0.5, 0.5)


      /*
      var styleTitle = { font: '65px Arial', fill: '#ff0044', align: 'center' }
      var styleQuestions = { font: '38px Arial', fill: '#ff0044', align: 'center' }

      var title = this.game.add.text(this.game.world.centerX, 80, 'Day Map', styleTitle)
      title.anchor.set(0.5)

      var textQ1 = this.game.add.text(this.game.world.centerX, 250, 'What date is it today?', styleQuestions)
      textQ1.anchor.set(0.5)

      var textQ2 = this.game.add.text(this.game.world.centerX, 450, 'What day is it today?', styleQuestions)
      textQ2.anchor.set(0.5)

      var textQ3 = this.game.add.text(this.game.world.centerX, 650, 'What day was it yesterday?', styleQuestions)
      textQ3.anchor.set(0.5)

      var textQ4 = this.game.add.text(this.game.world.centerX, 850, 'What day is it tomorrow?', styleQuestions)
      textQ4.anchor.set(0.5)

      var textQ5 = this.game.add.text(this.game.world.centerX, 1050, 'What is the wheather like today?', styleQuestions)
      textQ5.anchor.set(0.5)

      var textQ6 = this.game.add.text(this.game.world.centerX, 1250, 'What season are we in?', styleQuestions)
      textQ6.anchor.set(0.5)

      var textQ7 = this.game.add.text(this.game.world.centerX, 1450, 'What should we wear today?', styleQuestions)
      textQ7.anchor.set(0.5)

      var textQ8 = this.game.add.text(this.game.world.centerX, 1650, 'What are we going to do today?', styleQuestions)
      textQ8.anchor.set(0.5)
      */

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
    },

    onInputDown: function () {
    }

  };

  window['daymap'] = window['daymap'] || {}
  window['daymap'].Game = Game

}());
