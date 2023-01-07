class Abstractshot {

  constructor(game, shotDesc) {
    this.game = game;
    this.sound = game.add.audio(shotDesc.sound);
    this.shotDesc = shotDesc;
    this.activeShotDescIndex = 0;
    this.createShotgroup();
  }

  createShotgroup() {
    var theShotDesc = this.shotDesc[this.activeShotDescIndex];
    theShotDesc.shotGroup = [];
    console.log('creating shot with name:' + theShotDesc.name);
    for (var i = 0; i < theShotDesc.numberOfShots; i++) {
      theShotDesc.shotGroup[i] = this.game.add.group();
      theShotDesc.shotGroup[i].enableBody = true;
      theShotDesc.shotGroup[i].physicsBodyType = Phaser.Physics.ARCADE;

      theShotDesc.shotGroup[i].createMultiple(50, theShotDesc.name);
      theShotDesc.shotGroup[i].setAll('checkWorldBounds', true);
      theShotDesc.shotGroup[i].setAll('outOfBoundsKill', true);
      theShotDesc.shotGroup[i].shotSpeed = theShotDesc.speed;
      theShotDesc.shotGroup[i].numberOfShots = theShotDesc.numberOfShots;
      theShotDesc.shotGroup[i].fireRate = theShotDesc.fireRate;
      theShotDesc.shotGroup[i].xPos = theShotDesc.xPos[i];
      theShotDesc.shotGroup[i].yPos = theShotDesc.yPos[i];
      theShotDesc.shotGroup[i].damage = theShotDesc.damage;

    }
  }

  getShotgroup() {
    return this.shotDesc[this.activeShotDescIndex].shotGroup;
  }

  getDamage() {
    return this.getShotgroup()[0].damage;
  }

  playSound() {
    // this.sound.play();
  }

  setSound() {
    this.sound = this.game.add.audio(this.shotDesc[this.activeShotDescIndex].sound);
  }

  upgradeShot(upgrade) {
    var newShotLevel = this.activeShotDescIndex + upgrade.upgradeNumber;
    console.log("try to upgrade shots to nr:" + newShotLevel);
    if (newShotLevel < this.shotDesc.length) {
      this.activeShotDescIndex = newShotLevel;
      this.createShotgroup();
      console.log("upgrading shots to nr:" + this.activeShotDescIndex);
      this.setSound();
    }
  }

  downgradeShots() {
    if (this.activeShotDescIndex > 0) {
      this.activeShotDescIndex--;
      this.createShotgroup();
      this.setSound();
    }
  }

}
