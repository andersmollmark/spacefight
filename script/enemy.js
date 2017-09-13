function Enemy() {

    var me = undefined;
    var group = undefined;
    var numbersAlive = undefined;
    var explode = undefined;
    var bullets = undefined;
    var bulletSpeed = undefined;
    var firingSpeed = undefined;


    var self = {
        init: init
    };

    function init(template, game) {
        this.me = template;

        this.group = game.add.group();
        this.group.enableBody = true;
        this.group.physicsBodyType = Phaser.Physics.ARCADE;

        this.numbersAlive = enemyTemplate.numbersAlive;
        this.group.setAll('anchor.x', 0.5);
        this.group.setAll('anchor.y', 0.5);
        this.group.setAll('scale.x', enemyTemplate.groupXScale);
        this.group.setAll('scale.y', enemyTemplate.groupYScale);
        this.group.setAll('outOfBoundsKill', true);
        this.group.setAll('checkWorldBounds', true);

        this.explode = game.add.audio(enemyTemplate.explodeName);

        var startX = enemyTemplate.startXpos;
        for (var i = 0; i < enemyTemplate.numbersAlive; i++) {
            var tempEnemy = this.group.create(startX[i], enemyTemplate.startYpos + i * enemyTemplate.yDistance, enemyTemplate.pictureName);
            tempEnemy.scale.x = enemyTemplate.xScale;
            tempEnemy.scale.y = enemyTemplate.yScale;
            tempEnemy.body.velocity.x = enemyTemplate.xSpeed;
            tempEnemy.name = 'nisse' + i;

        }

        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(enemyTemplate.numberOfBullets, enemyTemplate.bulletName);
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);
        this.bulletSpeed = enemyTemplate.bulletSpeed;
        this.firingSpeed = enemyTemplate.firingSpeed;
        this.stay = enemyTemplate.stay;
        this.timeToStay = enemyTemplate.timeToStay;
        this.life = enemyTemplate.life;
        this.damage = enemyTemplate.damage;
        this.extraScore = enemyTemplate.extraScore;

        this.extraMovement = enemyTemplate.extraMovement;
        this.stayX = enemyTemplate.stayX;
        this.moveUpY = enemyTemplate.moveUpY;
        this.moveDownY = enemyTemplate.moveDownY;

    }

    function update(game, enemySprite) {


    }

    function shallStay(game, enemySprite) {
        var me = this.me;
        if (me.stay) {
            if (me.stayX && me.stayX <= enemySprite.x) {
                me.oldvelocity = me.velocity.x;
                me.velocity.x = 0;
            }
        }
    }

    return self;

};
