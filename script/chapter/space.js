class Space extends AbstractChapter{

  static tileSprite = {
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    textKey: 'space'
  };

  static lifeText = {
    x: 500,
    y: 10,
    text: ' ',
    font: {font: '24px Arial', fill: '#fff'}
  };

  constructor(game) {
    super(game, Space.tileSprite, Space.lifeText, 0);
    this.backgroundImage = game.add.tileSprite(0, 0, 800, 600, 'space');
    this.enemyTemplate = ALL_ENEMIES.getEnemy(0);
    this.enemiesAlive = this.enemyTemplate.numbersAlive;
    this.activeEnemies = this.createEnemy();
    this.enemyLifeText = game.add.text(500, 10, ' ', {font: '24px Arial', fill: '#fff'});
    this.enemyLifeText.anchor.setTo(0.5, 0.5);
    this.enemyLifeText.visible = false;
    this.game = game;
  };

}
