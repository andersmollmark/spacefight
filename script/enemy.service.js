var ENEMY_SERVICE = (function () {

    var privateAPI = {
        game: undefined
    };

    var service = {
        init: init,
        createEnemy: createEnemy
    };

    function init(game) {
        privateAPI.game = game;
    }

    function createEnemy(enemyTemplate) {
        var enemyObject = {
            group: undefined,
            numbersAlive: undefined,
            explode: undefined,
            bullets: undefined,
            bulletSpeed: undefined,
            firingSpeed: undefined
        };


        enemyObject.group = privateAPI.game.add.group();
        enemyObject.group.enableBody = true;
        enemyObject.group.physicsBodyType = Phaser.Physics.ARCADE;

        enemyObject.numbersAlive = enemyTemplate.numbersAlive;
        enemyObject.group.setAll('anchor.x', 0.5);
        enemyObject.group.setAll('anchor.y', 0.5);
        enemyObject.group.setAll('scale.x', enemyTemplate.groupXScale);
        enemyObject.group.setAll('scale.y', enemyTemplate.groupYScale);
        enemyObject.group.setAll('outOfBoundsKill', true);
        enemyObject.group.setAll('checkWorldBounds', true);

        enemyObject.explode = privateAPI.game.add.audio(enemyTemplate.explodeName);

        var startX = enemyTemplate.startXpos;
        for (var i = 0; i < enemyTemplate.numbersAlive; i++) {
            var tempEnemy = enemyObject.group.create(startX[i], enemyTemplate.startYpos + i * enemyTemplate.yDistance, enemyTemplate.pictureName);
            tempEnemy.scale.x = enemyTemplate.xScale;
            tempEnemy.scale.y = enemyTemplate.yScale;
            tempEnemy.body.velocity.x = enemyTemplate.xSpeed;
            tempEnemy.name = 'nisse' + i;

        }

        enemyObject.bullets = privateAPI.game.add.group();
        enemyObject.bullets.enableBody = true;
        enemyObject.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        enemyObject.bullets.createMultiple(enemyTemplate.numberOfBullets, enemyTemplate.bulletName);
        enemyObject.bullets.setAll('anchor.x', 0.5);
        enemyObject.bullets.setAll('anchor.y', 1);
        enemyObject.bullets.setAll('outOfBoundsKill', true);
        enemyObject.bullets.setAll('checkWorldBounds', true);
        enemyObject.bulletSpeed = enemyTemplate.bulletSpeed;
        enemyObject.firingSpeed = enemyTemplate.firingSpeed;
        enemyObject.stay = enemyTemplate.stay;
        enemyObject.timeToStay = enemyTemplate.timeToStay;
        enemyObject.life = enemyTemplate.life;
        enemyObject.damage = enemyTemplate.damage;
        enemyObject.extraScore = enemyTemplate.extraScore;

        return enemyObject;

    }

    return service;

}());
