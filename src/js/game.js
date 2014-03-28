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
      headerCloudsSprite.inputEnabled = true;
      headerCloudsSprite.input.useHandCursor = true
      headerCloudsSprite.events.onInputDown.add(
        function() {
          // Fade ins
          this.game.add.tween(this.question1Sprite).to(
              { alpha: 1 }
              , 1000, Phaser.Easing.Quadratic.Out, true
            )
          this.game.add.tween(this.answers1Group).to(
              { alpha: 1 }
              , 1000, Phaser.Easing.Quadratic.Out, true, 1000
            )
          // Camera
          this.game.add.tween(this.game.camera).to(
              { y: 900 }
              , 1000, Phaser.Easing.Quadratic.Out, true
            )
        }
        , this)

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

      // Questions: GROUP 1
      this.question1Sprite = this.game.add.sprite(this.game.world.centerX, 1200, 'text1')
      this.question1Sprite.anchor.set(0.5, 0.5)
      this.question1Sprite.alpha = 0
      this.answers1Group = this.game.add.group()
      this.answer1$1Button = this.game.add.button(
        60, 1350, 'text1_1',
        function() {
          // Fade outs
          this.game.add.tween(this.question1Sprite).to(
              { alpha: 0 }
              , 1000, Phaser.Easing.Quadratic.Out, true
            )
          this.game.add.tween(this.answers1Group).to(
              { alpha: 0 }
              , 1000, Phaser.Easing.Quadratic.Out, true, 0
            )
          // Fade ins
          this.game.add.tween(this.question2Sprite).to(
              { alpha: 1 }
              , 1000, Phaser.Easing.Quadratic.Out, true
            )
          this.game.add.tween(this.answer2$1Button).to(
              { alpha: 1 }
              , 1000, Phaser.Easing.Quadratic.Out, true, 1000
            )
          // Camera
          this.game.add.tween(this.game.camera).to(
              { y: 1450 }
              , 1000, Phaser.Easing.Quadratic.Out, true
            )
        },
        this, 2, 1, 0)
      this.answer1$2Button = this.game.add.button(500, 1350, 'text1_2', null, this, 2, 1, 0)
      this.answer1$3Button = this.game.add.button(1200, 1350, 'text1_3', null, this, 2, 1, 0)
      this.answers1Group.add(this.answer1$1Button)
      this.answers1Group.add(this.answer1$2Button)
      this.answers1Group.add(this.answer1$3Button)
      this.answers1Group.alpha = 0

      // Questions: GROUP 2
      this.question2Sprite = this.game.add.sprite(this.game.world.centerX, 1750, 'text2')
      this.question2Sprite.anchor.set(0.5, 0.5)
      this.question2Sprite.alpha = 0
      this.answer2$1Button = this.game.add.button(
        this.game.world.centerX, 1950, 'text2_1',
        function() {
          // Fade outs
          this.game.add.tween(this.question2Sprite).to(
              { alpha: 0 }
              , 1000, Phaser.Easing.Quadratic.Out, true
            )
          this.game.add.tween(this.answer2$1Button).to(
              { alpha: 0 }
              , 1000, Phaser.Easing.Quadratic.Out, true, 0
            )
          // Fade ins
          this.game.add.tween(this.question3Sprite).to(
              { alpha: 1 }
              , 1000, Phaser.Easing.Quadratic.Out, true
            )
          this.game.add.tween(this.answer3$1Button).to(
              { alpha: 1 }
              , 1000, Phaser.Easing.Quadratic.Out, true, 1000
            )
          // Camera
          this.game.add.tween(this.game.camera).to(
              { y: 2000 }
              , 1000, Phaser.Easing.Quadratic.Out, true
            )
          },
        this, 2, 1, 0)
      this.answer2$1Button.anchor.set(0.5, 0.5)
      this.answer2$1Button.alpha = 0

      // Questions: GROUP 3
      this.question3Sprite = this.game.add.sprite(this.game.world.centerX, 2300, 'text3')
      this.question3Sprite.anchor.set(0.5, 0.5)
      this.question3Sprite.alpha = 0
      this.answer3$1Button = this.game.add.button(
        this.game.world.centerX, 2500, 'text3_1',
        function() {
          // Fade outs
          this.game.add.tween(this.question3Sprite).to(
              { alpha: 0 }
              , 1000, Phaser.Easing.Quadratic.Out, true
            )
          this.game.add.tween(this.answer3$1Button).to(
              { alpha: 0 }
              , 1000, Phaser.Easing.Quadratic.Out, true, 0
            )
          // Fade ins
          this.game.add.tween(this.question4Sprite).to(
              { alpha: 1 }
              , 1000, Phaser.Easing.Quadratic.Out, true
            )
          this.game.add.tween(this.answer4$1Button).to(
              { alpha: 1 }
              , 1000, Phaser.Easing.Quadratic.Out, true, 1000
            )
          // Camera
          this.game.add.tween(this.game.camera).to(
              { y: 2550 }
              , 1000, Phaser.Easing.Quadratic.Out, true
            )
        },
        this, 2, 1, 0)
      this.answer3$1Button.anchor.set(0.5, 0.5)
      this.answer3$1Button.alpha = 0

      // Questions: GROUP 4
      this.question4Sprite = this.game.add.sprite(this.game.world.centerX, 2850, 'text4')
      this.question4Sprite.anchor.set(0.5, 0.5)
      this.question4Sprite.alpha = 0
      this.answer4$1Button = this.game.add.button(
        this.game.world.centerX, 3050, 'text4_1',
        function() {
          // Fade outs
          this.game.add.tween(this.question4Sprite).to(
              { alpha: 0 }
              , 1000, Phaser.Easing.Quadratic.Out, true
            )
          this.game.add.tween(this.answer4$1Button).to(
              { alpha: 0 }
              , 1000, Phaser.Easing.Quadratic.Out, true, 0
            )
          // Fade ins
          this.game.add.tween(this.question5Sprite).to(
              { alpha: 1 }
              , 1000, Phaser.Easing.Quadratic.Out, true
            )
          this.game.add.tween(this.answer5$1Button).to(
              { alpha: 1 }
              , 1000, Phaser.Easing.Quadratic.Out, true, 1000
            )
          // Camera
          this.game.add.tween(this.game.camera).to(
              { y: 3100 }
              , 1000, Phaser.Easing.Quadratic.Out, true
            )
        },
        this, 2, 1, 0)
      this.answer4$1Button.anchor.set(0.5, 0.5)
      this.answer4$1Button.alpha = 0

      // Questions: GROUP 5
      this.question5Sprite = this.game.add.sprite(this.game.world.centerX, 3400, 'text5')
      this.question5Sprite.anchor.set(0.5, 0.5)
      this.question5Sprite.alpha = 0
      this.answer5$1Button = this.game.add.button(
        this.game.world.centerX, 3750, 'text5_1',
        function() {
          // Fade outs
          this.game.add.tween(this.question5Sprite).to(
              { alpha: 0 }
              , 1000, Phaser.Easing.Quadratic.Out, true
            )
          this.game.add.tween(this.answer5$1Button).to(
              { alpha: 0 }
              , 1000, Phaser.Easing.Quadratic.Out, true, 0
            )
          // Fade ins
          this.game.add.tween(this.question6Sprite).to(
              { alpha: 1 }
              , 1000, Phaser.Easing.Quadratic.Out, true
            )
          this.game.add.tween(this.answer6$1Button).to(
              { alpha: 1 }
              , 1000, Phaser.Easing.Quadratic.Out, true, 1000
            )
          this.game.add.tween(this.answer6$2Button).to(
              { alpha: 1 }
              , 1000, Phaser.Easing.Quadratic.Out, true, 1000
            )
          // Camera
          this.game.add.tween(this.game.camera).to(
              { y: 3600 }
              , 1000, Phaser.Easing.Quadratic.Out, true
            )
        },
        this, 2, 1, 0)
      this.answer5$1Button.anchor.set(0.5, 0.5)
      this.answer5$1Button.alpha = 0

      // Questions: GROUP 6
      this.question6Sprite = this.game.add.sprite(this.game.world.centerX, 3900, 'text6')
      this.question6Sprite.anchor.set(0.5, 0.5)
      this.question6Sprite.alpha = 0
      this.answer6$1Button = this.game.add.button(
        this.game.world.centerX - 150, 4200, 'boyAnswer',
        function() {
          // Fade outs
          this.game.add.tween(this.question6Sprite).to(
              { alpha: 0 }
              , 1000, Phaser.Easing.Quadratic.Out, true
            )
          this.game.add.tween(this.answer6$1Button).to(
              { alpha: 0 }
              , 1000, Phaser.Easing.Quadratic.Out, true, 0
            )
          this.game.add.tween(this.answer6$2Button).to(
              { alpha: 0 }
              , 1000, Phaser.Easing.Quadratic.Out, true, 0
            )
          // Fade ins
          this.game.add.tween(this.question7Sprite).to(
              { alpha: 1 }
              , 1000, Phaser.Easing.Quadratic.Out, true
            )
          this.game.add.tween(this.answer7$1Button).to(
              { alpha: 1 }
              , 1000, Phaser.Easing.Quadratic.Out, true, 1000
            )
          // Camera
          this.game.add.tween(this.game.camera).to(
              { y: 4150 }
              , 1000, Phaser.Easing.Quadratic.Out, true
            )
        },
        this, 2, 1, 0)
      this.answer6$1Button.anchor.set(0.5, 0.5)
      this.answer6$1Button.alpha = 0
      this.answer6$2Button = this.game.add.button(
        this.game.world.centerX + 150, 4200, 'girlAnswer',
        function() {
          // Fade outs
          this.game.add.tween(this.question6Sprite).to(
              { alpha: 0 }
              , 1000, Phaser.Easing.Quadratic.Out, true
            )
          this.game.add.tween(this.answer6$1Button).to(
              { alpha: 0 }
              , 1000, Phaser.Easing.Quadratic.Out, true, 0
            )
          this.game.add.tween(this.answer6$2Button).to(
              { alpha: 0 }
              , 1000, Phaser.Easing.Quadratic.Out, true, 0
            )
          // Fade ins
          this.game.add.tween(this.question7Sprite).to(
              { alpha: 1 }
              , 1000, Phaser.Easing.Quadratic.Out, true
            )
          this.game.add.tween(this.answer7$1Button).to(
              { alpha: 1 }
              , 1000, Phaser.Easing.Quadratic.Out, true, 1000
            )
          // Camera
          this.game.add.tween(this.game.camera).to(
              { y: 4150 }
              , 1000, Phaser.Easing.Quadratic.Out, true
            )
        },
        this, 2, 1, 0)
      this.answer6$2Button.anchor.set(0.5, 0.5)
      this.answer6$2Button.alpha = 0







      // Questions: GROUP 7
      this.question7Sprite = this.game.add.sprite(this.game.world.centerX, 4450, 'text7')
      this.question7Sprite.anchor.set(0.5, 0.5)
      this.question7Sprite.alpha = 0
      this.answer7$1Button = this.game.add.button(
        this.game.world.centerX, 4850, 'text7_1',
        function() {
        },
        this, 2, 1, 0)
      this.answer7$1Button.anchor.set(0.5, 0.5)
      this.answer7$1Button.alpha = 0

      // Questions: GROUP 8
      this.text8Sprite = this.game.add.sprite(this.game.world.centerX, 5000, 'text8')
      this.text8Sprite.anchor.set(0.5, 0.5)
      this.text8Sprite.alpha = 0
      this.answer8$1Button = this.game.add.button(
        this.game.world.centerX, 5200, 'text8_1',
        function() {
        },
        this, 2, 1, 0)
      this.answer8$1Button.anchor.set(0.5, 0.5)
      this.answer8$1Button.alpha = 0

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
