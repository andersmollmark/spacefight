class Space {

  backgroundImage;
  backgroundXmovement = 2;
  backgroundYmovement = 0;
  enemyTemplate;
  enemiesAlive;
  activeEnemies;
  enemyLifeText;
  enemyLifeString = '';
  enemyHealth = null;
  startNewEnemyGroup = false;
  startNewEnemyGroupTime = 0;
  activeEnemyIndex = 0;
  game;

  constructor(game) {
    this.backgroundImage = game.add.tileSprite(0, 0, 800, 600, 'space');
    this.enemyTemplate = ALL_ENEMIES.getEnemy(this.activeEnemyIndex);
    this.enemiesAlive = this.enemyTemplate.numbersAlive;
    this.activeEnemies = ENEMY_SERVICE.createEnemy(this);
    this.enemyLifeText = game.add.text(500, 10, ' ', {font: '24px Arial', fill: '#fff'});
    this.enemyLifeText.anchor.setTo(0.5, 0.5);
    this.enemyLifeText.visible = false;
    this.game = game;
  };

  doStartNewEnemyGroup() {
    this.startNewEnemyGroup = false;
    this.enemyTemplate = ALL_ENEMIES.getEnemy(this.activeEnemyIndex);
    this.enemiesAlive = this.enemyTemplate.numbersAlive;
    this.activeEnemies = ENEMY_SERVICE.createEnemy(this);

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

    if (this.startNewEnemyGroup && game.time.now > this.startNewEnemyGroupTime) {
      this.doStartNewEnemyGroup();
    }
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
    BONUS.create(enemy, game);
    bonusTimeout = window.setTimeout(function () {
      BONUS.remove();
      bonusTimeout = undefined;

    }, 8000);

  }

  addExtraLife(enemy) {
    EXTRA_LIFE.create(enemy, game);
    extraLifeTimeout = window.setTimeout(function () {
      EXTRA_LIFE.remove();
      extraLifeTimeout = undefined;
    }, 8000);

  }
}
