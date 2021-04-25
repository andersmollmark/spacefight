var CHAPTER_SPACE = (function () {

  var api = {
    create: create
  };

  function create(chapterObj) {
    chapterObj.background.image = game.add.tileSprite(0, 0, 800, 600, 'space');
    chapterObj.background.xMovement = 2;
    chapterObj.enemyTemplate = ALL_ENEMIES.getEnemy(0);
    chapterObj.enemiesAlive = chapterObj.enemyTemplate.numbersAlive;
    chapterObj.activeEnemies = ENEMY_SERVICE.createEnemy(chapterObj.enemyTemplate);
    chapterObj.enemyLifeText = game.add.text(500, 10, ' ', {font: '24px Arial', fill: '#fff'});
    chapterObj.enemyLifeText.anchor.setTo(0.5, 0.5);
    chapterObj.enemyLifeText.visible = false;
    chapterObj.enemyLifeString = '';
  }

  return api;
}());
