class HeroUpwards extends AbstractHero {
  constructor(game) {
    super(true, game, 'heroUpwards');
    this.playerShots = new HeroLaser(game);
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
