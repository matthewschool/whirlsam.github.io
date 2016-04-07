// State: Flappy.Start

'use strict';

Flappy.Start = function () {};

Flappy.drawHighScore = function (state) {
  var highScoreKey = state.config.highscore.key || 'skilstak-flappy-highscore';
  var highScore = localStorage.getItem(highScoreKey) || Flappy.highScore;
  var highScoreText = state.config.highscore.text || 'High Score: ';
    if (highScore) {
    state.high = state.game.add.text(state.game.world.centerX,
                                    state.game.world.centerY + 
                                    state.config.highscore.offset, 
                                    highScoreText + highScore,
                                    state.config.highscore.style ||
                                    state.config.score.style);
    state.high.anchor.set(0.5);
  }
}

Flappy.Start.prototype = {

  init: function () {
    this.config = game.cache.getJSON('config');
    this.background = null;
    this.flappy = null;
    this.button = null;
  },

  create: function () {
    Flappy.highScore = localStorage.getItem(this.config.highscore.key);
    this.startSound = this.game.add.audio('start',1,true);
    this.startSound.play();

    this.background = this.add.tileSprite(0,0,
                        this.config.width,this.config.height,"background");
    this.background.autoScroll(this.config.bg.scroll || -50,0);
    this.background.scale.set(this.config.bg.scale || 1);

    this.button = this.game.add.button(this.game.world.centerX,
                                       this.game.world.centerY +
                                         this.config.button.offset,
                                       "button", this.start, this);
    this.button.anchor.set(0.5,0.5);
    this.button.scale.set(this.config.button.scale || 1);

    this.sign = this.game.add.sprite(this.game.world.centerX,
                                     this.game.world.centerY +
                                     this.config.sign.offset,'sign');
    this.sign.anchor.set(0.5);
    this.sign.scale.set(this.config.sign.scale || 1);

    this.game.add.tween(this.sign).to({y:this.sign.y+50},
                                      this.config.sign.speed,
                                      Phaser.Easing.Linear.NONE,
                                      true,0,2000,true);
    if (this.config.sign.animation) {
      var anim = this.sign.animations.add('main');
      this.sign.animations.play('main',this.config.sign.animation.rate,true)
    }

    Flappy.drawHighScore(this);

  },

  start: function () {
    this.startSound.stop();
    this.game.state.start('play');
  },

  update: function () {
    if (this.config.sign.twoframe) {
      if (this.sign.deltaY < 0) {
        this.sign.frame = 0;
      } else {
        this.sign.frame = 1;
      }
    }
  }

};
