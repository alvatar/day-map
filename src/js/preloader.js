(function() {
  'use strict';

  function Preloader() {
    this.asset = null
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloader')
      this.asset.anchor.setTo(0.5, 0.5)
      
      this.load.image('background', 'assets/background.png')
      this.load.image('headerClouds', 'assets/header_clouds.png')
      this.load.image('headerText', 'assets/header_text.png')
      this.load.image('littleBird', 'assets/little_bird.png')

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
      /*
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
      */

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
      this.load.image('answer_box2', 'assets/answer_box2.png')
      this.load.image('monday', 'assets/monday.png')
      this.load.image('tuesday', 'assets/tuesday.png')
      this.load.image('wednesday', 'assets/wednesday.png')
      this.load.image('thursday', 'assets/thursday.png')
      this.load.image('friday', 'assets/friday.png')
      this.load.image('saturday', 'assets/saturday.png')
      this.load.image('sunday', 'assets/sunday.png')

      this.load.audio('mondayAudio', ['assets/audio/daysoftheweek/monday.mp3', 'assets/audio/daysoftheweek/monday.ogg']);
      this.load.audio('tuesdayAudio', ['assets/audio/daysoftheweek/tuesday.mp3', 'assets/audio/daysoftheweek/tuesday.ogg']);
      this.load.audio('wednesdayAudio', ['assets/audio/daysoftheweek/wednesday.mp3', 'assets/audio/daysoftheweek/wednesday.ogg']);
      this.load.audio('thursdayAudio', ['assets/audio/daysoftheweek/thursday.mp3', 'assets/audio/daysoftheweek/thursday.ogg']);
      this.load.audio('fridayAudio', ['assets/audio/daysoftheweek/friday.mp3', 'assets/audio/daysoftheweek/friday.ogg']);
      this.load.audio('saturdayAudio', ['assets/audio/daysoftheweek/saturday.mp3', 'assets/audio/daysoftheweek/saturday.ogg']);
      this.load.audio('sundayAudio', ['assets/audio/daysoftheweek/sunday.mp3', 'assets/audio/daysoftheweek/sunday.ogg']);

      this.load.image('question3', 'assets/text3.png')
      this.load.spritesheet('text3_1', 'assets/text3_1.png', 1000, 145)

      this.load.image('text4', 'assets/text4.png')
      this.load.spritesheet('text4_1', 'assets/text4_1.png', 900, 145)

      this.load.image('text5', 'assets/text5.png')
      this.load.spritesheet('text5_1', 'assets/text5_1.png', 1200, 385)

      this.load.image('text6', 'assets/text6.png')
      this.load.spritesheet('boyAnswer', 'assets/boy_answer.png', 200, 415)
      this.load.spritesheet('girlAnswer', 'assets/girl_answer.png', 200, 407)

      this.load.image('text7', 'assets/text7.png')
      this.load.spritesheet('text7_1', 'assets/text7_1.png', 700, 541)

      this.load.image('text8', 'assets/text8.png')
      this.load.spritesheet('text8_1', 'assets/text8_1.png', 500, 570)

      this.load.onLoadComplete.addOnce( function(){ this.game.state.start('game') }, this )
      this.load.setPreloadSprite(this.asset)

      // Common Audio
      this.load.audio('greatSound', ['assets/audio/responses/great.mp3', 'assets/audio/responses/great.ogg']);
      this.load.audio('goodJobSound', ['assets/audio/responses/goodjob.mp3', 'assets/audio/responses/goodjob.ogg']);
      this.load.audio('noNoSound', ['assets/audio/responses/nono.mp3', 'assets/audio/responses/nono.ogg']);
      this.load.audio('thinkAboutItSound', ['assets/audio/responses/thinkaboutit.mp3', 'assets/audio/responses/thinkaboutit.ogg']);
    },

    create: function () {
      this.asset.cropEnabled = false
    }
  };

  window['daymap'] = window['daymap'] || {}
  window['daymap'].Preloader = Preloader

}());
