(function() {
  'use strict';

  function Game() {
  }

  Game.prototype = {

    create: function () {
      var style = { font: "65px Arial", fill: "#ff0044", align: "center" }
      var text = this.game.add.text(this.game.world.centerX, 40, "Day Map", style)

      text.anchor.set(0.5)
    },

    update: function () {
    },

    onInputDown: function () {
    }

  };

  window['daymap'] = window['daymap'] || {}
  window['daymap'].Game = Game

}());
