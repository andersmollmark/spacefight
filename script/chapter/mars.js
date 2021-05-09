class Mars extends AbstractChapter{

  activeEnemyIndex = 0;

  constructor(game) {
    super(game);
    this.setChapterSpecifics(this.tileSprite, this.lifeText);
    this.enemyTemplate = ALL_ENEMIES.getEnemy(this.activeEnemyIndex);
    this.enemiesAlive = this.enemyTemplate.numbersAlive;
    this.activeEnemies = this.createEnemy();
  };

}
