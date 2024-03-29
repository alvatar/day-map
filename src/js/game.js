(function() {
  'use strict';

  var currentWeatherConditions = null
  var daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

  function elementContainsPoint(element, pointX, pointY) {
    return( pointX > element.x &&
            pointX < element.x + element.width &&
            pointY > element.y &&
            pointY < element.y + element.height )
  }

  function Game() {
    this.timedEvent = null

    this.userAnswerDay = null
    this.userAnswerDaySprite = null
    this.userAnswerMonth = null
    this.userAnswerMonthSprite = null
    this.userAnswerYear = null
    this.userAnswerYearSprite = null

    this.userAnswerDayOfWeek = null
    this.userAnswers = []
    this.userAnswerSprites = []

    this.correctAnswers = []
    this.scoreSprites = []

    this.userGender = null
  }

  Game.prototype = {

    create: function () {
      // Work around for some Phaser/CocoonJS isues
      this.game.add.sprite(0,0,'')

      // This breaks under Android
      /*
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( function(position) {
          if (typeof $ !== 'undefined') { // This would be in case we use jQuery
            var jqxhr = $.get(
              'http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude,
              function(response) {
                currentWeatherConditions = response
                console.log(currentWeatherConditions)
              }, 'jsonp')
            jqxhr.fail(function() {
              console.log('failed to perform weather geolocation')
            })
          } else {
            var xmlhttp;
            if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            } else {
                // code for IE6, IE5
                // xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
            }
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                  currentWeatherConditions = JSON.parse( xmlhttp.responseText )
                  console.log(currentWeatherConditions)
                }
            }
            xmlhttp.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude, true);
            xmlhttp.send();
          }
        }, function(error){
          console.log(error)
        })
      } else {
        console.log('Geolocation is not supported')
      }
      */

      // Configuration
      this.game.world.setBounds(0, 0, 1920, 7000)
      this.game.stage.backgroundColor = '#1f5e41'

      // Actually draw a background
      this.graphics = this.game.add.graphics(0,0)
      //this.graphics.lineStyle(0,0,0)
      this.graphics.beginFill(0x1f5e41)
      this.graphics.drawRect(0, 0, this.game.world.width, this.game.world.height);
      this.graphics.endFill()

      this.backgroundSprite = this.game.add.sprite(0, 0, 'background')
      var backgroundScale = window['daymap'].Globals.size.width / 1536.0
      this.backgroundSprite.scale.setTo( backgroundScale, backgroundScale )

      // Background music
      this.music = this.game.add.audio('backgroundMusic')
      this.music.play('',0,1,true)

      // Header title
      this.plane1Sprite = this.game.add.sprite( -100, 2200, 'plane1')
      this.plane1Sprite.anchor.set(0.5, 0.5)
      this.plane1Sprite.scale.set(-0.4, 0.4)
      this.plane1Sprite.animations.add('fly');
      this.plane1Sprite.animations.play('fly', 8, true);
      this.game.add.tween( this.plane1Sprite )
          .to( { x: 4400 }, 26000, Phaser.Easing.Linear.In, true, 0, Number.MAX_VALUE, false)
      this.game.add.tween( this.plane1Sprite )
          .to( { y: 2230 }, 2000, Phaser.Easing.Quadratic.InOut, true, 0, Number.MAX_VALUE, true)
      this.plane1Sprite.inputEnabled = true;
      this.plane1Sprite.input.useHandCursor = true
      this.plane1Sprite.events.onInputDown.add( function() { this.planeSound.play() } , this)
      this.planeSound = this.game.add.audio('planeSound')

      this.plane2Sprite = this.game.add.sprite( this.game.world.width + 200, 320, 'plane2')
      this.plane2Sprite.anchor.set(0.5, 0.5)
      this.game.add.tween( this.plane2Sprite )
          .to( { x: -2100 }, 60000, Phaser.Easing.Linear.In, true, 0, Number.MAX_VALUE, false)
      this.plane2Sprite.inputEnabled = true;
      this.plane2Sprite.input.useHandCursor = true
      this.plane2Sprite.events.onInputDown.add( function() { this.planeSound.play() } , this)

      var headerCloudsSprite = this.game.add.sprite(this.game.world.centerX, 500, 'headerClouds')
      headerCloudsSprite.anchor.set(0.5, 0.5)
      headerCloudsSprite.inputEnabled = true;
      headerCloudsSprite.input.useHandCursor = true
      headerCloudsSprite.events.onInputDown.add(
        function() {
          this.game.time.events.add(Phaser.Timer.SECOND * 2, function(){this.goToQuestion1()}, this)
          this.music.volume = 0.1
          this.headerSound.play()
        }
        , this)
      this.headerSound = this.game.add.audio('letsBeginSound')

      this.gopherSprite = this.game.add.sprite( this.game.world.width + 10, 4220, 'gopher')
      this.gopherSprite.anchor.set(0.5, 0.5)
      this.gopherSprite.angle = -35
      this.gopherSprite.animations.add( 'smell', _.range(0,40,0).concat([1,2,3,4,5,6,7]) ) // Generate many frames with the first sprite
      this.gopherSprite.animations.play('smell', 12, true);
      this.gopherSprite.inputEnabled = true;
      this.gopherSprite.input.useHandCursor = true
      this.gopherSprite.events.onInputDown.add( function() { this.gopherSound.play() } , this)
      this.gopherSound = this.game.add.audio('gopherSound')

      this.gopherSprite2 = this.game.add.sprite( 0, 5300, 'gopher')
      this.gopherSprite2.anchor.set(0.5, 0.5)
      this.gopherSprite2.scale.set(-1.0, 1.0)
      this.gopherSprite2.angle = 40
      this.gopherSprite2.animations.add( 'smell', _.range(0,40,0).concat([1,2,3,4,5,6,7]) ) // Generate many frames with the first sprite
      this.gopherSprite2.animations.play('smell', 12, true);
      this.gopherSprite2.inputEnabled = true;
      this.gopherSprite2.input.useHandCursor = true
      this.gopherSprite2.events.onInputDown.add( function() { this.gopherSound.play() } , this)

      this.littleBirdSprite = this.game.add.sprite( this.game.world.width, 500, 'littleBird' )
      this.littleBirdSprite.scale.set(0.5, 0.5)
      this.game.add.tween( this.littleBirdSprite )
          .to( { y: 540 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, Number.MAX_VALUE, true)
      this.game.add.tween( this.littleBirdSprite )
          .to( { x: -600 }, 20000, Phaser.Easing.Linear.In, true, 0, Number.MAX_VALUE, false)
      this.littleBirdSprite.inputEnabled = true;
      this.littleBirdSprite.input.useHandCursor = true
      this.littleBirdSprite.events.onInputDown.add( function() { this.birdSound.play() } , this)
      this.birdSound = this.game.add.audio('birdSound')

      this.littleBirdSprite2 = this.game.add.sprite( this.game.world.width + 340, 500, 'littleBird' )
      this.littleBirdSprite2.scale.set(0.35, 0.35)
      this.game.add.tween( this.littleBirdSprite2 )
          .to( { y: 550 }, 1500, Phaser.Easing.Quadratic.InOut, true, 0, Number.MAX_VALUE, true)
      this.game.add.tween( this.littleBirdSprite2 )
          .to( { x: -400 }, 20000, Phaser.Easing.Linear.In, true, 0, Number.MAX_VALUE, false)
      this.littleBirdSprite2.inputEnabled = true;
      this.littleBirdSprite2.input.useHandCursor = true
      this.littleBirdSprite2.events.onInputDown.add( function() { this.birdSound.play() } , this)

      this.littleBirdSprite3 = this.game.add.sprite( this.game.world.width + 440, 500, 'littleBird' )
      this.littleBirdSprite3.scale.set(0.25, 0.25)
      this.game.add.tween( this.littleBirdSprite3 )
          .to( { y: 640 }, 800, Phaser.Easing.Quadratic.InOut, true, 0, Number.MAX_VALUE, true)
      this.game.add.tween( this.littleBirdSprite3 )
          .to( { x: -100 }, 20000, Phaser.Easing.Linear.In, true, 0, Number.MAX_VALUE, false)
      this.littleBirdSprite3.inputEnabled = true;
      this.littleBirdSprite3.input.useHandCursor = true
      this.littleBirdSprite3.events.onInputDown.add( function() { this.birdSound.play() } , this)
      
      var headerTextSprite = this.game.add.sprite(this.game.world.centerX, 500, 'headerText')
      headerTextSprite.anchor.set(0.5, 0.5)

      // Common Audio
      this.greatManAudio = this.game.add.audio('greatManSound');
      this.goodJobManAudio = this.game.add.audio('goodJobManSound');
      this.noNoManAudio = this.game.add.audio('noNoManSound');
      this.thinkAboutItManAudio = this.game.add.audio('thinkAboutItManSound');

      this.greatAudio = this.game.add.audio('greatSound');
      this.goodJobAudio = this.game.add.audio('goodJobSound');
      this.noNoAudio = this.game.add.audio('noNoSound');
      this.thinkAgainAudio = this.game.add.audio('thinkAgainSound');
      this.wonderfulAudio = this.game.add.audio('wonderfulSound');
      this.wellDoneAudio = this.game.add.audio('wellDoneSound');

      this.happyEndingAudio = this.game.add.audio('happyEndingSound');

      this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    /* Considers right an answer only if correct the first time is answered
     */
    setQuestionAnswer : function( i, correct ) {
      //console.log('Answer for ' + i + ' is ' + correct)
      if( this.correctAnswers[i] === undefined ) {
        this.correctAnswers[i] = correct
      }
    },

    /* Play good answer sound
     */
    playGoodAnswerSound: function () {
      var sounds = [this.greatAudio, this.goodJobAudio, this.wonderfulAudio, this.wellDoneAudio, this.greatManAudio, this.goodJobManAudio]
      sounds[ Math.floor(Math.random()*sounds.length) ].play()
    },

    /* Play wrong answer sound
     */
    playWrongAnswerSound: function () {
      var sounds = [this.noNoAudio, this.thinkAgainAudio, this.noNoManAudio, this.thinkAboutItManAudio]
      sounds[ Math.floor(Math.random()*sounds.length) ].play()
    },

    /* Set up sprites so they work as drag and drop
     */
    setUpSpritesDragging: function( i // id of this solution to the answer
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
              var answerSprite = spriteArray[this.userAnswers[targetAnswer]]
              answerSprite.x = answerSprite.originalX
              answerSprite.y = answerSprite.originalY
              answerSprite.anchor = answerSprite.originalAnchor
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
              //targetButton.setFrames(2,1,0)
              if ( this.userAnswerSprites[targetAnswer] ) {
                this.userAnswerSprites[targetAnswer].destroy()
              }
            }
          }
        }, this)
    },

    goToQuestion1 : function() {
      // Questions: GROUP 1
      this.createSection1()
      // Fade ins
      this.game.add.tween(this.question1Sprite).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true)
      this.game.add.tween(this.answers1Group).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true, 1000)
      // Camera
      this.game.add.tween(this.game.camera).to( { y: 1000 } , 1000, Phaser.Easing.Quadratic.Out, true)
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
      this.game.time.events.add(Phaser.Timer.SECOND, function(){this.question1Audio.play()}, this);

      // Answers
      this.answer1$1Button = this.game.add.button(
        60, 1350, 'daySpritesheet',
        function() {
          this.answerBox1$1Group.visible = true
          this.answerBox1$1Group.alpha = 0
          this.answerBox1$2Group.visible = false
          this.answerBox1$3Group.visible = false
          this.game.add.tween(this.answerBox1$1Group).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true)
          this.dayAudio.play()
        },
        this, 2, 1, 0)
      this.dayAudio = this.game.add.audio('dayAudio');

      this.answer1$2Button = this.game.add.button(500, 1350, 'monthSpritesheet',
        function() {
          this.answerBox1$1Group.visible = false
          this.answerBox1$2Group.visible = true
          this.answerBox1$2Group.alpha = 0
          this.answerBox1$3Group.visible = false
          this.game.add.tween(this.answerBox1$2Group).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true)
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
          this.yearAudio.play()
        },
        this, 2, 1, 0)
      this.yearAudio = this.game.add.audio('yearAudio');

      this.answers1Group = this.game.add.group()
      this.answers1Group.add(this.answer1$1Button)
      this.answers1Group.add(this.answer1$2Button)
      this.answers1Group.add(this.answer1$3Button)
      this.answers1Group.alpha = 0

      var checkQuestion1Complete = function() {
        if ( this.userAnswerDay !== null &&
             this.userAnswerMonth !== null &&
             this.userAnswerYear !== null ) {
          var today = new Date()
          if ((today.getYear() === this.userAnswerYear + 114) &&
              (today.getMonth() === this.userAnswerMonth) &&
              (today.getDate() === this.userAnswerDay)) {
            if( this.timedEvent ) {
              this.game.time.events.remove( this.timedEvent )
            }
            this.timedEvent =
              this.game.time.events.add(Phaser.Timer.SECOND * 1.2, function() {
                this.playGoodAnswerSound()
                this.goToQuestion2()
              }, this);
            this.setQuestionAnswer( 0, true )
          } else {
            this.setQuestionAnswer( 0, false )
          }
        }
      }

      //
      // Answer box 1: NUMBERS
      //
      this.answerBox1$1Group = this.game.add.group()
      this.answerBox1$1Background = this.game.add.sprite(this.game.world.centerX, 1800, 'answer_box1_1')
      this.answerBox1$1Background.anchor.set(0.5, 0.5)
      this.answerBox1$1Group.add(this.answerBox1$1Background)

      var setUpClick = function(i, currentSprite, currentSound) {
        currentSprite.input.useHandCursor = true
        currentSprite.events.onInputDown.add(
          function() {
            currentSound.play()
          }, this)
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
                if( this.timedEvent ) {
                  this.game.time.events.remove( this.timedEvent )
                }
                this.timedEvent =
                this.game.time.events.add(Phaser.Timer.SECOND * 0.8, function() {
                  this.playWrongAnswerSound()
                }, this);
              }
              checkQuestion1Complete.call(this)
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
        setUpClick.call(this, i, this.numberSprites[i], this.numberSounds[i])
        this.answerBox1$1Group.add(this.numberSprites[i])
      }
      for(i = 11; i <= 20; i++) {
        this.numberSprites[i] = this.game.add.sprite(200 + (i-11) * 155, 1740, 'number' + i)
        this.numberSprites[i].inputEnabled = true;
        setUpNumbersDragging.call(this, i, this.numberSprites[i], this.answer1$1Button)
        setUpClick.call(this, i, this.numberSprites[i], this.numberSounds[i])
        this.answerBox1$1Group.add(this.numberSprites[i])
      }
      for(i = 21; i <= 31; i++) {
        this.numberSprites[i] = this.game.add.sprite(170 + (i-21) * 144, 1880, 'number' + i)
        this.numberSprites[i].inputEnabled = true;
        setUpNumbersDragging.call(this, i, this.numberSprites[i], this.answer1$1Button)
        setUpClick.call(this, i, this.numberSprites[i], this.numberSounds[i])
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
                if( this.timedEvent ) {
                  this.game.time.events.remove( this.timedEvent )
                }
                this.timedEvent =
                this.game.time.events.add(Phaser.Timer.SECOND * 0.8, function() {
                  this.playWrongAnswerSound()
                }, this);
              }
              checkQuestion1Complete.call(this)
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
      this.monthSounds = []
      for(i = 0; i < monthNames.length; i++) {
        this.monthSounds[i] = this.game.add.audio(monthNames[i] + 'Audio');
      }

      this.monthSprites = []
      for(i = 0; i < 12; i++) {
        this.monthSprites[i] = this.game.add.sprite(380 + (i % 4) * 380, 1670 + 140 * Math.floor(i/4), monthNames[i])
        this.monthSprites[i].anchor.set(0.5, 0.5)
        this.monthSprites[i].inputEnabled = true;
        this.monthSprites[i].input.useHandCursor = true
        setUpMonthsDragging.call(this, i, this.monthSprites[i], this.answer1$2Button)
        setUpClick.call(this, i, this.monthSprites[i], this.monthSounds[i])
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
                if( this.timedEvent ) {
                  this.game.time.events.remove( this.timedEvent )
                }
                this.timedEvent =
                this.game.time.events.add(Phaser.Timer.SECOND * 1.0, function() {
                  this.playWrongAnswerSound()
                }, this);
              }
              checkQuestion1Complete.call(this)
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
        setUpClick.call(this, i, this.yearSprites[i], this.yearSounds[i])
        this.answerBox1$3Group.add(this.yearSprites[i])
      }

      this.answerBox1$3Group.alpha = 0
      this.answerBox1$3Group.visible = false

    },

    goToQuestion2: function() {
      // Questions: GROUP 2
      this.createSection2()
      // Fade outs
      this.game.add.tween(this.question1Sprite).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true)
          .onComplete.add(function(){this.question1Sprite.visible = false}, this)
      this.game.add.tween(this.answers1Group).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
          .onComplete.add(function(){this.answers1Group.visible = false}, this)
      this.game.add.tween(this.answerBox1$1Group).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
          .onComplete.add(function(){this.answerBox1$1Group.visible = false}, this)
      this.game.add.tween(this.answerBox1$2Group).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
          .onComplete.add(function(){this.answerBox1$2Group.visible = false}, this)
      this.game.add.tween(this.answerBox1$3Group).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
          .onComplete.add(function(){this.answerBox1$3Group.visible = false}, this)
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
      this.question2Sprite.inputEnabled = true;
      this.question2Sprite.input.useHandCursor = true
      this.question2Sprite.events.onInputDown.add(
        function() {
          this.question2Audio.play()
        }
        , this)
      this.question2Audio = this.game.add.audio('question2Audio');
      this.game.time.events.add(Phaser.Timer.SECOND, function(){this.question2Audio.play()}, this);

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

      var daysOfWeekPositions = [ {x: this.game.world.centerX - 600, y: 2530},
                                  {x: this.game.world.centerX - 200, y: 2530},
                                  {x: this.game.world.centerX + 200, y: 2530},
                                  {x: this.game.world.centerX + 600, y: 2530},
                                  {x: this.game.world.centerX - 400, y: 2700},
                                  {x: this.game.world.centerX, y: 2700},
                                  {x: this.game.world.centerX + 400, y: 2700} ]

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
        this.setUpSpritesDragging.call(
          this, i, this.daysOfWeekSprites[i], 'dayOfWeek',
          this.daysOfWeekSprites, this.answer2Button, new Phaser.Point(100,0),
          function(answerId) {
             var date = new Date()
             // Take into consideration that Sunday === 0
             if( date.getDay() === [1, 2, 3, 4, 5, 6, 0][answerId] ) {
                if( this.timedEvent ) {
                  this.game.time.events.remove( this.timedEvent )
                }
                this.timedEvent =
                  this.game.time.events.add(Phaser.Timer.SECOND * 1.2, function() {
                    this.playGoodAnswerSound()
                    this.goToQuestion3()
                  }, this);
                this.setQuestionAnswer( 1, true )
             } else {
                if( this.timedEvent ) {
                  this.game.time.events.remove( this.timedEvent )
                }
                this.timedEvent =
                  this.game.time.events.add(Phaser.Timer.SECOND * 1.0, function() {
                    this.playWrongAnswerSound()
                  }, this);
                this.setQuestionAnswer( 1, false )
             }
          })
      }, this)
    },

    goToQuestion3: function() {
      // Questions: GROUP 3
      this.createSection3()
      // Fade outs
      this.game.add.tween(this.question2Sprite).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true)
          .onComplete.add(function(){this.question2Sprite.visible = false}, this)
      this.game.add.tween(this.answer2Button).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
          .onComplete.add(function(){this.answer2Button.visible = false}, this)
      this.game.add.tween(this.answerBox2Group).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
          .onComplete.add(function(){this.answerBox2Group.visible = false}, this)
      if ( 'dayOfWeek' in this.userAnswerSprites ) {
        this.game.add.tween(this.userAnswerSprites['dayOfWeek']).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
            .onComplete.add(function(){this.userAnswerSprites['dayOfWeek'].visible = false}, this)
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
      this.question3Sprite.inputEnabled = true;
      this.question3Sprite.input.useHandCursor = true
      this.question3Sprite.events.onInputDown.add(
        function() {
          this.question3Audio.play()
        }
        , this)
      this.question3Audio = this.game.add.audio('question3Audio');
      this.game.time.events.add(Phaser.Timer.SECOND, function(){this.question3Audio.play()}, this);

      this.answer3Button = this.game.add.button(
        this.game.world.centerX, 2600, 'text3_1',
        function() {
          this.game.add.tween(this.answerBox3Group).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true)
        },
        this, 2, 1, 0)
      this.answer3Button.anchor.set(0.5, 0.5)
      this.answer3Button.alpha = 0

      this.answerBox3Group = this.game.add.group()
      this.answerBox3Background = this.game.add.sprite(this.game.world.centerX, 2960, 'answer_box2')
      this.answerBox3Background.anchor.set(0.5, 0.5)
      this.answerBox3Group.add(this.answerBox3Background)
      this.answerBox3Group.alpha = 0

      var daysOfWeekPositions = [ {x: this.game.world.centerX - 600, y: 2850},
                                  {x: this.game.world.centerX - 200, y: 2850},
                                  {x: this.game.world.centerX + 200, y: 2850},
                                  {x: this.game.world.centerX + 600, y: 2850},
                                  {x: this.game.world.centerX - 400, y: 3050},
                                  {x: this.game.world.centerX, y: 3050},
                                  {x: this.game.world.centerX + 400, y: 3050} ]

      this.daysOfWeekSprites = []
      this.daysOfWeekSounds = []
      daysOfWeek.forEach(function(day, i) {
        this.daysOfWeekSprites[i] = this.game.add.sprite(daysOfWeekPositions[i].x, daysOfWeekPositions[i].y, day)
        this.daysOfWeekSprites[i].anchor.set(0.5, 0.5)
        this.daysOfWeekSprites[i].inputEnabled = true;
        this.daysOfWeekSprites[i].input.useHandCursor = true
        this.answerBox3Group.add(this.daysOfWeekSprites[i])
        this.daysOfWeekSprites[i].events.onInputDown.add(
          function() {
            this.daysOfWeekSounds[i].play()
          }, this)
        this.daysOfWeekSounds[i] = this.game.add.audio( day + 'Audio' );
        this.setUpSpritesDragging.call(
          this, i, this.daysOfWeekSprites[i], 'dayOfWeekYesterday',
          this.daysOfWeekSprites, this.answer3Button, new Phaser.Point(225,0),
          function(answerId) {
            var date = new Date()
            // Check yesterday, with a sunday-based begin of the week.
            if( date.getDay() === [2, 3, 4, 5, 6, 0, 1][answerId] ) {
              if( this.timedEvent ) {
                this.game.time.events.remove( this.timedEvent )
              }
              this.timedEvent =
                this.game.time.events.add(Phaser.Timer.SECOND * 1.2, function() {
                  this.playGoodAnswerSound()
                  this.goToQuestion4()
                }, this);
              this.setQuestionAnswer( 2, true )
            } else {
              if( this.timedEvent ) {
                this.game.time.events.remove( this.timedEvent )
              }
              this.timedEvent =
                this.game.time.events.add(Phaser.Timer.SECOND * 1.0, function() {
                  this.playWrongAnswerSound()
                }, this);
              this.setQuestionAnswer( 2, false )
            }
          })
      }, this)
    },

    goToQuestion4: function() {
      // Questions: GROUP 4
      this.createSection4()
      // Fade outs
      this.game.add.tween(this.question3Sprite).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true)
          .onComplete.add(function(){this.question3Sprite.visible = false}, this)
      this.game.add.tween(this.answer3Button).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
          .onComplete.add(function(){this.answer3Button.visible = false}, this)
      this.game.add.tween(this.answerBox3Group).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
          .onComplete.add(function(){this.answerBox3Group.visible = false}, this)
      if( 'dayOfWeekYesterday' in this.userAnswerSprites ) {
        this.game.add.tween(this.userAnswerSprites['dayOfWeekYesterday']).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
            .onComplete.add(function(){this.userAnswerSprites['dayOfWeekYesterday'].visible = false}, this)
      }
      // Fade ins
      this.game.add.tween(this.question4Sprite).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true)
      this.game.add.tween(this.answer4Button).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true, 1000)
      // Camera
      this.game.add.tween(this.game.camera).to( { y: 2520 } , 1000, Phaser.Easing.Quadratic.Out, true)
    },

    /**************************************************************************
     * Section 4
     *************************************************************************/

    createSection4: function() {
      this.question4Sprite = this.game.add.sprite(this.game.world.centerX, 2700, 'question4')
      this.question4Sprite.anchor.set(0.5, 0.5)
      this.question4Sprite.alpha = 0
      this.question4Sprite.inputEnabled = true;
      this.question4Sprite.input.useHandCursor = true
      this.question4Sprite.events.onInputDown.add(
        function() {
          this.question4Audio.play()
        }
        , this)
      this.question4Audio = this.game.add.audio('question4Audio');
      this.game.time.events.add(Phaser.Timer.SECOND, function(){this.question4Audio.play()}, this);

      this.answer4Button = this.game.add.button(
        this.game.world.centerX, 2900, 'text4_1',
        function() {
          this.game.add.tween(this.answerBox4Group).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true)
        },
        this, 2, 1, 0)
      this.answer4Button.anchor.set(0.5, 0.5)
      this.answer4Button.alpha = 0

      this.answerBox4Group = this.game.add.group()
      this.answerBox4Background = this.game.add.sprite(this.game.world.centerX, 3270, 'answer_box2')
      this.answerBox4Background.anchor.set(0.5, 0.5)
      this.answerBox4Group.add(this.answerBox4Background)
      this.answerBox4Group.alpha = 0

      var daysOfWeekPositions = [ {x: this.game.world.centerX - 600, y: 3180},
                                  {x: this.game.world.centerX - 200, y: 3180},
                                  {x: this.game.world.centerX + 200, y: 3180},
                                  {x: this.game.world.centerX + 600, y: 3180},
                                  {x: this.game.world.centerX - 400, y: 3380},
                                  {x: this.game.world.centerX, y: 3380},
                                  {x: this.game.world.centerX + 400, y: 3380} ]

      this.daysOfWeekSprites = []
      this.daysOfWeekSounds = []
      daysOfWeek.forEach(function(day, i) {
        this.daysOfWeekSprites[i] = this.game.add.sprite(daysOfWeekPositions[i].x, daysOfWeekPositions[i].y, day)
        this.daysOfWeekSprites[i].anchor.set(0.5, 0.5)
        this.daysOfWeekSprites[i].inputEnabled = true;
        this.daysOfWeekSprites[i].input.useHandCursor = true
        this.answerBox4Group.add(this.daysOfWeekSprites[i])
        this.daysOfWeekSprites[i].events.onInputDown.add(
          function() {
            this.daysOfWeekSounds[i].play()
          }, this)
        this.daysOfWeekSounds[i] = this.game.add.audio( day + 'Audio' );
        this.setUpSpritesDragging.call(
          this, i, this.daysOfWeekSprites[i], 'dayOfWeekTomorrow',
          this.daysOfWeekSprites, this.answer4Button, new Phaser.Point(180,0),
          function(answerId) {
            var date = new Date()
            // Check tomorrow, with a sunday-based begin of the week (turns out to be equal as a result)
            if( date.getDay() === answerId ) {
              if( this.timedEvent ) {
                this.game.time.events.remove( this.timedEvent )
              }
              this.timedEvent =
                this.game.time.events.add(Phaser.Timer.SECOND * 1.2, function() {
                  this.playGoodAnswerSound()
                  this.goToQuestion5()
                }, this);
              this.setQuestionAnswer( 3, true )
            } else {
              if( this.timedEvent ) {
                this.game.time.events.remove( this.timedEvent )
              }
              this.timedEvent =
                this.game.time.events.add(Phaser.Timer.SECOND * 1.0, function() {
                  this.playWrongAnswerSound()
                }, this);
              this.setQuestionAnswer( 3, false )
            }
          })
      }, this)
    },

    goToQuestion5: function() {
      this.createSection5()
      // Fade outs
      this.game.add.tween(this.question4Sprite).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true)
          .onComplete.add(function(){this.question4Sprite.visible = false}, this)
      this.game.add.tween(this.answer4Button).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
          .onComplete.add(function(){this.answer4Button.visible = false}, this)
      this.game.add.tween(this.answerBox4Group).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
          .onComplete.add(function(){this.answerBox4Group.visible = false}, this)
      if( 'dayOfWeekTomorrow' in this.userAnswerSprites ) {
        this.game.add.tween(this.userAnswerSprites['dayOfWeekTomorrow']).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
            .onComplete.add(function(){this.userAnswerSprites['dayOfWeekTomorrow'].visible = false}, this)
      }
      // Fade ins
      this.game.add.tween(this.question5Sprite).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true)
      this.game.add.tween(this.answer5Button).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true, 1000)
      // Camera
      this.game.add.tween(this.game.camera).to( { y: 3100 } , 1000, Phaser.Easing.Quadratic.Out, true)
    },

    /**************************************************************************
     * Section 5
     *************************************************************************/

    createSection5: function() {
      this.question5Sprite = this.game.add.sprite(this.game.world.centerX, 3280, 'question5')
      this.question5Sprite.anchor.set(0.5, 0.5)
      this.question5Sprite.alpha = 0
      this.question5Sprite.inputEnabled = true;
      this.question5Sprite.input.useHandCursor = true
      this.question5Sprite.events.onInputDown.add(
        function() {
          this.question5Audio.play()
        }
        , this)
      this.question5Audio = this.game.add.audio('question5Audio');
      this.game.time.events.add(Phaser.Timer.SECOND, function(){this.question5Audio.play()}, this);

      this.answer5Button = this.game.add.button(
        this.game.world.centerX, 3680, 'text5_1',
        function() {
          this.game.add.tween(this.answerBox5Group).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true)
        },
        this, 2, 1, 0)
      this.answer5Button.anchor.set(0.5, 0.5)
      this.answer5Button.alpha = 0

      this.answerBox5left = this.game.add.sprite(335, 3800, 'answer_box_5')
      this.answerBox5left.anchor.set(0.5, 0.5)
      this.answerBox5right = this.game.add.sprite(1585, 3800, 'answer_box_5')
      this.answerBox5right.anchor.set(0.5, 0.5)

      this.answerBox5Group = this.game.add.group()
      this.answerBox5Group.add(this.answerBox5left)
      this.answerBox5Group.add(this.answerBox5right)
      this.answerBox5Group.alpha = 0

      var weatherIcons = [{id: 'sunny', x: 350, y: 3550},
                          {id: 'partially_cloudy', x: 350, y: 3800},
                          {id: 'cloudy', x: 350, y: 4050},
                          {id: 'rainy', x: 1590, y: 3550},
                          {id: 'snowy', x: 1590, y: 3800},
                          {id: 'foggy', x: 1590, y: 4050}]
      this.weatherSprites = []
      this.weatherSounds = []
      weatherIcons.forEach(function(e,i) {
        this.weatherSprites[i] = this.game.add.sprite(e.x, e.y, e.id)
        this.weatherSprites[i].anchor.set(0.5,0.5)
        this.weatherSprites[i].inputEnabled = true
        this.weatherSprites[i].input.useHandCursor = true
        this.answerBox5Group.add(this.weatherSprites[i])
        this.weatherSounds[i] = this.game.add.audio( e.id + 'Audio' );
        this.weatherSprites[i].events.onInputDown.add(
          function() {
            this.weatherSounds[i].play()
          }, this)
        this.setUpSpritesDragging.call(
          this, i, this.weatherSprites[i], 'weather',
          this.weatherSprites, this.answer5Button, new Phaser.Point(0,0),
          function(answerId) {
            var correctAnswer = function() {
              if( this.timedEvent ) {
                this.game.time.events.remove( this.timedEvent )
              }
              this.timedEvent =
                this.game.time.events.add(Phaser.Timer.SECOND * 1.2, function() {
                  this.playGoodAnswerSound()
                  this.goToQuestion6()
                }, this);
              this.setQuestionAnswer( 4, true )
            }
            var wrongAnswer = function() {
              if( this.timedEvent ) {
                this.game.time.events.remove( this.timedEvent )
              }
              this.timedEvent =
                this.game.time.events.add(Phaser.Timer.SECOND * 1.2, function() {
                  this.playWrongAnswerSound()
                }, this);
              this.setQuestionAnswer( 4, false )
            }
            // http://bugs.openweathermap.org/projects/api/wiki/Weather_Data
            // http://bugs.openweathermap.org/projects/api/wiki/Weather_Condition_Codes
            if (currentWeatherConditions) {
              if (currentWeatherConditions.clouds.all < 20) {
                if(answerId === 0) { correctAnswer.call(this) } else { wrongAnswer.call(this) }
              } else if (currentWeatherConditions.clouds.all < 40) {
                if(answerId === 1) { correctAnswer.call(this) } else { wrongAnswer.call(this) }
              } else {
                if ( currentWeatherConditions.weather ) {
                  switch ( currentWeatherConditions.weather[0].main ) {
                    case 'Clouds':
                      if(answerId === 2) { correctAnswer.call(this) } else { wrongAnswer.call(this) }
                      break
                    case 'Rain':
                    case 'Drizzle':
                    case 'Thunderstorm':
                      if(answerId === 3) { correctAnswer.call(this) } else { wrongAnswer.call(this) }
                      break
                    case 'Snow':
                      if(answerId === 4) { correctAnswer.call(this) } else { wrongAnswer.call(this) }
                      break
                    case 'Atmosphere':
                      if(answerId === 5) { correctAnswer.call(this) } else { wrongAnswer.call(this) }
                      break
                    case 'Extreme':
                    case 'Additional':
                      correctAnswer.call(this)
                      break
                    default:
                      console.log('A case of weather conditions wasn\'t handled properly')
                      correctAnswer.call(this)
                  }
                }
              }
            } else {
              correctAnswer.call(this)
            }
          })
      }, this)
    },

    goToQuestion6: function() {
      this.createSection6()
      // Fade outs
      this.game.add.tween(this.question5Sprite).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true)
          .onComplete.add(function(){this.question5Sprite.visible = false}, this)
      this.game.add.tween(this.answer5Button).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
          .onComplete.add(function(){this.answer5Button.visible = false}, this)
      this.game.add.tween(this.answerBox5Group).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
          .onComplete.add(function(){this.answerBox5Group.visible = false}, this)
      if( 'weather' in this.userAnswerSprites ) {
        this.game.add.tween(this.userAnswerSprites['weather']).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
            .onComplete.add(function(){this.userAnswerSprites['weather'].visible = false}, this)
      }
      // Camera
      this.game.add.tween(this.game.camera).to( { y: 3600 } , 1000, Phaser.Easing.Quadratic.Out, true)
      // Fade ins
      this.game.add.tween(this.question6Sprite).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true)
      this.game.add.tween(this.answer6BoyButton).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true, 1000)
      this.game.add.tween(this.answer6GirlButton).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true, 1000)
    },

    /**************************************************************************
     * Section 6
     *************************************************************************/

    createSection6: function() {
      this.question6Sprite = this.game.add.sprite(this.game.world.centerX, 3740, 'question6')
      this.question6Sprite.anchor.set(0.5, 0.5)
      this.question6Sprite.alpha = 0
      this.question6Sprite.inputEnabled = true;
      this.question6Sprite.input.useHandCursor = true
      this.question6Sprite.events.onInputDown.add(
        function() {
          this.question6Audio.play()
        }
        , this)
      this.question6Audio = this.game.add.audio('question6Audio');
      this.game.time.events.add(Phaser.Timer.SECOND, function(){this.question6Audio.play()}, this);

      this.answer6BoyButton = this.game.add.button(
        this.game.world.centerX - 150, 4150, 'boyAnswer',
        this.dressBoy,
        this, 2, 1, 0)
      this.answer6BoyButton.anchor.set(0.5, 0.5)
      this.answer6BoyButton.alpha = 0
      this.answer6GirlButton = this.game.add.button(
        this.game.world.centerX + 150, 4150, 'girlAnswer',
        this.dressGirl,
        this, 2, 1, 0)
      this.answer6GirlButton.anchor.set(0.5, 0.5)
      this.answer6GirlButton.alpha = 0

      this.answerBox6 = this.game.add.sprite(this.game.world.centerX, 3660, 'answer_box_6')
      this.answerBox6.anchor.set(0.5,0)
      this.answerBox6.scale.set(0.92,0.92)
      this.answerBox6Group = this.game.add.group()
      this.answerBox6Group.add( this.answerBox6 )
      this.answerBox6Group.alpha = 0
    },

    setUpMultiSpritesDragging: function( i // id of this solution to the answer
                                       , spriteArray // all the sprites to drag
                                       , targetAnswer // string id of the answer
                                       , spriteConfig // object with config info about the sprite
                                       , targetButton // target Button where the sprites will be placed
                                       , solutionCheck // function to be run when a new solution is given
                                       ) {
      var currentSprite = spriteArray[i]
      currentSprite.originalX = currentSprite.x
      currentSprite.originalY = currentSprite.y
      currentSprite.input.enableDrag()
      this.userAnswers[targetAnswer] = this.userAnswers[targetAnswer] || []
      var thisUserAnswers = this.userAnswers[targetAnswer]
      currentSprite.events.onDragStop.add(
        function() {
          if ( targetButton.getBounds().contains(this.game.input.x, this.game.input.y) ) {
            if ( thisUserAnswers[spriteConfig.layer] ) {
              // There is an answer per layer
              var answerSprite = spriteArray[thisUserAnswers[spriteConfig.layer]]
              answerSprite.x = answerSprite.originalX
              answerSprite.y = answerSprite.originalY
            }
            currentSprite.x = targetButton.x + spriteConfig.offsetX
            currentSprite.y = targetButton.y + spriteConfig.offsetY
            if ( spriteConfig.dual ) { currentSprite.frame = 0 }
            thisUserAnswers[spriteConfig.layer] = i
            solutionCheck.call(this,i)
          } else {
            currentSprite.x = currentSprite.originalX
            currentSprite.y = currentSprite.originalY
            if ( spriteConfig.dual ) { currentSprite.frame = 1 }
            if ( i === thisUserAnswers[spriteConfig.layer] ) { thisUserAnswers[spriteConfig.layer] = null }
          }
        }, this)
    },

    dressBoy: function() {
      this.userGender = 'boy'
      this.boySound = this.game.add.audio('boyAudio');
      this.boySound.play()
      this.game.add.tween(this.question6Sprite).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true)
          .onComplete.add(function(){this.question6Sprite.visible = false}, this)
      this.game.add.tween(this.answer6GirlButton).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
          .onComplete.add(function(){this.answer6GirlButton.visible = false}, this)
      this.game.add.tween(this.answer6BoyButton).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
          .onComplete.add(function(){this.answer6BoyButton.visible = false}, this)

      this.boyBigButton = this.game.add.button(980, 4090, 'boy',
          function() { this.boySound.play() }, this,
          0, 0, 0)
      this.boyBigButton.input.useHandCursor = true
      this.answerBox6Group.add( this.boyBigButton )
      var readyButton = this.game.add.button( this.game.world.centerX, 3970, 'tick',
          function() {
            this.playGoodAnswerSound()
            this.goToQuestion7()
            this.setQuestionAnswer( 5, true )
          }, this, 2, 1, 0)
      readyButton.anchor.set(0.5, 0.5)
      readyButton.input.useHandCursor = true
      this.answerBox6Group.add( readyButton )

      var boyClothesConfig =
        [{id: 'boots_boy', sound: 'bootsAudio', x: 1500, y: 4660, dual: false, offsetX: 128, offsetY: 560, layer: 5},
         {id: 'rainboots_boy', sound: 'rainbootsAudio', x: 1500, y: 4510, dual: false, offsetX: 128, offsetY: 552, layer: 5},
         {id: 'shoes_boy', sound: 'shoesAudio', x: 1500, y: 4360, dual: false, offsetX: 128, offsetY: 575, layer: 5},
         {id: 'sandals_boy', sound: 'sandalsAudio', x: 1500, y: 4240, dual: true, offsetX: 131, offsetY: 577, layer: 5},
         {id: 'socks_boy', sound: 'socksAudio', x: 1500, y: 4110, dual: false, offsetX: 128, offsetY: 570, layer: 1},
         {id: 'scarf_boy', sound: 'scarfAudio', x: 1500, y: 3940, dual: false, offsetX: 128, offsetY: 260, layer: 40},
         {id: 'gloves_boy', sound: 'glovesAudio', x: 1500, y: 3800, dual: false, offsetX: 128, offsetY: 342, layer: 21},
         {id: 'woolcap_boy', sound: 'woolcapAudio', x: 1200, y: 3820, dual: true, offsetX: 120, offsetY: 40, layer: 41},
         {id: 'cap_boy', sound: 'capAudio', x: 700, y: 3800, dual: false, offsetX: 124, offsetY: 38, layer: 41},
         {id: 'trousers_boy', sound: 'trousersAudio', x: 700, y: 4050, dual: false, offsetX: 128, offsetY: 459, layer: 10},
         {id: 'shorts_boy', sound: 'shortsAudio', x: 700, y: 4350, dual: false, offsetX: 128, offsetY: 420, layer: 10},
         {id: 'shirt_boy', sound: 'shirtAudio', x: 700, y: 4600, dual: true, offsetX: 127, offsetY: 273, layer: 15},
         {id: 'tshirt_boy', sound: 'tshirtAudio', x: 450, y: 3900, dual: false, offsetX: 127, offsetY: 273, layer: 15},
         {id: 'jumper_boy', sound: 'jumperAudio', x: 450, y: 4180, dual: true, offsetX: 128, offsetY: 273, layer: 25},
         {id: 'coat_boy', sound: 'coatAudio', x: 450, y: 4500, dual: true, offsetX: 128, offsetY: 310, layer: 30}]
      this.boyClothesSprites = []
      this.boyClothesSounds = []
      boyClothesConfig = _.sortBy(boyClothesConfig, 'layer')
      boyClothesConfig.forEach( function(e, i) {
        var sprite = this.boyClothesSprites[i] = this.game.add.sprite(e.x, e.y, e.id)
        sprite.anchor.set(0.5,0.5)
        sprite.inputEnabled = true
        sprite.input.useHandCursor = true
        sprite.events.onInputDown.add(
          function() {
            this.boyClothesSounds[i].play()
          }
          , this)
        this.boyClothesSounds[i] = this.game.add.audio(e.sound);
        if( e.dual ) { sprite.frame = 1 }
        this.setUpMultiSpritesDragging(i, this.boyClothesSprites, 'boyClothes',
          e, this.boyBigButton,
          function() { /* do nothing */ })
        this.answerBox6Group.add( sprite )
      }, this )

      this.game.add.tween(this.answerBox6Group).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
    },

    dressGirl: function() {
      this.userGender = 'girl'
      this.girlSound = this.game.add.audio('girlAudio');
      this.girlSound.play()
      this.game.add.tween(this.question6Sprite).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true)
          .onComplete.add(function(){this.question6Sprite.visible = false}, this)
      this.game.add.tween(this.answer6GirlButton).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
          .onComplete.add(function(){this.answer6GirlButton.visible = false}, this)
      this.game.add.tween(this.answer6BoyButton).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
          .onComplete.add(function(){this.answer6BoyButton.visible = false}, this)

      this.girlBigButton = this.game.add.button(980, 4090, 'girl',
          function() { this.girlSound.play() }, this,
          0, 0, 0)
      this.girlBigButton.input.useHandCursor = true
      this.answerBox6Group.add( this.girlBigButton )
      var readyButton = this.game.add.button( this.game.world.centerX, 3970, 'tick',
          function(){
            this.playGoodAnswerSound()
            this.goToQuestion7()
            this.setQuestionAnswer( 5, true )
          },
      this, 2, 1, 0)
      readyButton.anchor.set(0.5, 0.5)
      readyButton.input.useHandCursor = true
      this.answerBox6Group.add( readyButton )

      var girlClothesConfig =
        [{id: 'boots_girl', sound: 'bootsAudio', x: 1500, y: 4660, dual: false, offsetX: 111, offsetY: 557, layer: 11},
         {id: 'rainboots_girl', sound: 'rainbootsAudio', x: 1500, y: 4510, dual: false, offsetX: 111, offsetY: 544, layer: 11},
         {id: 'shoes_girl', sound: 'shoesAudio', x: 1500, y: 4360, dual: true, offsetX: 112, offsetY: 567, layer: 11},
         {id: 'sandals_girl', sound: 'sandalsAudio', x: 1500, y: 4240, dual: true, offsetX: 114, offsetY: 566, layer: 11},
         {id: 'socks_girl', sound: 'socksAudio', x: 1500, y: 4110, dual: false, offsetX: 111, offsetY: 558, layer: 1},
         {id: 'scarf_girl', sound: 'scarfAudio', x: 1500, y: 3940, dual: false, offsetX: 110, offsetY: 246, layer: 40},
         {id: 'gloves_girl', sound: 'glovesAudio', x: 1500, y: 3760, dual: false, offsetX: 110, offsetY: 332, layer: 21},
         {id: 'woolcap_girl', sound: 'woolcapAudio', x: 1200, y: 3800, dual: true, offsetX: 108, offsetY: 60, layer: 41},
         {id: 'trousers_girl', sound: 'trousersAudio', x: 700, y: 3810, dual: false, offsetX: 111, offsetY: 442, layer: 10},
         {id: 'shorts_girl', sound: 'shortsAudio', x: 900, y: 3760, dual: false, offsetX: 112, offsetY: 383, layer: 10},
         {id: 'skirt_girl', sound: 'skirtAudio', x: 700, y: 4080, dual: false, offsetX: 113, offsetY: 380, layer: 10},
         {id: 'shirt_girl', sound: 'shirtAudio', x: 700, y: 4310, dual: true, offsetX: 112, offsetY: 262, layer: 15},
         {id: 'tshirt_girl', sound: 'tshirtAudio', x: 450, y: 3810, dual: false, offsetX: 110, offsetY: 264, layer: 15},
         {id: 'jumper_girl', sound: 'jumperAudio', x: 700, y: 4580, dual: true, offsetX: 110, offsetY: 268, layer: 25},
         {id: 'dress_girl', sound: 'dressAudio', x: 450, y: 4140, dual: true, offsetX: 116, offsetY: 355, layer: 25},
         {id: 'coat_girl', sound: 'coatAudio', x: 450, y: 4510, dual: true, offsetX: 114, offsetY: 300, layer: 30}]
      this.girlClothesSprites = []
      this.girlClothesSounds = []
      girlClothesConfig = _.sortBy(girlClothesConfig, 'layer')
      girlClothesConfig.forEach( function(e, i) {
        var sprite = this.girlClothesSprites[i] = this.game.add.sprite(e.x, e.y, e.id)
        sprite.anchor.set(0.5,0.5)
        sprite.inputEnabled = true
        sprite.input.useHandCursor = true
        sprite.events.onInputDown.add(
          function() {
            this.girlClothesSounds[i].play()
          }
          , this)
        this.girlClothesSounds[i] = this.game.add.audio(e.sound);
        if( e.dual ) { sprite.frame = 1 }
        this.setUpMultiSpritesDragging(i, this.girlClothesSprites, 'girlClothes',
          e, this.girlBigButton,
          function() { /* do nothing */ })
        this.answerBox6Group.add( sprite )
      }, this )

      this.game.add.tween(this.answerBox6Group).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
    },

    goToQuestion7: function() {
      this.createSection7()
      this.game.add.tween(this.answerBox6Group).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true)
          .onComplete.add(function(){this.answerBox6Group.visible = false}, this)
      this.game.add.tween(this.question7Sprite).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true)
      this.game.add.tween(this.answer7Button).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true, 1000)
      this.game.add.tween(this.game.camera).to( { y: 4150 } , 1000, Phaser.Easing.Quadratic.Out, true)
    },

    /**************************************************************************
     * Section 7
     *************************************************************************/

    createSection7: function() {
      this.question7Sprite = this.game.add.sprite(this.game.world.centerX, 4330, 'question7')
      this.question7Sprite.anchor.set(0.5, 0.5)
      this.question7Sprite.alpha = 0
      this.question7Sprite.inputEnabled = true;
      this.question7Sprite.input.useHandCursor = true
      this.question7Sprite.events.onInputDown.add(
        function() {
          this.question7Audio.play()
        }
        , this)
      this.question7Audio = this.game.add.audio('question7Audio');
      this.game.time.events.add(Phaser.Timer.SECOND, function(){this.question7Audio.play()}, this);

      this.answer7Button = this.game.add.button(
        this.game.world.centerX, 4730, 'text7_1',
        function() {
          this.answer7Button.setFrames(0,0,0)
          this.answerBox7Group.visible = true
          this.game.add.tween(this.answerBox7Group).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
          this.game.add.tween(this.question7Sprite).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
              .onComplete.add(function(){this.question7Sprite.visible = false}, this)
          // TODO: sound
        },
        this, 2, 1, 0)
      this.answer7Button.anchor.set(0.5, 0.5)
      this.answer7Button.alpha = 0
      this.answer7Button.input.useHandCursor = true

      this.answerBox7left = this.game.add.sprite( 60, 4200, 'answer_box_7' )
      this.answerBox7left.scale.set(0.92,0.92)
      this.answerBox7right = this.game.add.sprite( 1320, 4200, 'answer_box_7' )
      this.answerBox7right.scale.set(0.92,0.92)
      this.answerBox7Group = this.game.add.group()
      this.answerBox7Group.add( this.answerBox7left )
      this.answerBox7Group.add( this.answerBox7right )
      this.answerBox7Group.alpha = 0
      this.answerBox7Group.visible = false

      var spritesConfig = [
        {id: 'carnival', sound: 'carnivalAudio', x: 300, y: 4450},
        {id: 'school', x: 300, sound: 'schoolAudio', y: 4750},
        {id: 'home', x: 300, sound: 'homeAudio', y: 5000},
        {id: 'christmas', sound: 'christmasAudio', x: 1600, y: 4500},
        {id: 'holidays', sound: 'holidaysAudio', x: 1600, y: 4950},
      ]
      this.answerSprites7 = []
      this.answerSounds7 = []
      spritesConfig.forEach( function(e, i) {
        var elem = this.answerSprites7[i] = this.game.add.sprite( e.x, e.y, e.id )
        elem.anchor.set(0.5,0.5)
        elem.inputEnabled = true
        elem.input.useHandCursor = true
        this.answerBox7Group.add(elem)
        elem.events.onInputDown.add(
          function() {
            this.answerSounds7[i].play()
          }, this)
        this.answerSounds7[i] = this.game.add.audio( e.sound )
        this.setUpSpritesDragging.call(
          this, i, this.answerSprites7[i], 'whatToDo',
          this.answerSprites7, this.answer7Button, new Phaser.Point(0,0),
          function(/* answerId */) {
            if( this.timedEvent ) {
              this.game.time.events.remove( this.timedEvent )
            }
            this.timedEvent =
            this.game.time.events.add(Phaser.Timer.SECOND * 1.2, function() {
              this.playGoodAnswerSound()
              this.goToQuestion8()
            }, this);
            this.setQuestionAnswer( 6, true )
          })
      }, this)
    },

    goToQuestion8: function() {
      this.createSection8()
      // Fade outs
      this.game.add.tween(this.answerBox7Group).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true)
          .onComplete.add(function(){this.answerBox7Group.visible = false}, this)
      this.game.add.tween(this.answer7Button).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
          .onComplete.add(function(){this.answer7Button.visible = false}, this)
      if( 'whatToDo' in this.userAnswerSprites ) {
        this.game.add.tween(this.userAnswerSprites['whatToDo']).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
            .onComplete.add(function(){this.userAnswerSprites['whatToDo'].visible = false}, this)
      }
      // Fade ins
      this.game.add.tween(this.question8Sprite).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true)
      this.game.add.tween(this.answer8Button).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true, 1000)
      this.game.add.tween(this.game.camera).to( { y: 4470 } , 1000, Phaser.Easing.Quadratic.Out, true)
    },

    /**************************************************************************
     * Section 8
     *************************************************************************/

    createSection8: function() {
      // Questions: GROUP 8
      this.question8Sprite = this.game.add.sprite(this.game.world.centerX, 4670, 'question8')
      this.question8Sprite.anchor.set(0.5, 0.5)
      this.question8Sprite.alpha = 0
      this.question8Sprite.inputEnabled = true;
      this.question8Sprite.input.useHandCursor = true
      this.question8Sprite.events.onInputDown.add(
        function() {
          this.question8Audio.play()
        }
        , this)
      this.question8Audio = this.game.add.audio('question8Audio');
      this.game.time.events.add(Phaser.Timer.SECOND, function(){this.question8Audio.play()}, this);

      this.answer8Button = this.game.add.button(
        this.game.world.centerX, 5100, 'text8_1',
        function() {
          this.answer8Button.setFrames(0,0,0)
          this.answerBox8Group.visible = true
          this.game.add.tween(this.answerBox8Group).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
          this.game.add.tween(this.question8Sprite).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
              .onComplete.add(function(){this.question8Sprite.visible = false}, this)
          // TODO: sound
        },
        this, 2, 1, 0)
      this.answer8Button.anchor.set(0.5, 0.5)
      this.answer8Button.alpha = 0

      this.answerBox8left = this.game.add.sprite( 85, 4530, 'answer_box_8' )
      this.answerBox8left.scale.set(0.9, 0.9)
      this.answerBox8right = this.game.add.sprite( 1300, 4530, 'answer_box_8' )
      this.answerBox8right.scale.set(0.9, 0.9)
      this.answerBox8Group = this.game.add.group()
      this.answerBox8Group.add( this.answerBox8left )
      this.answerBox8Group.add( this.answerBox8right )
      this.answerBox8Group.alpha = 0
      this.answerBox8Group.visible = false

      this.answerSprites8 = []
      this.answerSounds8 = []
      var spritesConfig = [
        {id: 'spring', sound: 'springAudio', x: 350, y: 4800},
        {id: 'summer', sound: 'summerAudio', x: 350, y: 5300},
        {id: 'autumn', sound: 'autumnAudio', x: 1580, y: 4800},
        {id: 'winter', sound: 'winterAudio', x: 1580, y: 5300}
      ]
      var getCurrentSeason = function() {
        var date = new Date()
        switch(date.getMonth()) {
          case 0: case 1:
            return 'winter'
          case 2: // March
            if(date.getDate() < 20) { return 'winter' } else { return 'spring' } break
          case 3: case 4:
            return 'spring'
          case 5: // June
            if(date.getDate() < 21) { return 'spring' } else { return 'summer' } break
          case 6:
            return 'summer'
          case 7: case 8: // September
            if(date.getDate() < 22) { return 'summer' } else { return 'autumn' } break
          case 9: case 10:
            return 'autumn'
          case 11: // December
            if(date.getDate() < 21) { return 'autumn' } else { return 'winter' } break
          default:
            console.log('error in getCurrentSeason')
        }
      }
      spritesConfig.forEach( function(e, i) {
        var elem = this.answerSprites8[i] = this.game.add.sprite( e.x, e.y, e.id )
        elem.anchor.set(0.5,0.5)
        elem.inputEnabled = true
        elem.input.useHandCursor = true
        this.answerBox8Group.add(elem)
        elem.events.onInputDown.add(
          function() {
            this.answerSounds8[i].play()
          }, this)
        this.answerSounds8[i] = this.game.add.audio( e.sound )
        this.setUpSpritesDragging.call(
          this, i, this.answerSprites8[i], 'season',
          this.answerSprites8, this.answer8Button, new Phaser.Point(0,0),
          function( answerId ) {
            if ( spritesConfig[answerId].id === getCurrentSeason() ) {
              if( this.timedEvent ) {
                this.game.time.events.remove( this.timedEvent )
              }
              this.timedEvent =
                this.game.time.events.add(Phaser.Timer.SECOND * 1.2, function() {
                  this.playGoodAnswerSound()
                  this.goToEnd()
                }, this);
              this.setQuestionAnswer( 7, true )
            } else {
              if( this.timedEvent ) {
                this.game.time.events.remove( this.timedEvent )
              }
              this.timedEvent =
                this.game.time.events.add(Phaser.Timer.SECOND * 1.0, function() {
                  this.playWrongAnswerSound()
                }, this);
              this.setQuestionAnswer( 7, false )
            }
          })
      }, this)
    },

    goToEnd : function() {
      this.game.time.events.add(Phaser.Timer.SECOND, function(){
        this.happyEndingAudio.play()
        this.music.volume = 0.0
      }, this);
      this.createEnd()
      // Fade outs
      this.game.add.tween(this.answerBox8Group).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true)
          .onComplete.add(function(){this.answerBox8Group.visible = false}, this)
      this.game.add.tween(this.answer8Button).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
          .onComplete.add(function(){this.answer8Button.visible = false}, this)
      if( 'season' in this.userAnswerSprites ) {
        this.game.add.tween(this.userAnswerSprites['season']).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true, 0)
            .onComplete.add(function(){this.userAnswerSprites['season'].visible = false}, this)
      }
      // Fade ins
      this.game.add.tween(this.endScoreGroup).to( { alpha: 1 } , 1000, Phaser.Easing.Quadratic.Out, true)
      this.game.add.tween(this.game.camera).to( { y: 5000 } , 1000, Phaser.Easing.Quadratic.Out, true)
    },

    createEnd : function() {
      this.endScoreBox = this.game.add.sprite(this.game.world.centerX, 5500, 'endScoreBox')
      this.endScoreBox.anchor.set(0.5, 0.5)
      this.endScoreGroup = this.game.add.group()
      this.endScoreGroup.add( this.endScoreBox )

      var scoreSpriteNames
      if( this.userGender === 'girl' ){
        scoreSpriteNames = { happy: 'girlFaceHappy', sad: 'girlFaceSad' }
      } else if( this.userGender === 'boy' ) {
        scoreSpriteNames = { happy: 'boyFaceHappy', sad: 'boyFaceSad' }
      } else {
        console.log('internal error: createEnd. this.userGender is not defined')
        scoreSpriteNames = { happy: 'girlFaceHappy', sad: 'girlFaceSad' }
      }
      for(var i = 0; i < 8; i++) {
        var step = Math.floor(i/4.0)
        var chosenSprite
        if( this.correctAnswers[i] ) {
          chosenSprite = scoreSpriteNames['happy']
        } else {
          chosenSprite = scoreSpriteNames['sad']
        }
        this.scoreSprites[i] = this.game.add.sprite( this.game.world.centerX + ((i%4 * 300) - 450), 5380 + 240 * step, chosenSprite )
        this.scoreSprites[i].anchor.set(0.5, 0.5)
        this.endScoreGroup.add( this.scoreSprites[i] )
      }

      this.restartButton = this.game.add.sprite(this.game.world.centerX, 6050, 'restartSprite')
      this.restartButton.anchor.set(0.5, 0.5)
      this.restartButton.inputEnabled = true;
      this.restartButton.input.useHandCursor = true
      this.endScoreGroup.add( this.restartButton )
      this.endScoreGroup.alpha = 0
      this.restartButton.events.onInputDown.add(
        function() {
          this.timedEvent = null
          this.userAnswerDay = null
          this.userAnswerMonth = null
          this.userAnswerYear = null
          this.userAnswerDayOfWeek = null
          this.userAnswers = []
          this.userAnswerSprites = []
          this.correctAnswers = []
          this.scoreSprites = []
          this.userGender = null
          if ( this.userAnswerDaySprite ) {
            this.userAnswerDaySprite.destroy()
          }
          if ( this.userAnswerMonthSprite ) {
            this.userAnswerMonthSprite.destroy()
          }
          if ( this.userAnswerYearSprite ) {
            this.userAnswerYearSprite.destroy()
          }
          this.music.volume = 1.0

          // Go back to the beginning
          this.game.add.tween(this.endScoreGroup).to( { alpha: 0 } , 1000, Phaser.Easing.Quadratic.Out, true)
              .onComplete.add(function(){this.endScoreGroup.visible = false}, this)
          this.game.add.tween(this.camera).to( { y: 0 } , 2000, Phaser.Easing.Quadratic.Out, true)
        }
        , this)
    },

    update: function () {
      /*
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
      */
    }

  };

  window['daymap'] = window['daymap'] || {}
  window['daymap'].Game = Game

}());
