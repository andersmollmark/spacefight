function Chapter_1(){
    var activeEnemies;
    var enemiesAlive;
    var enemyTemplate;
    var group;
    var theChapter;

    var api = {
        init: init,
        createAndGetChapter: createAndGetChapter,
        getGroup: getGroup,
        name: name,
        preloadChapter: preloadChapter
    };

    function init(){
        enemyTemplate = ALL_ENEMIES.getEnemy(0);
        enemiesAlive = enemyTemplate.numbersAlive;

        activeEnemies = ENEMY_SERVICE.createEnemy(enemyTemplate);
    }

    function preloadChapter(game){
        game.load.image(api.name(), 'images/Space.png');
    }

    function createAndGetChapter(game){
        group = game.add.group();
        group.enableBody = true;
        group.physicsBodyType = Phaser.Physics.ARCADE;
        theChapter = group.create(900, 10, api.name());
        theChapter.body.velocity.x = -100;
        return theChapter;
    }

    function getGroup(){
        return group;
    }

    function name(){
        return 'chapter1';
    }

    return api;
}
