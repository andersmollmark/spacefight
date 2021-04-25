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

        this.numbersAlive = chapterObj.enemyTemplate.numbersAlive;
        this.group.setAll('anchor.x', 0.5);
        this.group.setAll('anchor.y', 0.5);
        this.group.setAll('scale.x', chapterObj.enemyTemplate.groupXScale);
        this.group.setAll('scale.y', chapterObj.enemyTemplate.groupYScale);
        this.group.setAll('outOfBoundsKill', true);
        this.group.setAll('checkWorldBounds', true);

        this.explode = game.add.audio(chapterObj.enemyTemplate.explodeName);

        var startX = chapterObj.enemyTemplate.startXpos;
        for (var i = 0; i < chapterObj.enemyTemplate.numbersAlive; i++) {
            var tempEnemy = this.group.create(startX[i], chapterObj.enemyTemplate.startYpos + i * chapterObj.enemyTemplate.yDistance, chapterObj.enemyTemplate.pictureName);
            tempEnemy.scale.x = chapterObj.enemyTemplate.xScale;
            tempEnemy.scale.y = chapterObj.enemyTemplate.yScale;
            tempEnemy.body.velocity.x = chapterObj.enemyTemplate.xSpeed;
            tempEnemy.name = 'nisse' + i;

        }

        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(chapterObj.enemyTemplate.numberOfBullets, chapterObj.enemyTemplate.bulletName);
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);
        this.bulletSpeed = chapterObj.enemyTemplate.bulletSpeed;
        this.firingSpeed = chapterObj.enemyTemplate.firingSpeed;
        this.stay = chapterObj.enemyTemplate.stay;
        this.timeToStay = chapterObj.enemyTemplate.timeToStay;
        this.life = chapterObj.enemyTemplate.life;
        this.damage = chapterObj.enemyTemplate.damage;
        this.extraScore = chapterObj.enemyTemplate.extraScore;

        this.extraMovement = chapterObj.enemyTemplate.extraMovement;
        this.stayX = chapterObj.enemyTemplate.stayX;
        this.moveUpY = chapterObj.enemyTemplate.moveUpY;
        this.moveDownY = chapterObj.enemyTemplate.moveDownY;

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
