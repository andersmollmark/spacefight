class AbstractHero {

  animations = [
    {direction: 'upLeft', index: 2},
    {direction: 'downLeft', index: 8},
    {direction: 'upRight', index: 1},
    {direction: 'downRight', index: 2},
    {direction: 'up', index: 0},
    {direction: 'down', index: 6},
    {direction: 'left', index: 5},
    {direction: 'right', index: 4},
  ];

  animationsUp = [
    {direction: 'upLeft', index: [4, 5, 6, 7]},
    {direction: 'downLeft', index: [4, 5, 6, 7]},
    {direction: 'upRight', index: [8, 9, 10, 11]},
    {direction: 'downRight', index: [8, 9, 10, 11]},
    {direction: 'up', index: [12, 13, 14, 15]},
    {direction: 'down', index: [0, 1, 2, 3]},
    {direction: 'left', index: [4, 5, 6, 7]},
    {direction: 'right', index: [8, 9, 10, 11]},
  ];

  defaultAnimation = 5;
  defaultAnimationUp = 14;

  constructor(isDirectionUp, game, playerString) {
    this.nextFire = 0;
    this.isDirectionUp = isDirectionUp;
    this.game = game;
    this.immortal = false;
    this.player = game.add.sprite(100, game.world.height - 150, playerString);

    //  We need to enable physics on the player
    game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    // SHOTS.init(game, isDirectionUp);
    // this.playerShots = SHOTS.getPlayerShots();

    if (isDirectionUp) {
      this.animationsUp.forEach(a => this.player.animations.add(a.direction, a.index, 10, true));

    } else {
      this.animations.forEach(a => this.player.animations.add(a.direction, [a.index], 10, true));
    }

  }

  getImageIndex() {

  }

  move(cursors) {
    //  Reset the players velocity (movement)
    this.player.body.velocity.y = 0;
    this.player.body.velocity.x = 0;

    if (cursors.left.isDown && cursors.up.isDown) {
      //  Move up and left
      this.player.body.velocity.y = -150;
      this.player.body.velocity.x = -150;

      this.player.animations.play('upLeft');
    } else if (cursors.left.isDown && cursors.down.isDown) {
      //  Move down and left
      this.player.body.velocity.y = 150;
      this.player.body.velocity.x = -150;

      this.player.animations.play('downLeft');
    } else if (cursors.right.isDown && cursors.down.isDown) {
      //  Move down and right
      this.player.body.velocity.y = 150;
      this.player.body.velocity.x = 150;

      this.player.animations.play('downRight');
    } else if (cursors.right.isDown && cursors.up.isDown) {
      //  Move up and right
      this.player.body.velocity.y = -150;
      this.player.body.velocity.x = 150;
      this.player.animations.play('upRight');
    } else if (cursors.right.isDown) {
      //  Move right
      this.player.body.velocity.x = 150;

      this.player.animations.play('right');
    } else if (cursors.left.isDown) {
      //  Move left
      this.player.body.velocity.x = -150;

      this.player.animations.play('left');
    } else if (cursors.up.isDown) {
      //  Move up
      this.player.body.velocity.y = -150;

      this.player.animations.play('up');
    } else if (cursors.down.isDown) {
      //  Move down
      this.player.body.velocity.y = 150;

      this.player.animations.play('down');
    } else {
      //  Stand still
      this.player.animations.stop();

      if (this.isDirectionUp) {
        this.player.frame = this.defaultAnimationUp;
      } else {
        this.player.frame = this.defaultAnimation;
      }
    }
  }

  doFire(theShot) {
    if (this.game.time.now > this.nextFire && this.player.visible) {
      var activeShots = theShot;
      var fireRate = 0;
      var that = this;
      var shotGroup = activeShots.getShotgroup();
      shotGroup.forEach(shot => {
        if (shot.countDead() > 0) {
          fireRate = shot.fireRate;
          var theShot = shot.getFirstDead();
          theShot.reset(that.player.x + shot.xPos, that.player.y + shot.yPos);

          var x = this.player.body.velocity.x;
          var y = this.player.body.velocity.y;

          var shotInfo = this.getShotInfo(x, y, shot.shotSpeed);
          theShot.body.velocity.y = shotInfo.ySpeed;
          theShot.body.velocity.x = shotInfo.xSpeed;
          theShot.angle = shotInfo.angle;
          activeShots.playSound();
        }

      });
      this.nextFire = this.game.time.now + fireRate;
    }
  }

  getShotInfo(xDirectionSpeed, yDirectionSpeed, originalShotSpeed) {
    var shotInfo = {
      xSpeed: 0,
      ySpeed: 0,
      angle: 0
    };
    var denominator = 1.2;
    if (xDirectionSpeed === 0) {
      if (yDirectionSpeed <= 0) { // up
        shotInfo.ySpeed = -originalShotSpeed;
      } else if (yDirectionSpeed > 0) { // down
        shotInfo.ySpeed = originalShotSpeed;
        shotInfo.angle = 180;
      }
    } else if (xDirectionSpeed > 0) { // right
      if (yDirectionSpeed === 0) {
        shotInfo.xSpeed = originalShotSpeed;
        shotInfo.angle = 90;
      } else if (yDirectionSpeed < 0) { // upright
        shotInfo.xSpeed = originalShotSpeed / denominator;
        shotInfo.ySpeed = -originalShotSpeed / denominator;
        shotInfo.angle = 45;
      } else if (yDirectionSpeed > 0) { // downright
        shotInfo.xSpeed = originalShotSpeed / denominator;
        shotInfo.ySpeed = originalShotSpeed / denominator;
        shotInfo.angle = 135;
      }
    } else {
      if (yDirectionSpeed === 0) { // left
        shotInfo.xSpeed = -originalShotSpeed;
        shotInfo.angle = 270;
      } else if (yDirectionSpeed < 0) { // upleft
        shotInfo.xSpeed = -originalShotSpeed / denominator;
        shotInfo.ySpeed = -originalShotSpeed / denominator;
        shotInfo.angle = 315;
      } else if (yDirectionSpeed > 0) { // downleft
        shotInfo.xSpeed = -originalShotSpeed / denominator;
        shotInfo.ySpeed = originalShotSpeed / denominator;
        shotInfo.angle = 225;
      }
    }
    return shotInfo;
  }

  setTemporaryImmortal(explodingTime) {
    this.immortal = true;
    this.player.visible = false;
    var self = this;
    this.explodingTimeout = window.setTimeout(function () {
      self.createNewPlayer();
    }, explodingTime);
  }

  createNewPlayer() {
    this.resetPlayer();
    var self = this;
    this.immortalTimeout = window.setTimeout(function () {
      window.clearTimeout(self.blinkTimeout);
      self.blinkTimeout = undefined;
      self.player.visible = true;
      self.immortal = false;
      self.immortalTimeout = undefined;
    }, 2000);

    // this.playerShots = SHOTS.downgradeShots(); TODO fix in childclass
    this.blinkPlayer();

  }

  resetPlayer() {
    this.player.x = 50;
    this.player.y = 250;
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
  }

  blinkPlayer() {
    var self = this;
    this.blinkTimeout = window.setTimeout(function () {
      self.player.visible = !self.player.visible;
      self.blinkPlayer();
    }, 100);
  }

  setVisible(visible) {
    this.player.visible = visible;
  }

  doKill() {
    this.player.kill();
  }

  getX() {
    return this.player.x;
  }

  getY() {
    return this.player.y;
  }

  isVisible() {
    return this.player.visible;
  }

  isTemporaryImmortal() {
    return !this.player.visible || this.immortal;
  }
}
