// State: Flappy.boot

'use strict';


var Flappy = {
  score: 0
};

Flappy.Boot = function () {};

Flappy.Boot.prototype = {

  init: function () {
    console.log("%c~~~ Booting the Flap ~~~\n Compliments of SkilStak", "color:#fdf6e3; background:#073642");
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },

  preload: function () {
    this.game.load.json('config','assets/config.json');
    this.game.load.spritesheet('skilstak','assets/skilstak.png', 46,64);
  },

  create: function () {
    this.game.stage.backgroundColor = "#073642";
    this.game.state.start('preload');
  }

};
