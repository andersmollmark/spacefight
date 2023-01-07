class AbstractChapter {

  scoreString = '';
  scoreText = undefined;
  score = 0;
  livesGroup = undefined;
  stateText = undefined;

  constructor(game, tileSprite, lifeText, enemyTemplateService, activeEnemyIndex) {
    this.game = game;
    this.enemyTemplateService = enemyTemplateService;
    this.activeEnemyIndex = activeEnemyIndex;
    this.setChapterSpecifics(tileSprite, lifeText);
    this.startNewEnemyGroup = true;
    this.startNewEnemyGroupTime = this.game.time.now + 3000;
    this.chapterStarted = false;
    this.stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', {font: '84px Arial', fill: '#fff'});
    this.stateText.anchor.setTo(0.5, 0.5);
    this.stateText.visible = false;

    this.scoreString = 'Score : ';
    this.scoreText = game.add.text(10, 10, this.scoreString + this.score, {font: '24px Arial', fill: '#fff'});
    this.game.add.text(this.game.world.width - 200, 10, 'Lives : ', {font: '24px Arial', fill: '#fff'});
    this.livesGroup = game.add.group();
    this.doUpdateChapter();
  }

  setStateText(text) {
    this.stateText.text = text;
    this.stateText.visible = true;
  }

  getLivesGroup() {
    return this.livesGroup;
  }

  createLifeShips(numberOfShips) {
    this._removeAllLifeShips();
    for (var i = numberOfShips; i > 0; i--) {
      var xpos = this.game.world.width - 230 + (30 * i);
      var ship = this.livesGroup.create(xpos, 60, 'lifeShip');
      ship.anchor.setTo(0.5, 0.5);
      ship.scale.x = 0.7;
      ship.scale.y = 0.7;
      ship.alpha = 0.6;
    }
  }

  _removeAllLifeShips() {
    while (this.livesGroup.countLiving() > 0) {
      var live = this.livesGroup.getFirstAlive();
      if (live) {
        live.kill();
      }
    }
  }

  getScore() {
    return this.score;
  }

  addScore(score) {
    this.score += score;
    this.scoreText.text = this.scoreString + this.score;
  }

  setChapterSpecifics(tileSprite, lifeText) {
    this.backgroundImage = this.game.add
      .tileSprite(tileSprite.x,
        tileSprite.y,
        tileSprite.width,
        tileSprite.height,
        tileSprite.textKey);

    this.backgroundImage.tileScale.x = tileSprite.scale;

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

  setActiveEnemyIndex(activeEnemyIndex) {
    this.activeEnemyIndex = activeEnemyIndex;
  }

  doStartNewEnemyGroup() {
    this.enemyTemplate = this.enemyTemplateService.getEnemy(this.activeEnemyIndex);
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

  getNumberOfEnemies() {
    let number = this.enemyTemplateService.getNumberOfEnemies();
    return number;
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
    } else if (this.enemiesAlive === 0 && this.enemyTemplate.bonusLife) {
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

  shotHitsEnemy(shot, enemy, damage) {
    shot.kill();
    var killResult = this.doKillEnemy(enemy, damage, shot);
    this.addScore(killResult.score);
  }

  killEnemy(enemy, damage, shotPosition) {
    return this.doKillEnemy(enemy, damage, shotPosition);
  }

  doKillEnemy(enemy, damage, shotPosition) {
    let killResult = this.activeEnemies.killEnemy(enemy, damage, shotPosition, this.enemyHealth);
    if (killResult.killed) {
      this.removeEnemy(enemy);
    }

    return killResult;
  }
}
