class Spaceship extends Abstractplayer {
  constructor(game) {
    super(false, game, 'ship');
    this.playerShots = new Laser(game);
  }

  upgradeShot(upgrade) {
    this.playerShots.upgradeShot(upgrade);
  }

  downgradeShot() {
    this.playerShots.downgradeShots();
  }

  fire() {
    this.doFire(this.playerShots);
  }
}
