// Sprite: Flapper

'use strict';

var Flapper = function(game) {
  this.config = game.cache.getJSON('config');
  Phaser.Sprite.call(this, game, this.config.flappy.x, game.world.centerY, 'flappy',1);
  this.smoothed = false;
  this.checkWorldBounds = true;
  this.outOfBoundsKill = this.config.flappy.outkill;
  this.scale.set(this.config.flappy.scale || 1);
  this.anchor.set(0.5);
  game.physics.arcade.enable(this);
  this.body.gravity.y = this.config.flappy.gravity || 1200;
  game.input.onDown.add(this.flap, this);
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.flap, this);
  this.flapSound = this.game.add.audio('flap');
  if (this.config.flappy.animation) {
    var anim = this.animations.add('main');
    this.animations.play('main',this.config.flappy.animation.rate,true)
  }
  game.add.existing(this);
};


Flapper.prototype = Object.create(Phaser.Sprite.prototype);
Flapper.prototype.constructor = Flapper;

Flapper.prototype.flap = function () {
  this.flapSound.play();
  this.body.velocity.y = this.config.flappy.flap.velocity || -420;
  this.frame = this.config.flappy.flap.frame || 0;
  if (! this.config.flappy.flap.norotate ) {
    var rotate = this.config.flappy.flap.rotate || -40;
    this.game.add.tween(this).to({angle: rotate}, 100).start();
  }
};

Flapper.prototype.update = function () {
  if (! this.config.flappy.flap.norotate ) {
    if (this.angle < 90) {
      this.angle += 2.5;
    }
  }
  if (! this.config.flappy.animation ||
      ! this.config.flappy.animation.rate) {
    if (this.deltaY < 0) {
      this.frame = this.config.flappy.flap.frame || 0;
    } else {
      this.frame = 1;
    }
  }
};
