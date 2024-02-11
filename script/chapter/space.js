class Space extends AbstractChapter{

  static tileSprite = {
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    textKey: 'space',
    backgroundXmovement: 1,
    backgroundYmovement: 0,
    scale: 1
  };

  static lifeText = {
    x: 500,
    y: 10,
    text: ' ',
    font: {font: '24px Arial', fill: '#fff'}
  };


  constructor(game) {
    super(game, Space.tileSprite, Space.lifeText, SPACE_ENEMIES, 0);
    this.enemyLifeText = game.add.text(500, 10, ' ', {font: '24px Arial', fill: '#fff'});
    this.enemyLifeText.anchor.setTo(0.5, 0.5);
    this.enemyLifeText.visible = false;
  };

  createNewPlayer() {
    return new Spaceship(this.game);
  }

  createNextChapter() {
    return new Mars(this.game);
  }

    getNextChapterText() {
    return "Land on mars and destroy enemy base";
  }

  isEnemyOutsideScreen(enemy) {
    return enemy.x < -100;
  }

}
