class AbstractChapter {

  constructor(game, tileSprite, lifeText, activeEnemyIndex) {
    this.game = game;
    this.activeEnemyIndex = activeEnemyIndex;
    this.setChapterSpecifics(tileSprite, lifeText);
    this.startNewEnemyGroup = true;
    this.startNewEnemyGroupTime = this.game.time.now + 3000;
    this.chapterStarted = false;
    this.doUpdateChapter();
  }

  setChapterSpecifics(tileSprite, lifeText){
    this.backgroundImage = this.game.add
        .tileSprite(tileSprite.x,
          tileSprite.y,
          tileSprite.width,
          tileSprite.height,
          tileSprite.textKey);

    this.enemyLifeText = this.game.add
      .text(lifeText.x,
        lifeText.y,
        lifeText.text,
        lifeText.font);
    this.enemyLifeText.anchor.setTo(0.5, 0.5);
    this.enemyLifeText.visible = false;
    this.backgroundXmovement = tileSprite.backgroundXmovement;
    this.backgroundYmovement = tileSprite.backgroundYmovement

  }

  setActiveEnemyIndex(activeEnemyIndex){
    this.activeEnemyIndex = activeEnemyIndex;
  }

  doStartNewEnemyGroup() {
    this.enemyTemplate = ALL_ENEMIES.getEnemy(this.activeEnemyIndex);
    this.enemiesAlive = this.enemyTemplate.numbersAlive;
    this.activeEnemies = this.createEnemy();

    if (this.activeEnemies.life) {
      this.enemyHealth = this.game.add.group();
      for (var i = 0; i < this.activeEnemies.life; i++) {
        var health = this.enemyHealth.create(this.game.world.width - 450 + (5 * i), 520, 'healthIcon');
        health.anchor.setTo(0.5, 0.5);
        health.scale.x = 0.7;
        health.scale.y = 0.7;
      }

    }
  }

  updateChapter() {
      this.backgroundImage.tilePosition.x -= this.backgroundXmovement;
    this.backgroundImage.tilePosition.y -= this.backgroundYmovement;

    if (this.startNewEnemyGroup && this.game.time.now > this.startNewEnemyGroupTime) {
      this.doUpdateChapter();
    }
  }

  doUpdateChapter() {
    this.startNewEnemyGroup = false;
    this.doStartNewEnemyGroup();
    this.chapterStarted = true;
  }

  removeEnemy(enemy) {
    this.enemiesAlive--;
    if (this.enemiesAlive === 0 && this.enemyTemplate.bonus) {
      this.addBonusBlob(enemy);
    }
    else if (this.enemiesAlive === 0 && this.enemyTemplate.bonusLife) {
      this.addExtraLife(enemy);
    }
  }

  addBonusBlob(enemy) {
    BONUS.create(enemy, this.game);
    bonusTimeout = window.setTimeout(function () {
      BONUS.remove();
      bonusTimeout = undefined;

    }, 8000);

  }

  addExtraLife(enemy) {
    EXTRA_LIFE.create(enemy, this.game);
    extraLifeTimeout = window.setTimeout(function () {
      EXTRA_LIFE.remove();
      extraLifeTimeout = undefined;
    }, 8000);

  }

  createEnemy() {
    let activeEnemies = new Enemygroup(this.enemyTemplate, this.game);
    return activeEnemies;
  }

  shotHitsEnemy(shot, enemy) {
    shot.kill();
    return this.doKillEnemy(enemy, PLAYER.playerShots.shotGroup.damage, shot);
  }

  killEnemy(enemy, damage, shotPosition){
    return this.doKillEnemy(enemy, damage, shotPosition);
  }

  doKillEnemy(enemy, damage, shotPosition){
    let killResult = this.activeEnemies.killEnemy(enemy, damage, shotPosition, this.enemyHealth);
    if (killResult.killed) {
      this.removeEnemy(enemy);
    }

    return killResult;
  }
}
