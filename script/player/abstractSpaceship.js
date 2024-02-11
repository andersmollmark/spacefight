  class AbstractSpaceship {

  animations = [
    { direction: 'upLeft', index: 2 },
    { direction: 'downLeft', index: 8 },
    { direction: 'upRight', index: 1 },
    { direction: 'downRight', index: 2 },
    { direction: 'up', index: 0 },
    { direction: 'down', index: 6 },
    { direction: 'left', index: 5 },
    { direction: 'right', index: 4 },
  ];

    animationsUp = [
      { direction: 'upLeft', index: 6 },
      { direction: 'downLeft', index: 0 },
      { direction: 'upRight', index: 8 },
      { direction: 'downRight', index: 2 },
      { direction: 'up', index: 4 },
      { direction: 'down', index: 1 },
      { direction: 'left', index: 3 },
      { direction: 'right', index: 5 },
    ];

    defaultAnimation = 5;
    defaultAnimationUp = 7;

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
      this.animationsUp.forEach(a => this.player.animations.add(a.direction, [a.index], 10, true));

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
      }
      else if (cursors.left.isDown && cursors.down.isDown) {
        //  Move down and left
        this.player.body.velocity.y = 150;
        this.player.body.velocity.x = -150;

        this.player.animations.play('downLeft');
      }
      else if (cursors.right.isDown && cursors.down.isDown) {
        //  Move down and right
        this.player.body.velocity.y = 150;
        this.player.body.velocity.x = 150;

        this.player.animations.play('downRight');
      }
      else if (cursors.right.isDown && cursors.up.isDown) {
        //  Move up and right
        this.player.body.velocity.y = -150;
        this.player.body.velocity.x = 150;
        this.player.animations.play('upRight');
      }
      else if (cursors.right.isDown) {
        //  Move right
        this.player.body.velocity.x = 150;

        this.player.animations.play('right');
      }
      else if (cursors.left.isDown) {
        //  Move left
        this.player.body.velocity.x = -150;

        this.player.animations.play('left');
      }
      else if (cursors.up.isDown) {
        //  Move up
        this.player.body.velocity.y = -150;

        this.player.animations.play('up');
      }
      else if (cursors.down.isDown) {
        //  Move down
        this.player.body.velocity.y = 150;

        this.player.animations.play('down');
      }
      else {
        //  Stand still
        this.player.animations.stop();

        if(this.isDirectionUp) {
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
          if(shot.countDead() > 0){
            fireRate = shot.fireRate;
            var theShot = shot.getFirstDead();
            theShot.reset(that.player.x + shot.xPos, that.player.y + shot.yPos);
            if(that.isDirectionUp) {
              theShot.body.velocity.y = shot.shotSpeed;
            } else {
              theShot.body.velocity.x = shot.shotSpeed;
            }
            activeShots.playSound();
          }

        });
        // if(shotGroup.countDead() > 0){
        //   fireRate = shotGroup.fireRate;
        //   var shot = shotGroup.getFirstDead();
        //   shot.reset(this.player.x + shotGroup.xPos, this.player.y + shotGroup.yPos);
        //   if(this.isDirectionUp) {
        //     shot.body.velocity.y = shotGroup.shotSpeed;
        //   } else {
        //     shot.body.velocity.x = shotGroup.shotSpeed;
        //   }
        //   activeShots.playSound();
        // }

      this.nextFire = this.game.time.now + fireRate;
    }
  }
  setTemporaryImmortal(explodingTime){
    this.immortal = true;
    this.player.visible = false;
    var self = this;
    this.explodingTimeout = window.setTimeout(function () {
      self.createNewPlayer();
    }, explodingTime);
  }

  createNewPlayer(){
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

  resetPlayer(){
    this.player.x = 50;
    this.player.y = 250;
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
  }

  blinkPlayer(){
    var self = this;
    this.blinkTimeout = window.setTimeout(function () {
      self.player.visible = !self.player.visible;
      self.blinkPlayer();
    }, 100);
  }

  setVisible(visible){
    this.player.visible = visible;
  }

  doKill(){
    this.player.kill();
  }

  getX() {
    return this.player.x;
  }

  getY() {
    return this.player.y;
  }

  isVisible(){
    return this.player.visible;
  }

  isTemporaryImmortal() {
    return !this.player.visible || this.immortal;
  }
}
