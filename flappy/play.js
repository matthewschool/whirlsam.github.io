// State: Flappy.Play

'use strict';

Flappy.Play = function () {};

Flappy.Play.prototype = {

  init: function () {
    this.config = game.cache.getJSON('config');
    this.background = null;
    this.flappy = null;
    this.pipes = null;
    this.timer = null;
    this.score = -1; 
    this.scoreText = null;
  },

  create: function () {
    this.background = this.add.tileSprite(0,0,
                        this.config.width,this.config.height,
                        "background");
    this.background.scale.set(this.config.bg.scale || 1);
    this.background.autoScroll(this.config.bg.scroll,0);
    this.playMusic = this.game.add.audio('play',1,true);
    this.pointSound = this.game.add.audio('point');
    this.crashSound = this.game.add.audio('crash');
    this.playMusic.play();
    this.flappy = new Flapper(this.game);
    this.timer = this.game.time.events.loop(this.config.pipe.interval,
                                            this.addPipe, this);           
    var scoreTextStyle = this.config.score.style;
    this.scoreText = this.game.add.text(this.game.world.centerX,
                                        this.config.score.y, "0", scoreTextStyle);
    this.scoreText.anchor.set(0.5);
    this.pipes = this.game.add.group();
  },

  addPipe: function () {
    var pipe;
    if (this.pipes.length < 3) {
      pipe = new Pipe(this.game);
      this.pipes.add(pipe);
      this.scoreText.bringToTop();
    } else {
      pipe = this.pipes.getFirstExists(false);
      pipe.reset();
    }
    this.score += 1;
    this.scoreText.text = this.score;
    if (this.score > 0) this.pointSound.play();
  },

  update: function () {
    this.pipes.forEach(function (pipe) {
      this.game.physics.arcade.collide(this.flappy, pipe, this.end, null, this);  
    }, this);
    if (!this.flappy.alive) this.end();
  },

  end: function () {
    this.crashSound.play();
    this.playMusic.stop();
    this.game.state.start('end');
  }

};
