(function() {
  'use strict';

  function Preloader() {
    this.preloaderSprite = null
    this.isLoaded = false
    this.isStartClicked = false
  }

  Preloader.prototype = {

    preload: function () {
      if( this.game.device.desktop ) {
        this.isStartClicked = false
      } else {
        // Force a background tilesprite only if we are on mobile
        this.backgroundTile = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'webBackground')
        this.backgroundTile.scale.set(2.0, 2.0)
      }

      // Work around for some Phaser/CocoonJS isues
      this.game.add.sprite(0,0,'')

      // Loader
      this.preloaderSprite = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloader')
      this.preloaderSprite.anchor.setTo(0.5, 0.5)
      this.birdSprite = this.add.sprite(this.game.world.centerX - 125, this.game.world.centerY, 'littleBird')
      this.birdSprite.anchor.setTo(0.5, 0.5)
      this.birdSprite.scale.set(0.3, 0.3)
      this.birdSprite2 = this.add.sprite(this.game.world.centerX + 125, this.game.world.centerY, 'littleBird')
      this.birdSprite2.anchor.setTo(0.5, 0.5)
      this.birdSprite2.scale.set(-0.3, 0.3)
      this.loadingSprite = this.add.sprite(this.game.world.centerX + 20, this.game.world.centerY - 80, 'loading')
      this.loadingSprite.anchor.set(0.5, 0.5)
      this.loadingGroup = this.game.add.group()
      this.loadingGroup.add( this.preloaderSprite )
      this.loadingGroup.add( this.birdSprite )
      this.loadingGroup.add( this.birdSprite2 )
      this.loadingGroup.add( this.loadingSprite )

      if( this.game.device.desktop ) {
        // Start dialog
        this.appStoresBackground = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 100, 'appStoreBackground')
        this.appStoresBackground.anchor.set(0.5, 0.5)
        this.appStoreSprite = this.game.add.sprite(this.game.world.centerX - 350, this.game.world.centerY - 100, 'appStore')
        this.appStoreSprite.anchor.set(0.5, 0.5)
        this.appStoreSprite.inputEnabled = true
        this.appStoreSprite.input.useHandCursor = true
        this.appStoreSprite.events.onInputDown.add( function() {
          window.open('https://itunes.apple.com/es/app/childrens-day-map/id884492102?mt=8')
        }, this)
        this.appStoreSprite.events.onInputOver.add( function() {
          this.game.add.tween(this.appStoreSprite.scale).to( { x: 1.15, y: 1.15} , 400, Phaser.Easing.Quadratic.Out, true)
          this.game.add.tween(this.appStoreSprite).to( { alpha: 0.5} , 400, Phaser.Easing.Quadratic.Out, true)
        }, this)
        this.appStoreSprite.events.onInputOut.add( function() {
          this.game.add.tween(this.appStoreSprite.scale).to( { x: 1, y: 1} , 400, Phaser.Easing.Quadratic.Out, true)
          this.game.add.tween(this.appStoreSprite).to( { alpha: 0.8} , 400, Phaser.Easing.Quadratic.Out, true)
        }, this)
        this.appStoreSprite.alpha = 0.8
        this.googlePlaySprite = this.game.add.sprite(this.game.world.centerX + 350, this.game.world.centerY - 100, 'googlePlay')
        this.googlePlaySprite.anchor.set(0.5, 0.5)
        this.googlePlaySprite.inputEnabled = true
        this.googlePlaySprite.input.useHandCursor = true
        this.googlePlaySprite.events.onInputDown.add( function() {
          window.open('https://play.google.com/store/apps/details?id=com.fourthbit.daymap')
        }, this)
        this.googlePlaySprite.events.onInputOver.add( function() {
          this.game.add.tween(this.googlePlaySprite.scale).to( { x: 1.15, y: 1.15} , 400, Phaser.Easing.Quadratic.Out, true)
          this.game.add.tween(this.googlePlaySprite).to( { alpha: 0.5} , 400, Phaser.Easing.Quadratic.Out, true)
        }, this)
        this.googlePlaySprite.events.onInputOut.add( function() {
          this.game.add.tween(this.googlePlaySprite.scale).to( { x: 1, y: 1} , 400, Phaser.Easing.Quadratic.Out, true)
          this.game.add.tween(this.googlePlaySprite).to( { alpha: 0.7} , 400, Phaser.Easing.Quadratic.Out, true)
        }, this)
        this.googlePlaySprite.alpha = 0.7
        this.startTryOut = this.game.add.button(
          this.game.world.centerX, this.game.world.centerY + 350, 'startTryOut'
          , function() {
            if( this.isLoaded ) {
              this.loadingGroup.visible = false
            }
            this.game.add.tween(this.startDialogGroup).to( { y: '-80' } , 400, Phaser.Easing.Quadratic.Out, true)
            this.game.add.tween(this.startDialogGroup).to( { alpha: 0 } , 400, Phaser.Easing.Quadratic.Out, true)
                .onComplete.add(function(){
                  this.startDialogGroup.visible = false
                  if( this.isLoaded ) {
                    this.game.state.start('game')
                  }
                }, this)
            this.isStartClicked = true
          }
          , this, 0, 1, 2)
        this.startTryOut.anchor.set(0.5, 0.5)
        this.startTryOut.input.useHandCursor = true

        this.startDialogGroup = this.game.add.group()
        this.startDialogGroup.add( this.appStoresBackground )
        this.startDialogGroup.add( this.appStoreSprite )
        this.startDialogGroup.add( this.googlePlaySprite )
        this.startDialogGroup.add( this.startTryOut )
      } else {
        this.isStartClicked = true
      }

      // Header
      this.load.image('background', 'assets/background_80percent.png')
      this.load.image('headerClouds', 'assets/header_clouds.png')
      this.load.image('headerText', 'assets/header_text.png')
      this.load.audio('letsBeginSound', ['assets/audio/other/letsbegin.mp3', 'assets/audio/other/letsbegin.ogg']);

      // Little friends
      this.load.audio('birdSound', ['assets/audio/other/bird.mp3', 'assets/audio/other/bird.ogg']);
      this.load.spritesheet('plane1', 'assets/plane1.png', 420, 125)
      this.load.image('plane2', 'assets/plane2.png')
      this.load.audio('planeSound', ['assets/audio/other/plane.mp3', 'assets/audio/other/plane.ogg']);
      this.load.spritesheet('gopher', 'assets/gopher.png', 160, 187)
      this.load.audio('gopherSound', ['assets/audio/other/gopher.mp3', 'assets/audio/other/gopher.ogg']);

      // Common Audio
      this.load.audio('backgroundMusic', ['assets/audio/other/jazzyfrenchy.mp3', 'assets/audio/other/jazzyfrenchy.ogg']);

      this.load.audio('noNoManSound', ['assets/audio/responses/nono_man.mp3', 'assets/audio/responses/nono_man.ogg']);
      this.load.audio('thinkAboutItManSound', ['assets/audio/responses/thinkaboutit_man.mp3', 'assets/audio/responses/thinkaboutit_man.ogg']);
      this.load.audio('greatManSound', ['assets/audio/responses/great_man.mp3', 'assets/audio/responses/great_man.ogg']);
      this.load.audio('goodJobManSound', ['assets/audio/responses/goodjob_man.mp3', 'assets/audio/responses/goodjob_man.ogg']);

      this.load.audio('noNoSound', ['assets/audio/responses/nono.mp3', 'assets/audio/responses/nono.ogg']);
      this.load.audio('thinkAgainSound', ['assets/audio/responses/think_again.mp3', 'assets/audio/responses/think_again.ogg']);
      this.load.audio('greatSound', ['assets/audio/responses/great.mp3', 'assets/audio/responses/great.ogg']);
      this.load.audio('goodJobSound', ['assets/audio/responses/goodjob.mp3', 'assets/audio/responses/goodjob.ogg']);
      this.load.audio('wonderfulSound', ['assets/audio/responses/wonderful.mp3', 'assets/audio/responses/wonderful.ogg']);
      this.load.audio('wellDoneSound', ['assets/audio/responses/welldone.mp3', 'assets/audio/responses/welldone.ogg']);

      // Question 1
      this.load.image('question1', 'assets/text1.png')
      this.load.audio('question1Audio', ['assets/audio/questions/whatdateisittoday.mp3', 'assets/audio/questions/whatdateisittoday.ogg']);

      this.load.spritesheet('daySpritesheet', 'assets/text1_1.png', 450, 152)
      this.load.audio('dayAudio', ['assets/audio/other/day.mp3', 'assets/audio/other/day.ogg']);
      this.load.spritesheet('monthSpritesheet', 'assets/text1_2.png', 700, 152)
      this.load.audio('monthAudio', ['assets/audio/other/month.mp3', 'assets/audio/other/month.ogg']);
      this.load.spritesheet('yearSpritesheet', 'assets/text1_3.png', 700, 145)
      this.load.audio('yearAudio', ['assets/audio/other/year.mp3', 'assets/audio/other/year.ogg']);

      this.load.image('answer_box1_1', 'assets/answer_box1_1.png')
      this.load.image('number1', 'assets/1.png')
      this.load.image('number2', 'assets/2.png')
      this.load.image('number3', 'assets/3.png')
      this.load.image('number4', 'assets/4.png')
      this.load.image('number5', 'assets/5.png')
      this.load.image('number6', 'assets/6.png')
      this.load.image('number7', 'assets/7.png')
      this.load.image('number8', 'assets/8.png')
      this.load.image('number9', 'assets/9.png')
      this.load.image('number10', 'assets/10.png')
      this.load.image('number11', 'assets/11.png')
      this.load.image('number12', 'assets/12.png')
      this.load.image('number13', 'assets/13.png')
      this.load.image('number14', 'assets/14.png')
      this.load.image('number15', 'assets/15.png')
      this.load.image('number16', 'assets/16.png')
      this.load.image('number17', 'assets/17.png')
      this.load.image('number18', 'assets/18.png')
      this.load.image('number19', 'assets/19.png')
      this.load.image('number20', 'assets/20.png')
      this.load.image('number21', 'assets/21.png')
      this.load.image('number22', 'assets/22.png')
      this.load.image('number23', 'assets/23.png')
      this.load.image('number24', 'assets/24.png')
      this.load.image('number25', 'assets/25.png')
      this.load.image('number26', 'assets/26.png')
      this.load.image('number27', 'assets/27.png')
      this.load.image('number28', 'assets/28.png')
      this.load.image('number29', 'assets/29.png')
      this.load.image('number30', 'assets/30.png')
      this.load.image('number31', 'assets/31.png')
      this.load.audio('number1Audio', ['assets/audio/numbers/1.mp3', 'assets/audio/numbers/1.ogg']);
      this.load.audio('number2Audio', ['assets/audio/numbers/2.mp3', 'assets/audio/numbers/2.ogg']);
      this.load.audio('number3Audio', ['assets/audio/numbers/3.mp3', 'assets/audio/numbers/3.ogg']);
      this.load.audio('number4Audio', ['assets/audio/numbers/4.mp3', 'assets/audio/numbers/4.ogg']);
      this.load.audio('number5Audio', ['assets/audio/numbers/5.mp3', 'assets/audio/numbers/5.ogg']);
      this.load.audio('number6Audio', ['assets/audio/numbers/6.mp3', 'assets/audio/numbers/6.ogg']);
      this.load.audio('number7Audio', ['assets/audio/numbers/7.mp3', 'assets/audio/numbers/7.ogg']);
      this.load.audio('number8Audio', ['assets/audio/numbers/8.mp3', 'assets/audio/numbers/8.ogg']);
      this.load.audio('number9Audio', ['assets/audio/numbers/9.mp3', 'assets/audio/numbers/9.ogg']);
      this.load.audio('number10Audio', ['assets/audio/numbers/10.mp3', 'assets/audio/numbers/10.ogg']);
      this.load.audio('number11Audio', ['assets/audio/numbers/11.mp3', 'assets/audio/numbers/11.ogg']);
      this.load.audio('number12Audio', ['assets/audio/numbers/12.mp3', 'assets/audio/numbers/12.ogg']);
      this.load.audio('number13Audio', ['assets/audio/numbers/13.mp3', 'assets/audio/numbers/13.ogg']);
      this.load.audio('number14Audio', ['assets/audio/numbers/14.mp3', 'assets/audio/numbers/14.ogg']);
      this.load.audio('number15Audio', ['assets/audio/numbers/15.mp3', 'assets/audio/numbers/15.ogg']);
      this.load.audio('number16Audio', ['assets/audio/numbers/16.mp3', 'assets/audio/numbers/16.ogg']);
      this.load.audio('number17Audio', ['assets/audio/numbers/17.mp3', 'assets/audio/numbers/17.ogg']);
      this.load.audio('number18Audio', ['assets/audio/numbers/18.mp3', 'assets/audio/numbers/18.ogg']);
      this.load.audio('number19Audio', ['assets/audio/numbers/19.mp3', 'assets/audio/numbers/19.ogg']);
      this.load.audio('number20Audio', ['assets/audio/numbers/20.mp3', 'assets/audio/numbers/20.ogg']);
      this.load.audio('number21Audio', ['assets/audio/numbers/21.mp3', 'assets/audio/numbers/21.ogg']);
      this.load.audio('number22Audio', ['assets/audio/numbers/22.mp3', 'assets/audio/numbers/22.ogg']);
      this.load.audio('number23Audio', ['assets/audio/numbers/23.mp3', 'assets/audio/numbers/23.ogg']);
      this.load.audio('number24Audio', ['assets/audio/numbers/24.mp3', 'assets/audio/numbers/24.ogg']);
      this.load.audio('number25Audio', ['assets/audio/numbers/25.mp3', 'assets/audio/numbers/25.ogg']);
      this.load.audio('number26Audio', ['assets/audio/numbers/26.mp3', 'assets/audio/numbers/26.ogg']);
      this.load.audio('number27Audio', ['assets/audio/numbers/27.mp3', 'assets/audio/numbers/27.ogg']);
      this.load.audio('number28Audio', ['assets/audio/numbers/28.mp3', 'assets/audio/numbers/28.ogg']);
      this.load.audio('number29Audio', ['assets/audio/numbers/29.mp3', 'assets/audio/numbers/29.ogg']);
      this.load.audio('number30Audio', ['assets/audio/numbers/30.mp3', 'assets/audio/numbers/30.ogg']);
      this.load.audio('number31Audio', ['assets/audio/numbers/31.mp3', 'assets/audio/numbers/31.ogg']);

      this.load.image('answer_box1_2', 'assets/answer_box1_2.png')
      this.load.image('january', 'assets/january.png')
      this.load.image('february', 'assets/february.png')
      this.load.image('march', 'assets/march.png')
      this.load.image('april', 'assets/april.png')
      this.load.image('may', 'assets/may.png')
      this.load.image('june', 'assets/june.png')
      this.load.image('july', 'assets/july.png')
      this.load.image('august', 'assets/august.png')
      this.load.image('september', 'assets/september.png')
      this.load.image('october', 'assets/october.png')
      this.load.image('november', 'assets/november.png')
      this.load.image('december', 'assets/december.png')

      this.load.audio('januaryAudio', ['assets/audio/months/january.mp3', 'assets/audio/months/january.ogg']);
      this.load.audio('februaryAudio', ['assets/audio/months/february.mp3', 'assets/audio/months/february.ogg']);
      this.load.audio('marchAudio', ['assets/audio/months/march.mp3', 'assets/audio/months/march.ogg']);
      this.load.audio('aprilAudio', ['assets/audio/months/april.mp3', 'assets/audio/months/april.ogg']);
      this.load.audio('mayAudio', ['assets/audio/months/may.mp3', 'assets/audio/months/may.ogg']);
      this.load.audio('juneAudio', ['assets/audio/months/june.mp3', 'assets/audio/months/june.ogg']);
      this.load.audio('julyAudio', ['assets/audio/months/july.mp3', 'assets/audio/months/july.ogg']);
      this.load.audio('augustAudio', ['assets/audio/months/august.mp3', 'assets/audio/months/august.ogg']);
      this.load.audio('septemberAudio', ['assets/audio/months/september.mp3', 'assets/audio/months/september.ogg']);
      this.load.audio('octoberAudio', ['assets/audio/months/october.mp3', 'assets/audio/months/october.ogg']);
      this.load.audio('novemberAudio', ['assets/audio/months/november.mp3', 'assets/audio/months/november.ogg']);
      this.load.audio('decemberAudio', ['assets/audio/months/december.mp3', 'assets/audio/months/december.ogg']);

      this.load.image('answer_box1_3', 'assets/answer_box1_3.png')
      this.load.image('year2014', 'assets/2014.png')
      this.load.image('year2015', 'assets/2015.png')
      this.load.image('year2016', 'assets/2016.png')
      this.load.image('year2017', 'assets/2017.png')
      this.load.image('year2018', 'assets/2018.png')
      this.load.image('year2019', 'assets/2019.png')
      this.load.image('year2020', 'assets/2020.png')
      this.load.image('year2021', 'assets/2021.png')
      this.load.image('year2022', 'assets/2022.png')
      this.load.image('year2023', 'assets/2023.png')
      this.load.audio('year2014Audio', ['assets/audio/years/2014.mp3', 'assets/audio/years/2014.ogg']);
      this.load.audio('year2015Audio', ['assets/audio/years/2015.mp3', 'assets/audio/years/2015.ogg']);
      this.load.audio('year2016Audio', ['assets/audio/years/2016.mp3', 'assets/audio/years/2016.ogg']);
      this.load.audio('year2017Audio', ['assets/audio/years/2017.mp3', 'assets/audio/years/2017.ogg']);
      this.load.audio('year2018Audio', ['assets/audio/years/2018.mp3', 'assets/audio/years/2018.ogg']);
      this.load.audio('year2019Audio', ['assets/audio/years/2019.mp3', 'assets/audio/years/2019.ogg']);
      this.load.audio('year2020Audio', ['assets/audio/years/2020.mp3', 'assets/audio/years/2020.ogg']);
      this.load.audio('year2021Audio', ['assets/audio/years/2021.mp3', 'assets/audio/years/2021.ogg']);
      this.load.audio('year2022Audio', ['assets/audio/years/2022.mp3', 'assets/audio/years/2022.ogg']);
      this.load.audio('year2023Audio', ['assets/audio/years/2023.mp3', 'assets/audio/years/2023.ogg']);

      // Question 2
      this.load.image('question2', 'assets/text2.png')
      this.load.spritesheet('text2_1', 'assets/text2_1.png', 800, 145)
      this.load.image('answer_box2', 'assets/answer_box_2.png')
      this.load.image('monday', 'assets/monday.png')
      this.load.image('tuesday', 'assets/tuesday.png')
      this.load.image('wednesday', 'assets/wednesday.png')
      this.load.image('thursday', 'assets/thursday.png')
      this.load.image('friday', 'assets/friday.png')
      this.load.image('saturday', 'assets/saturday.png')
      this.load.image('sunday', 'assets/sunday.png')

      this.load.audio('question2Audio', ['assets/audio/questions/whatdayisittoday.mp3', 'assets/audio/questions/whatdayisittoday.ogg']);
      this.load.audio('mondayAudio', ['assets/audio/daysoftheweek/monday.mp3', 'assets/audio/daysoftheweek/monday.ogg']);
      this.load.audio('tuesdayAudio', ['assets/audio/daysoftheweek/tuesday.mp3', 'assets/audio/daysoftheweek/tuesday.ogg']);
      this.load.audio('wednesdayAudio', ['assets/audio/daysoftheweek/wednesday.mp3', 'assets/audio/daysoftheweek/wednesday.ogg']);
      this.load.audio('thursdayAudio', ['assets/audio/daysoftheweek/thursday.mp3', 'assets/audio/daysoftheweek/thursday.ogg']);
      this.load.audio('fridayAudio', ['assets/audio/daysoftheweek/friday.mp3', 'assets/audio/daysoftheweek/friday.ogg']);
      this.load.audio('saturdayAudio', ['assets/audio/daysoftheweek/saturday.mp3', 'assets/audio/daysoftheweek/saturday.ogg']);
      this.load.audio('sundayAudio', ['assets/audio/daysoftheweek/sunday.mp3', 'assets/audio/daysoftheweek/sunday.ogg']);

      // Question 3
      this.load.image('question3', 'assets/text3.png')
      this.load.spritesheet('text3_1', 'assets/text3_1.png', 1000, 145)
      this.load.audio('question3Audio', ['assets/audio/questions/whatdaywasityesterday.mp3', 'assets/audio/questions/whatdaywasityesterday.ogg']);

      // Question 4
      this.load.image('question4', 'assets/text4.png')
      this.load.spritesheet('text4_1', 'assets/text4_1.png', 900, 145)
      this.load.audio('question4Audio', ['assets/audio/questions/whatdayisittomorrow.mp3', 'assets/audio/questions/whatdayisittomorrow.ogg']);

      // Question 5
      this.load.image('question5', 'assets/text5.png')
      this.load.spritesheet('text5_1', 'assets/text5_1.png', 600, 468)
      this.load.image('answer_box_5', 'assets/answer_box_5.png')
      this.load.image('sunny', 'assets/sunny.png')
      this.load.image('partially_cloudy', 'assets/partially_cloudy.png')
      this.load.image('cloudy', 'assets/cloudy.png')
      this.load.image('rainy', 'assets/rainy.png')
      this.load.image('snowy', 'assets/snowy.png')
      this.load.image('foggy', 'assets/foggy.png')

      this.load.audio('question5Audio', ['assets/audio/questions/whatistheweatherliketoday.mp3', 'assets/audio/questions/whatistheweatherliketoday.ogg']);
      this.load.audio('sunnyAudio', ['assets/audio/weather/sunny.mp3', 'assets/audio/weather/sunny.ogg']);
      this.load.audio('partially_cloudyAudio', ['assets/audio/weather/partiallycloudy.mp3', 'assets/audio/weather/partiallycloudy.ogg']);
      this.load.audio('cloudyAudio', ['assets/audio/weather/cloudy.mp3', 'assets/audio/weather/cloudy.ogg']);
      this.load.audio('rainyAudio', ['assets/audio/weather/rainy.mp3', 'assets/audio/weather/rainy.ogg']);
      this.load.audio('snowyAudio', ['assets/audio/weather/snowy.mp3', 'assets/audio/weather/snowy.ogg']);
      this.load.audio('foggyAudio', ['assets/audio/weather/foggy.mp3', 'assets/audio/weather/foggy.ogg']);

      // Question 6
      this.load.image('question6', 'assets/text6.png')
      this.load.spritesheet('boyAnswer', 'assets/boy_answer.png', 200, 415)
      this.load.spritesheet('girlAnswer', 'assets/girl_answer.png', 200, 407)
      this.load.image('answer_box_6', 'assets/answer_box_6.png')
      this.load.image('boy', 'assets/boy.png')
      this.load.image('girl', 'assets/girl.png')
      this.load.spritesheet('tick', 'assets/tick_button.png', 220, 185)
      // Boy's clothes
      this.load.image('boots_boy', 'assets/boots_boy.png')
      this.load.image('rainboots_boy', 'assets/rainboots_boy.png')
      this.load.image('shoes_boy', 'assets/shoes_boy.png')
      this.load.spritesheet('sandals_boy', 'assets/sandals_boy.png', 190, 38)
      this.load.image('socks_boy', 'assets/socks_boy.png')
      this.load.image('shorts_boy', 'assets/shorts_boy.png')
      this.load.image('trousers_boy', 'assets/trousers_boy.png')
      this.load.image('tshirt_boy', 'assets/tshirt_boy.png')
      this.load.spritesheet('jumper_boy', 'assets/jumper_boy.png', 225, 183)
      this.load.spritesheet('shirt_boy', 'assets/shirt_boy.png', 230, 177)
      this.load.image('scarf_boy', 'assets/scarf_boy.png')
      this.load.spritesheet('coat_boy', 'assets/coat_boy.png', 265, 247)
      this.load.image('gloves_boy', 'assets/gloves_boy.png')
      this.load.spritesheet('woolcap_boy', 'assets/woolcap_boy.png', 175, 217)
      this.load.image('cap_boy', 'assets/cap_boy.png')
      // Girl's clothes
      this.load.image('boots_girl', 'assets/boots_girl.png')
      this.load.image('rainboots_girl', 'assets/rainboots_girl.png')
      this.load.spritesheet('shoes_girl', 'assets/shoes_girl.png', 135, 39)
      this.load.spritesheet('sandals_girl', 'assets/sandals_girl.png', 135, 36)
      this.load.image('socks_girl', 'assets/socks_girl.png')
      this.load.image('shorts_girl', 'assets/shorts_girl.png')
      this.load.image('trousers_girl', 'assets/trousers_girl.png')
      this.load.image('tshirt_girl', 'assets/tshirt_girl.png')
      this.load.spritesheet('jumper_girl', 'assets/jumper_girl.png', 175, 187)
      this.load.spritesheet('shirt_girl', 'assets/shirt_girl.png', 200, 177)
      this.load.image('scarf_girl', 'assets/scarf_girl.png')
      this.load.spritesheet('coat_girl', 'assets/coat_girl.png', 245, 239)
      this.load.image('gloves_girl', 'assets/gloves_girl.png')
      this.load.spritesheet('woolcap_girl', 'assets/woolcap_girl.png', 210, 214)
      this.load.spritesheet('dress_girl', 'assets/dress_girl.png', 205, 370)
      this.load.image('skirt_girl', 'assets/skirt_girl.png')

      this.load.audio('question6Audio', ['assets/audio/questions/whatshouldweweartoday.mp3', 'assets/audio/questions/whatshouldweweartoday.ogg']);
      this.load.audio('boyAudio', ['assets/audio/other/boy.mp3', 'assets/audio/other/boy.ogg']);
      this.load.audio('girlAudio', ['assets/audio/other/girl.mp3', 'assets/audio/other/girl.ogg']);

      this.load.audio('bootsAudio', ['assets/audio/clothes/boots.mp3', 'assets/audio/clothes/boots.ogg'])
      this.load.audio('rainbootsAudio',  ['assets/audio/clothes/rainboots.mp3', 'assets/audio/clothes/rainboots.ogg'])
      this.load.audio('shoesAudio',  ['assets/audio/clothes/shoes.mp3', 'assets/audio/clothes/shoes.ogg'])
      this.load.audio('sandalsAudio',  ['assets/audio/clothes/sandals.mp3', 'assets/audio/clothes/sandals.ogg'])
      this.load.audio('socksAudio',  ['assets/audio/clothes/socks.mp3', 'assets/audio/clothes/socks.ogg'])
      this.load.audio('shortsAudio',  ['assets/audio/clothes/shorts.mp3', 'assets/audio/clothes/shorts.ogg'])
      this.load.audio('trousersAudio',  ['assets/audio/clothes/trousers.mp3', 'assets/audio/clothes/trousers.ogg'])
      this.load.audio('tshirtAudio',  ['assets/audio/clothes/tshirt.mp3', 'assets/audio/clothes/tshirt.ogg'])
      this.load.audio('jumperAudio',  ['assets/audio/clothes/jumper.mp3', 'assets/audio/clothes/jumper.ogg'])
      this.load.audio('shirtAudio',  ['assets/audio/clothes/shirt.mp3', 'assets/audio/clothes/shirt.ogg'])
      this.load.audio('scarfAudio',  ['assets/audio/clothes/scarf.mp3', 'assets/audio/clothes/scarf.ogg'])
      this.load.audio('coatAudio',  ['assets/audio/clothes/coat.mp3', 'assets/audio/clothes/coat.ogg'])
      this.load.audio('glovesAudio',  ['assets/audio/clothes/gloves.mp3', 'assets/audio/clothes/gloves.ogg'])
      this.load.audio('woolcapAudio', ['assets/audio/clothes/woolcap.mp3', 'assets/audio/clothes/woolcap.ogg'])
      this.load.audio('capAudio', ['assets/audio/clothes/cap.mp3', 'assets/audio/clothes/cap.ogg'])
      this.load.audio('dressAudio', ['assets/audio/clothes/dress.mp3', 'assets/audio/clothes/dress.ogg'])
      this.load.audio('skirtAudio', ['assets/audio/clothes/skirt.mp3', 'assets/audio/clothes/skirt.ogg'])

      // Question 7
      this.load.image('question7', 'assets/text7.png')
      this.load.spritesheet('text7_1', 'assets/text7_1.png', 600, 468)
      this.load.image('answer_box_7', 'assets/answer_box_7.png')
      this.load.image('carnival', 'assets/carnival.png')
      this.load.image('holidays', 'assets/holidays.png')
      this.load.image('home', 'assets/home.png')
      this.load.image('school', 'assets/school.png')
      this.load.image('christmas', 'assets/christmas.png')
      
      this.load.audio('question7Audio', ['assets/audio/questions/whatarewegoingtodotoday.mp3', 'assets/audio/questions/whatarewegoingtodotoday.ogg']);
      this.load.audio('carnivalAudio', ['assets/audio/other/carnival.mp3', 'assets/audio/other/carnival.ogg'])
      this.load.audio('holidaysAudio', ['assets/audio/other/holidays.mp3', 'assets/audio/other/holidays.ogg'])
      this.load.audio('homeAudio', ['assets/audio/other/home.mp3', 'assets/audio/other/home.ogg'])
      this.load.audio('schoolAudio', ['assets/audio/other/school.mp3', 'assets/audio/other/school.ogg'])
      this.load.audio('christmasAudio', ['assets/audio/other/christmas.mp3', 'assets/audio/other/christmas.ogg'])

      // Question 8
      this.load.image('question8', 'assets/text8.png')
      this.load.spritesheet('text8_1', 'assets/text8_1.png', 460, 571)
      this.load.image('answer_box_8', 'assets/answer_box_8.png')
      this.load.image('spring', 'assets/spring.png')
      this.load.image('summer', 'assets/summer.png')
      this.load.image('autumn', 'assets/autumn.png')
      this.load.image('winter', 'assets/winter.png')

      this.load.audio('question8Audio', ['assets/audio/questions/whatseasonarewein.mp3', 'assets/audio/questions/whatseasonarewein.ogg']);
      this.load.audio('springAudio', ['assets/audio/seasons/spring.mp3', 'assets/audio/seasons/spring.ogg'])
      this.load.audio('summerAudio', ['assets/audio/seasons/summer.mp3', 'assets/audio/seasons/summer.ogg'])
      this.load.audio('autumnAudio', ['assets/audio/seasons/autumn.mp3', 'assets/audio/seasons/autumn.ogg'])
      this.load.audio('winterAudio', ['assets/audio/seasons/winter.mp3', 'assets/audio/seasons/winter.ogg'])

      // End score
      this.load.image('endScoreBox', 'assets/end_score_box.png')
      this.load.image('girlFaceHappy', 'assets/happy_face_girl.png')
      this.load.image('girlFaceSad', 'assets/sad_face_girl.png')
      this.load.image('boyFaceHappy', 'assets/happy_face_boy.png')
      this.load.image('boyFaceSad', 'assets/sad_face_boy.png')
      this.load.image('restartSprite', 'assets/restart.png')
      this.load.audio('happyEndingSound', ['assets/audio/other/ending_score_music.mp3', 'assets/audio/other/ending_score_music.ogg'])

      this.load.onLoadComplete.addOnce( function(){
        this.isLoaded = true
        if( this.isStartClicked ) {
          this.game.state.start('game')
        }
      }, this )
      this.load.setPreloadSprite(this.preloaderSprite)
    },

    create: function () {
      this.preloaderSprite.cropEnabled = false
    }
  };

  window['daymap'] = window['daymap'] || {}
  window['daymap'].Preloader = Preloader

}());
