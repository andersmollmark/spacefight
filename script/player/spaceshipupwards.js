class Spaceshipupwards extends Abstractplayer {
  constructor(game) {
    super(true, game, 'shipUpwards');
    this.playerShots = new Laserupwards(game);
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
