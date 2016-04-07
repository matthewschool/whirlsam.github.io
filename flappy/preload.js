// State: Flappy.Preload

'use strict';

Flappy.Preload = function () {};

Flappy.Preload.prototype = {

  preload: function () {
    this.config = game.cache.getJSON('config');

    this.skilstak = this.add.sprite(
        this.game.world.centerX, this.game.world.centerY, 'skilstak');
    this.skilstak.anchor.set(0.5);
    this.skilstak.animations.add('blink');
    this.skilstak.play('blink',2,true);
    
    var style = {
      font: "30px sans-serif",
      fill: "#fdf6e3",
      align: "center"
    }; 
    this.loading = this.game.add.text(this.game.world.centerX,
                                      this.game.world.centerY + 70,
                                      "Loading...", style);
    this.loading.anchor.set(0.5,0.5);

    // customizable from assets and config
    this.load.spritesheet('background','assets/background.png',
                          this.config.bg.width,this.config.bg.height);
    this.load.spritesheet('flappy','assets/flappy.png',
                          this.config.flappy.width,
                          this.config.flappy.height);
    this.load.spritesheet('sign','assets/sign.png',
                          this.config.sign.width,
                          this.config.sign.height);

    this.load.image('button','assets/button.png');
    this.load.image('pipetop','assets/pipetop.png');
    this.load.image('pipebot','assets/pipebot.png');

    this.load.audio('start','assets/start.mp3');
    this.load.audio('flap', 'assets/flap.wav');
    this.load.audio('point', 'assets/point.wav');
    this.load.audio('crash', 'assets/crash.wav');
    this.load.audio('play', 'assets/play.mp3');
    this.load.audio('gameover', 'assets/gameover.wav');
  },

  create: function () {
    // even though we don't play these in this state we need
    // them to ensure they've been decoded
    this.loading.text = "Decoding...";
    var start = this.game.add.audio('start',null,true);
    var flap = this.game.add.audio('flap');
    var play = this.game.add.audio('play',null,true);
    var point = this.game.add.audio('point');
    var crash = this.game.add.audio('crash');
    var gameover = this.game.add.audio('gameover');
    var sounds = [start,flap,play,point,crash,gameover];
    game.sound.setDecodedCallback(sounds, this.start, this);
  },

  start: function () {
    this.game.state.start('start');
  }

};
