(function() {
  'use strict';

  function elementContainsPoint(element, pointX, pointY) {
    return( pointX > element.x &&
            pointX < (element.x + element.width) &&
            pointY > element.y &&
            pointY < (element.y + element.height) )
  }

  function Game() {
    this.userAnswerDay = null
    this.userAnswerDaySprite = null
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

      // Common Audio
      this.greatAudio = this.game.add.audio('great');
      this.goodJobAudio = this.game.add.audio('goodJob');

      // Questions: GROUP 1
      this.createSection1()

      // Questions: GROUP 2
      this.createSection2()

      /*
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
      */

      this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    /**************************************************************************
     * Section 1
     *************************************************************************/

    createSection1: function () {
      this.question1Sprite = this.game.add.sprite(this.game.world.centerX, 1200, 'question1')
      this.question1Sprite.anchor.set(0.5, 0.5)
      this.question1Sprite.alpha = 0
      this.question1Sprite.inputEnabled = true;
      this.question1Sprite.input.useHandCursor = true
      this.question1Sprite.events.onInputDown.add(
        function() {
          this.question1Audio.play()
        }
        , this)
      this.question1Audio = this.game.add.audio('question1Audio');

      // Answers
      this.answers1Group = this.game.add.group()
      this.answer1$1Button = this.game.add.button(
        60, 1350, 'daySpritesheet',
        function() {
          this.answerBox1$1Group.visible = true
          this.answerBox1$1Group.alpha = 0
          this.answerBox1$2Group.visible = false
          this.answerBox1$3Group.visible = false
          this.game.add.tween(this.answerBox1$1Group).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true)
          this.game.add.tween(this.game.camera).to( { y: 1000 } , 1000, Phaser.Easing.Quadratic.Out, true)
          if ( this.checkQuestion1Complete() ) {
            this.goToQuestion2()
          } else {
            this.dayAudio.play()
          }
        },
        this, 2, 1, 0)
      this.game.physics.enable(this.answer1$1Button, Phaser.Physics.ARCADE);
      this.dayAudio = this.game.add.audio('dayAudio');

      this.answer1$2Button = this.game.add.button(500, 1350, 'monthSpritesheet',
        function() {
          this.answerBox1$1Group.visible = false
          this.answerBox1$2Group.visible = true
          this.answerBox1$2Group.alpha = 0
          this.answerBox1$3Group.visible = false
          this.game.add.tween(this.answerBox1$2Group).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true)
          this.game.add.tween(this.game.camera).to( { y: 1000 } , 1000, Phaser.Easing.Quadratic.Out, true)
          if ( this.checkQuestion1Complete() ) {
            this.goToQuestion2()
          } else {
            this.monthAudio.play()
          }
        },
        this, 2, 1, 0)
      this.monthAudio = this.game.add.audio('monthAudio');

      this.answer1$3Button = this.game.add.button(1200, 1350, 'yearSpritesheet',
        function() {
          this.answerBox1$1Group.visible = false
          this.answerBox1$2Group.visible = false
          this.answerBox1$3Group.visible = true
          this.answerBox1$3Group.alpha = 0
          this.game.add.tween(this.answerBox1$3Group).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true)
          this.game.add.tween(this.game.camera).to( { y: 1000 } , 1000, Phaser.Easing.Quadratic.Out, true)
          if ( this.checkQuestion1Complete() ) {
            this.goToQuestion2()
          } else {
            this.yearAudio.play()
          }
        },
        this, 2, 1, 0)
      this.yearAudio = this.game.add.audio('yearAudio');

      this.answers1Group.add(this.answer1$1Button)
      this.answers1Group.add(this.answer1$2Button)
      this.answers1Group.add(this.answer1$3Button)
      this.answers1Group.alpha = 0

      // Answer box 1: NUMBERS
      this.answerBox1$1Group = this.game.add.group()
      this.answerBox1$1Background = this.game.add.sprite(this.game.world.centerX, 1800, 'answer_box1_1')
      this.answerBox1$1Background.anchor.set(0.5, 0.5)
      this.answerBox1$1Group.add(this.answerBox1$1Background)

      var i;
      this.numberSounds = []
      for(i = 1; i <= 31; i++) {
        this.numberSounds[i] = this.game.add.audio('number' + i + 'Audio');
      }

      var setUpNumbersDragging = function(i, currentSprite, targetForDragging) {
          currentSprite.originalX = currentSprite.x
          currentSprite.originalY = currentSprite.y
          currentSprite.input.enableDrag()
          currentSprite.events.onDragStop.add(
            function() {
              if (elementContainsPoint( targetForDragging
                                      , this.game.input.worldX
                                      , this.game.input.worldY )) {
                if ( this.userAnswerDay ) {
                  this.numberSprites[this.userAnswerDay].x = this.numberSprites[this.userAnswerDay].originalX
                  this.numberSprites[this.userAnswerDay].y = this.numberSprites[this.userAnswerDay].originalY
                }
                currentSprite.x = targetForDragging.x + 200
                currentSprite.y = targetForDragging.y + 10
                this.userAnswerDay = i
                if ( this.userAnswerDaySprite ) {
                  this.userAnswerDaySprite.destroy()
                }
                this.userAnswerDaySprite = this.game.add.sprite(targetForDragging.x + 200, targetForDragging.y + 10, 'number'+i)
              } else {
                currentSprite.x = currentSprite.originalX
                currentSprite.y = currentSprite.originalY
                if ( i === this.userAnswerDay ) {
                  this.userAnswerDay = null
                  if ( this.userAnswerDaySprite ) {
                    this.userAnswerDaySprite.destroy()
                  }
                }
              }
            }, this)
      }

      var setUpNumbersClicks = function(i, currentSprite, currentSound) {
          currentSprite.input.useHandCursor = true
          currentSprite.events.onInputDown.add(
            function() {
              currentSound.play()
            }, this)
      }

      this.numberSprites = []
      for(i = 1; i <= 10; i++) {
        this.numberSprites[i] = this.game.add.sprite(80 + i * 150, 1600, 'number' + i)
        this.numberSprites[i].inputEnabled = true;
        setUpNumbersDragging.call(this, i, this.numberSprites[i], this.answer1$1Button)
        setUpNumbersClicks.call(this, i, this.numberSprites[i], this.numberSounds[i])
        this.answerBox1$1Group.add(this.numberSprites[i])
      }
      for(i = 11; i <= 20; i++) {
        this.numberSprites[i] = this.game.add.sprite(200 + (i-11) * 155, 1740, 'number' + i)
        this.numberSprites[i].inputEnabled = true;
        setUpNumbersDragging.call(this, i, this.numberSprites[i], this.answer1$1Button)
        setUpNumbersClicks.call(this, i, this.numberSprites[i], this.numberSounds[i])
        this.answerBox1$1Group.add(this.numberSprites[i])
      }
      for(i = 21; i <= 31; i++) {
        this.numberSprites[i] = this.game.add.sprite(170 + (i-21) * 144, 1880, 'number' + i)
        this.numberSprites[i].inputEnabled = true;
        setUpNumbersDragging.call(this, i, this.numberSprites[i], this.answer1$1Button)
        setUpNumbersClicks.call(this, i, this.numberSprites[i], this.numberSounds[i])
        this.answerBox1$1Group.add(this.numberSprites[i])
      }

      this.answerBox1$1Group.alpha = 0
      this.answerBox1$1Group.visible = false

      // Answer box 2: MONTHS
      this.answerBox1$2Group = this.game.add.group()
      this.answerBox1$2Background = this.game.add.sprite(this.game.world.centerX, 1800, 'answer_box1_2')
      this.answerBox1$2Background.anchor.set(0.5, 0.5)
      this.answerBox1$2Group.add(this.answerBox1$2Background)

      var monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
      /*
      this.monthSounds = []
      for(i = 0; i < monthNames.length; i++) {
        this.monthSounds[i] = this.game.add.audio(monthNames[i] + 'Audio');
      }
      */
      this.monthSprites = []
      for(i = 0; i < 12; i++) {
        this.monthSprites[i] = this.game.add.sprite(380 + (i % 4) * 380, 1670 + 140 * Math.floor(i/4), monthNames[i])
        this.monthSprites[i].anchor.set(0.5, 0.5)
        this.monthSprites[i].inputEnabled = true;
        this.monthSprites[i].input.useHandCursor = true
        /*
        ;(function(i, currentSprite, currentSound) {
          currentSprite.events.onInputDown.add(
            function() {
              currentSound.play()
            }
          , this)
        })(i, this.numberSprites[i], this.numberSounds[i])
        */
        this.answerBox1$2Group.add(this.monthSprites[i])
      }

      this.answerBox1$2Group.alpha = 0
      this.answerBox1$2Group.visible = false

      // Answer box 3: YEARS
      this.answerBox1$3Group = this.game.add.group()
      this.answerBox1$3Background = this.game.add.sprite(this.game.world.centerX, 1800, 'answer_box1_3')
      this.answerBox1$3Background.anchor.set(0.5, 0.5)
      this.answerBox1$3Group.add(this.answerBox1$3Background)

      this.yearSounds = []
      for(i = 0; i < 10; i++) {
        this.yearSounds[i] = this.game.add.audio('year' + (2014+i) + 'Audio');
      }
      this.yearSprites = []
      for(i = 0; i < 10; i++) {
        this.yearSprites[i] = this.game.add.sprite(370 + (i % 5) * 300, 1710 + 160 * Math.floor(i/5), 'year' + (2014+i))
        this.yearSprites[i].anchor.set(0.5, 0.5)
        this.yearSprites[i].inputEnabled = true;
        this.yearSprites[i].input.useHandCursor = true
        ;(function(i, currentSprite, currentSound) {
          currentSprite.events.onInputDown.add(
            function() {
              currentSound.play()
            }
          , this)
        })(i, this.yearSprites[i], this.yearSounds[i])
        this.answerBox1$3Group.add(this.yearSprites[i])
      }

      this.answerBox1$3Group.alpha = 0
      this.answerBox1$3Group.visible = false
    },

    checkQuestion1Complete: function() {
      /*
      if ( this.q1counter >= 3 ) {
        return true
      } else {
        this.q1counter++
        return false
      }
      */
      return false
    },

    goToQuestion2: function() {
      if (Math.random() > 0.5) {
        this.goodJobAudio.play()
      } else {
        this.greatAudio.play()
      }
      // Fade outs
      this.game.add.tween(this.question1Sprite).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true)
      this.game.add.tween(this.answers1Group).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
      this.game.add.tween(this.answerBox1$1Group).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
      this.game.add.tween(this.answerBox1$2Group).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
      this.game.add.tween(this.answerBox1$3Group).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
      // Fade ins
      this.game.add.tween(this.question2Sprite).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true)
      this.game.add.tween(this.answer2Button).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true, 1000)
      // Camera
      this.game.add.tween(this.game.camera).to( { y: 1800 } , 1000, Phaser.Easing.Quadratic.Out, true)
    },

    /**************************************************************************
     * Section 2
     *************************************************************************/

    createSection2: function () {
      // Question
      this.question2Sprite = this.game.add.sprite(this.game.world.centerX, 2000, 'question2')
      this.question2Sprite.anchor.set(0.5, 0.5)
      this.question2Sprite.alpha = 0

      // Answer
      this.answer2Button = this.game.add.button(
        this.game.world.centerX, 2200, 'text2_1',
        function() {
          // Fade outs
          //this.game.add.tween(this.question2Sprite).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true)
          //this.game.add.tween(this.answer2Button).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
          // Fade ins
          this.game.add.tween(this.answerBox2Group).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true)
          //this.game.add.tween(this.question3Sprite).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true)
          //this.game.add.tween(this.answer3$1Button).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true, 1000)
          // Camera
          //this.game.add.tween(this.game.camera).to( { y: 2000 } , 1000, Phaser.Easing.Quadratic.Out, true)
          },
        this, 2, 1, 0)
      this.answer2Button.anchor.set(0.5, 0.5)
      this.answer2Button.alpha = 0
      this.answerBox2Group = this.game.add.group()
      this.answerBox2Background = this.game.add.sprite(this.game.world.centerX, 2600, 'answer_box2')
      this.answerBox2Background.anchor.set(0.5, 0.5)

      this.mondaySprite = this.game.add.sprite(this.game.world.centerX - 600, 2530, 'monday')
      this.mondaySprite.anchor.set(0.5, 0.5)
      this.mondaySprite.inputEnabled = true;
      this.mondaySprite.input.useHandCursor = true
      this.mondaySprite.events.onInputDown.add(
        function() {
          this.mondayAudio.play()
        }
        , this)
      this.mondayAudio = this.game.add.audio('mondayAudio');

      this.tuesdaySprite = this.game.add.sprite(this.game.world.centerX - 200, 2530, 'tuesday')
      this.tuesdaySprite.anchor.set(0.5, 0.5)
      this.tuesdaySprite.inputEnabled = true;
      this.tuesdaySprite.input.useHandCursor = true
      this.tuesdaySprite.events.onInputDown.add(
        function() {
          this.tuesdayAudio.play()
        }
        , this)
      this.tuesdayAudio = this.game.add.audio('tuesdayAudio');

      this.wednesdaySprite = this.game.add.sprite(this.game.world.centerX + 200, 2530, 'wednesday')
      this.wednesdaySprite.anchor.set(0.5, 0.5)
      this.wednesdaySprite.inputEnabled = true;
      this.wednesdaySprite.input.useHandCursor = true
      this.wednesdaySprite.events.onInputDown.add(
        function() {
          this.wednesdayAudio.play()
        }
        , this)
      this.wednesdayAudio = this.game.add.audio('wednesdayAudio');

      this.thursdaySprite = this.game.add.sprite(this.game.world.centerX + 600, 2530, 'thursday')
      this.thursdaySprite.anchor.set(0.5, 0.5)
      this.thursdaySprite.inputEnabled = true;
      this.thursdaySprite.input.useHandCursor = true
      this.thursdaySprite.events.onInputDown.add(
        function() {
          this.thursdayAudio.play()
        }
        , this)
      this.thursdayAudio = this.game.add.audio('thursdayAudio');

      this.fridaySprite = this.game.add.sprite(this.game.world.centerX - 400, 2700, 'friday')
      this.fridaySprite.anchor.set(0.5, 0.5)
      this.fridaySprite.inputEnabled = true;
      this.fridaySprite.input.useHandCursor = true
      this.fridaySprite.events.onInputDown.add(
        function() {
          this.fridayAudio.play()
        }
        , this)
      this.fridayAudio = this.game.add.audio('fridayAudio');

      this.saturdaySprite = this.game.add.sprite(this.game.world.centerX, 2700, 'saturday')
      this.saturdaySprite.anchor.set(0.5, 0.5)
      this.saturdaySprite.inputEnabled = true;
      this.saturdaySprite.input.useHandCursor = true
      this.saturdaySprite.events.onInputDown.add(
        function() {
          this.saturdayAudio.play()
        }
        , this)
      this.saturdayAudio = this.game.add.audio('saturdayAudio');

      this.sundaySprite = this.game.add.sprite(this.game.world.centerX + 400, 2700, 'sunday')
      this.sundaySprite.anchor.set(0.5, 0.5)
      this.sundaySprite.inputEnabled = true;
      this.sundaySprite.input.useHandCursor = true
      this.sundaySprite.events.onInputDown.add(
        function() {
          this.sundayAudio.play()
        }
        , this)
      this.sundayAudio = this.game.add.audio('sundayAudio');

      this.answerBox2Group.add(this.answerBox2Background)
      this.answerBox2Group.add(this.mondaySprite)
      this.answerBox2Group.add(this.tuesdaySprite)
      this.answerBox2Group.add(this.wednesdaySprite)
      this.answerBox2Group.add(this.thursdaySprite)
      this.answerBox2Group.add(this.fridaySprite)
      this.answerBox2Group.add(this.saturdaySprite)
      this.answerBox2Group.add(this.sundaySprite)
      this.answerBox2Group.alpha = 0
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
