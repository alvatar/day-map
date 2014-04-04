(function() {
  'use strict';

  function elementContainsPoint(element, pointX, pointY) {
    return( pointX > element.x &&
            pointX < element.x + element.width &&
            pointY > element.y &&
            pointY < element.y + element.height )
  }

  function Game() {
    this.userAnswerDay = null
    this.userAnswerDaySprite = null
    this.userAnswerMonth = null
    this.userAnswerMonthSprite = null
    this.userAnswerYear = null
    this.userAnswerYearSprite = null

    this.userAnswerDayOfWeek = null
    this.userAnswers = []
    this.userAnswerSprites = []
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
      this.greatAudio = this.game.add.audio('greatSound');
      this.goodJobAudio = this.game.add.audio('goodJobSound');
      this.noNoAudio = this.game.add.audio('noNoSound');
      this.thinkAboutItAudio = this.game.add.audio('thinkAboutItSound');

      // Questions: GROUP 1
      this.createSection1()

      // Questions: GROUP 2
      this.createSection2()

      // Questions: GROUP 3
      this.createSection3()

      // XXX
      this.goToQuestion3()

      /*
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
          this.dayAudio.play()
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
          this.monthAudio.play()
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
          this.yearAudio.play()
        },
        this, 2, 1, 0)
      this.yearAudio = this.game.add.audio('yearAudio');

      this.answers1Group.add(this.answer1$1Button)
      this.answers1Group.add(this.answer1$2Button)
      this.answers1Group.add(this.answer1$3Button)
      this.answers1Group.alpha = 0

      //
      // Answer box 1: NUMBERS
      //
      this.answerBox1$1Group = this.game.add.group()
      this.answerBox1$1Background = this.game.add.sprite(this.game.world.centerX, 1800, 'answer_box1_1')
      this.answerBox1$1Background.anchor.set(0.5, 0.5)
      this.answerBox1$1Group.add(this.answerBox1$1Background)

      var setUpNumbersDragging = function(i, currentSprite, targetForDragging) {
        currentSprite.originalX = currentSprite.x
        currentSprite.originalY = currentSprite.y
        currentSprite.input.enableDrag()
        currentSprite.events.onDragStop.add(
          function() {
            if (elementContainsPoint( targetForDragging
                                    , this.game.input.worldX
                                    , this.game.input.worldY )) {
              if ( this.userAnswerDay !== null ) {
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
              this.answer1$1Button.setFrames(0,0,0)
              // Check answer
              var today = new Date()
              if (today.getDate() !== this.userAnswerDay) {
                this.game.time.events.add(Phaser.Timer.SECOND * 0.8, function() {
                  if (Math.random() > 0.5) { this.noNoAudio.play() } else { this.thinkAboutItAudio.play() }
                }, this);
              }
              this.checkQuestion1Complete()
            } else {
              currentSprite.x = currentSprite.originalX
              currentSprite.y = currentSprite.originalY
              if ( i === this.userAnswerDay ) {
                this.userAnswerDay = null
                this.answer1$1Button.setFrames(2,1,0)
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

      var i;
      this.numberSounds = []
      for(i = 1; i <= 31; i++) {
        this.numberSounds[i] = this.game.add.audio('number' + i + 'Audio');
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

      //
      // Answer box 2: MONTHS
      //
      this.answerBox1$2Group = this.game.add.group()
      this.answerBox1$2Background = this.game.add.sprite(this.game.world.centerX, 1800, 'answer_box1_2')
      this.answerBox1$2Background.anchor.set(0.5, 0.5)
      this.answerBox1$2Group.add(this.answerBox1$2Background)

      var setUpMonthsDragging = function(i, currentSprite, targetForDragging) {
        currentSprite.originalX = currentSprite.x
        currentSprite.originalY = currentSprite.y
        currentSprite.input.enableDrag()
        currentSprite.events.onDragStop.add(
          function() {
            if (elementContainsPoint( targetForDragging
                                    , this.game.input.worldX
                                    , this.game.input.worldY )) {
              if ( this.userAnswerMonth !== null ) {
                this.monthSprites[this.userAnswerMonth].x = this.monthSprites[this.userAnswerMonth].originalX
                this.monthSprites[this.userAnswerMonth].y = this.monthSprites[this.userAnswerMonth].originalY
              }
              currentSprite.x = targetForDragging.x + 430
              currentSprite.y = targetForDragging.y + 78
              this.userAnswerMonth = i
              if ( this.userAnswerMonthSprite ) {
                this.userAnswerMonthSprite.destroy()
              }
              this.userAnswerMonthSprite = this.game.add.sprite(targetForDragging.x + 430, targetForDragging.y + 78, monthNames[i])
              this.userAnswerMonthSprite.anchor.set(0.5, 0.5)
              this.answer1$2Button.setFrames(0,0,0)
              // Check answer
              var today = new Date()
              if (today.getMonth() !== this.userAnswerMonth) {
                this.game.time.events.add(Phaser.Timer.SECOND * 0.8, function() {
                  if (Math.random() > 0.5) { this.noNoAudio.play() } else { this.thinkAboutItAudio.play() }
                }, this);
              }
              this.checkQuestion1Complete()
            } else {
              currentSprite.x = currentSprite.originalX
              currentSprite.y = currentSprite.originalY
              if ( i === this.userAnswerMonth ) {
                this.userAnswerMonth = null
                this.answer1$2Button.setFrames(2,1,0)
                if ( this.userAnswerMonthSprite ) {
                  this.userAnswerMonthSprite.destroy()
                }
              }
            }
          }, this)
      }

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
        setUpMonthsDragging.call(this, i, this.monthSprites[i], this.answer1$2Button)
        // TODO
        //setUpMonthsClicks.call(this, i, this.monthSprites[i], this.monthSounds[i])
        this.answerBox1$2Group.add(this.monthSprites[i])
      }

      this.answerBox1$2Group.alpha = 0
      this.answerBox1$2Group.visible = false

      //
      // Answer box 3: YEARS
      //
      this.answerBox1$3Group = this.game.add.group()
      this.answerBox1$3Background = this.game.add.sprite(this.game.world.centerX, 1800, 'answer_box1_3')
      this.answerBox1$3Background.anchor.set(0.5, 0.5)
      this.answerBox1$3Group.add(this.answerBox1$3Background)

      var setUpYearsDragging = function(i, currentSprite, targetForDragging) {
        currentSprite.originalX = currentSprite.x
        currentSprite.originalY = currentSprite.y
        currentSprite.input.enableDrag()
        currentSprite.events.onDragStop.add(
          function() {
            if (elementContainsPoint( targetForDragging
                                    , this.game.input.worldX
                                    , this.game.input.worldY )) {
              if ( this.userAnswerYear !== null ) {
                this.yearSprites[this.userAnswerYear].x = this.yearSprites[this.userAnswerYear].originalX
                this.yearSprites[this.userAnswerYear].y = this.yearSprites[this.userAnswerYear].originalY
              }
              currentSprite.x = targetForDragging.x + 420
              currentSprite.y = targetForDragging.y + 74
              this.userAnswerYear = i
              if ( this.userAnswerYearSprite ) {
                this.userAnswerYearSprite.destroy()
              }
              this.userAnswerYearSprite = this.game.add.sprite(targetForDragging.x + 420, targetForDragging.y + 74, 'year' + (2014+i))
              this.userAnswerYearSprite.anchor.set(0.5, 0.5)
              this.answer1$3Button.setFrames(0,0,0)
              // Check answer
              var today = new Date()
              if (today.getYear() !== this.userAnswerYear + 114) {
                this.game.time.events.add(Phaser.Timer.SECOND * 1.0, function() {
                  if (Math.random() > 0.5) { this.noNoAudio.play() } else { this.thinkAboutItAudio.play() }
                }, this);
              }
              this.checkQuestion1Complete()
            } else {
              currentSprite.x = currentSprite.originalX
              currentSprite.y = currentSprite.originalY
              if ( i === this.userAnswerYear ) {
                this.userAnswerYear = null
                this.answer1$3Button.setFrames(2,1,0)
                if ( this.userAnswerYearSprite ) {
                  this.userAnswerYearSprite.destroy()
                }
              }
            }
          }, this)
      }

      var setUpYearsClicks = function(i, currentSprite, currentSound) {
          currentSprite.input.useHandCursor = true
          currentSprite.events.onInputDown.add(
            function() {
              currentSound.play()
            }, this)
      }

      this.yearSounds = []
      for(i = 0; i < 10; i++) {
        this.yearSounds[i] = this.game.add.audio('year' + (2014+i) + 'Audio');
      }
      this.yearSprites = []
      for(i = 0; i < 10; i++) {
        this.yearSprites[i] = this.game.add.sprite(370 + (i % 5) * 300, 1710 + 160 * Math.floor(i/5), 'year' + (2014+i))
        this.yearSprites[i].anchor.set(0.5, 0.5)
        this.yearSprites[i].inputEnabled = true;
        setUpYearsDragging.call(this, i, this.yearSprites[i], this.answer1$3Button)
        setUpYearsClicks.call(this, i, this.yearSprites[i], this.yearSounds[i])
        this.answerBox1$3Group.add(this.yearSprites[i])
      }

      this.answerBox1$3Group.alpha = 0
      this.answerBox1$3Group.visible = false
    },

    checkQuestion1Complete: function() {
      if ( this.userAnswerDay !== null &&
           this.userAnswerMonth !== null &&
           this.userAnswerYear !== null ) {
        var today = new Date()
        if ((today.getYear() === this.userAnswerYear + 114) &&
            (today.getMonth() === this.userAnswerMonth) &&
            (today.getDate() === this.userAnswerDay)) {
          this.game.time.events.add(Phaser.Timer.SECOND * 1.2, function() {
            if (Math.random() > 0.5) { this.goodJobAudio.play() } else { this.greatAudio.play() }
            this.goToQuestion2()
          }, this);
          /*
        } else {
          this.game.time.events.add(Phaser.Timer.SECOND * 1.5, function() {
            if (Math.random() > 0.5) { this.noNoAudio.play() } else { this.thinkAboutItAudio.play() }
          }, this);
        */
        }
      }
    },

    goToQuestion2: function() {
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
        this.game.world.centerX, 2200, 'text2_1'
        , function() {
          this.game.add.tween(this.answerBox2Group).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true)
        }
        , this, 2, 1, 0)
      this.answer2Button.anchor.set(0.5, 0.5)
      this.answer2Button.alpha = 0
      this.answerBox2Group = this.game.add.group()
      this.answerBox2Background = this.game.add.sprite(this.game.world.centerX, 2600, 'answer_box2')
      this.answerBox2Background.anchor.set(0.5, 0.5)
      this.answerBox2Group.add(this.answerBox2Background)
      this.answerBox2Group.alpha = 0

      var daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
      var daysOfWeekPositions = [ {x: this.game.world.centerX - 600, y: 2530},
                                  {x: this.game.world.centerX - 200, y: 2530},
                                  {x: this.game.world.centerX + 200, y: 2530},
                                  {x: this.game.world.centerX + 600, y: 2530},
                                  {x: this.game.world.centerX - 400, y: 2700},
                                  {x: this.game.world.centerX, y: 2700},
                                  {x: this.game.world.centerX + 400, y: 2700} ]

      var setUpSpritesDragging = function( i // id of this solution to the answer
                                         , currentSprite // sprite of this solution to the answer
                                         , targetAnswer // string id of the answer
                                         , spriteArray // all the solution sprites
                                         , targetButton // target button where the answer will go
                                         , offset // Point containing offset applied to targetButton
                                         , solutionCheck // function to be run when a new solution is given
                                         ) {
        currentSprite.originalX = currentSprite.x
        currentSprite.originalY = currentSprite.y
        currentSprite.originalAnchor = currentSprite.anchor
        currentSprite.input.enableDrag()
        currentSprite.events.onDragStop.add(
          function() {
            if (targetButton.getBounds().contains(this.game.input.x, this.game.input.y)) {
              if ( targetAnswer in this.userAnswers && this.userAnswers[targetAnswer] !== null ) {
                spriteArray[this.userAnswers[targetAnswer]].x = spriteArray[this.userAnswers[targetAnswer]].originalX
                spriteArray[this.userAnswers[targetAnswer]].y = spriteArray[this.userAnswers[targetAnswer]].originalY
                spriteArray[this.userAnswers[targetAnswer]].anchor = spriteArray[this.userAnswers[targetAnswer]].originalAnchor
              }
              currentSprite.x = targetButton.x + offset.x
              currentSprite.y = targetButton.y + offset.y
              currentSprite.anchor = _.clone(targetButton.anchor)
              this.userAnswers[targetAnswer] = i
              if ( this.userAnswerSprites[targetAnswer] ) {
                this.userAnswerSprites[targetAnswer].destroy()
              }
              this.userAnswerSprites[targetAnswer] = this.game.add.sprite(currentSprite.x, currentSprite.y, currentSprite.key)
              this.userAnswerSprites[targetAnswer].anchor.set(0.5, 0.5)
              targetButton.setFrames(0,0,0)
              solutionCheck.call(this,i)
            } else {
              currentSprite.x = currentSprite.originalX
              currentSprite.y = currentSprite.originalY
              currentSprite.anchor = currentSprite.originalAnchor
              if ( i === this.userAnswers[targetAnswer] ) {
                this.userAnswers[targetAnswer] = null
                targetButton.setFrames(2,1,0)
                if ( this.userAnswerSprites[targetAnswer] ) {
                  this.userAnswerSprites[targetAnswer].destroy()
                }
              }
            }
          }, this)
      }

      this.daysOfWeekSprites = []
      this.daysOfWeekSounds = []
      daysOfWeek.forEach(function(day, i) {
        this.daysOfWeekSprites[i] = this.game.add.sprite(daysOfWeekPositions[i].x, daysOfWeekPositions[i].y, day)
        this.daysOfWeekSprites[i].anchor.set(0.5, 0.5)
        this.daysOfWeekSprites[i].inputEnabled = true;
        this.daysOfWeekSprites[i].input.useHandCursor = true
        this.answerBox2Group.add(this.daysOfWeekSprites[i])
        this.daysOfWeekSprites[i].events.onInputDown.add(
          function() {
            this.daysOfWeekSounds[i].play()
          }, this)
        this.daysOfWeekSounds[i] = this.game.add.audio( day + 'Audio' );
        setUpSpritesDragging.call( this, i, this.daysOfWeekSprites[i], 'dayOfWeek'
                                 , this.daysOfWeekSprites, this.answer2Button, new Phaser.Point(100,0)
                                 , function(answerId) {
                                    var date = new Date()
                                    if( date.getDay() % 7 === (answerId + 1) % 7 ) {
                                      this.game.time.events.add(Phaser.Timer.SECOND * 1.2, function() {
                                        if (Math.random() > 0.5) { this.goodJobAudio.play() } else { this.greatAudio.play() }
                                        this.goToQuestion3()
                                      }, this);
                                    } else {
                                      this.game.time.events.add(Phaser.Timer.SECOND * 1.0, function() {
                                        if (Math.random() > 0.5) { this.noNoAudio.play() } else { this.thinkAboutItAudio.play() }
                                      }, this);
                                    }
                                 })

      }, this)
    },

    goToQuestion3: function() {
      // Fade outs
      this.game.add.tween(this.question2Sprite).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true)
      this.game.add.tween(this.answer2Button).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
      this.game.add.tween(this.answerBox2Group).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
      if ( 'dayOfWeek' in this.userAnswerSprites ) {
        this.game.add.tween(this.userAnswerSprites['dayOfWeek']).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
      }
      // Fade ins
      this.game.add.tween(this.question3Sprite).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true)
      this.game.add.tween(this.answer3Button).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true, 1000)
      // Camera
      this.game.add.tween(this.game.camera).to( { y: 2200 } , 1000, Phaser.Easing.Quadratic.Out, true)
    },

    /**************************************************************************
     * Section 3
     *************************************************************************/

    createSection3 : function() {
      this.question3Sprite = this.game.add.sprite(this.game.world.centerX, 2400, 'question3')
      this.question3Sprite.anchor.set(0.5, 0.5)
      this.question3Sprite.alpha = 0
      this.answer3Button = this.game.add.button(
        this.game.world.centerX, 2600, 'text3_1',
        function() {
          // Fade outs
          this.game.add.tween(this.question3Sprite).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true)
          this.game.add.tween(this.answer3Button).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
          // Fade ins
          this.game.add.tween(this.question4Sprite).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true)
          this.game.add.tween(this.answer4Button).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true, 1000)
          // Camera
          this.game.add.tween(this.game.camera).to( { y: 2550 } , 1000, Phaser.Easing.Quadratic.Out, true)
        },
        this, 2, 1, 0)
      this.answer3Button.anchor.set(0.5, 0.5)
      this.answer3Button.alpha = 0
    },

    goToQuestion4: function() {
      /*
      // Fade outs
      this.game.add.tween(this.question2Sprite).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true)
      this.game.add.tween(this.answer2Button).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
      this.game.add.tween(this.answerBox2Group).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
      this.game.add.tween(this.userAnswerSprites['dayOfWeek']).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
      // Fade ins
      this.game.add.tween(this.question3Sprite).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true)
      this.game.add.tween(this.answer3Button).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true, 1000)
      // Camera
      this.game.add.tween(this.game.camera).to( { y: 2200 } , 1000, Phaser.Easing.Quadratic.Out, true)
      */
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
