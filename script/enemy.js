var ENEMY = (function () {

    var self = {
        init: init,
        sound: undefined,
        group: undefined,
        explode: undefined,
        bullets: undefined,
        numbersAlive: undefined,
        bulletSpeed: undefined,
        firingSpeed: undefined
    };

    function init(game){
        self.group = game.add.group();
        self.group.enableBody = true;
        self.group.physicsBodyType = Phaser.Physics.ARCADE;

        self.numbersAlive = 5;
        self.group.setAll('anchor.x', 0.5);
        self.group.setAll('anchor.y', 0.5);
        self.group.setAll('scale.x', 0.5);
        self.group.setAll('scale.y', 0.5);
        self.group.setAll('outOfBoundsKill', true);
        self.group.setAll('checkWorldBounds', true);

        self.explode = game.add.audio('enemyExplode');

        var startX = [650, 630, 600, 630, 650];
        for(var i = 0; i< 5; i++){
            var tempEnemy = self.group.create(startX[i], 200 + i*50, 'enemy1');
            tempEnemy.scale.x = 0.7;
            tempEnemy.scale.y = 0.7;
            tempEnemy.body.velocity.x = -100;

        }

        self.bullets = game.add.group();
        self.bullets.enableBody = true;
        self.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        self.bullets.createMultiple(30, 'enemyBullet');
        self.bullets.setAll('anchor.x', 0.5);
        self.bullets.setAll('anchor.y', 1);
        self.bullets.setAll('outOfBoundsKill', true);
        self.bullets.setAll('checkWorldBounds', true);
    }

    return self;

}());
