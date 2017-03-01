var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});
var player;
var starfield;
var playerShots;
var fireRate = 100;
var nextFire = 0;
var spacebar;
var playerShot;
var playerShotSound;
var lives;
var explodingTime = 0;

var enemyGroup1;
var enemyBullets;
var firingTimer = 0;
var enemyExplode;
var numberOfLivingEnemeies;
var livingEnemies = [];

var stateText;
var score = 0;
var scoreString;

function preload() {
    game.load.spritesheet('ship', 'images/spaceship.png', 43, 39, 9);
    game.load.spritesheet('enemyExplosion', 'images/explosion1.png', 64, 64);

    game.load.image('lifeShip', 'images/lifeShip.png');
    game.load.image('space', 'images/Space.png');
    game.load.image('playerShot', 'images/photonBomb1.png');
    game.load.image('enemy1', 'images/enemy1small.png');
    game.load.image('enemyBullet', 'images/enemyBullet1.png');

    game.load.audio('photonBomb', 'audio/photonBomb.wav');
    game.load.audio('enemyExplode', 'audio/enemyExplode.wav');

}

function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    starfield = game.add.tileSprite(0, 0, 800, 600, 'space');
    PLAYER.init(game);
    ENEMY.init(game);
    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //  Lives
    lives = game.add.group();
    game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '24px Arial', fill: '#fff' });

    for (var i = 0; i < 3; i++)
    {
        var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'lifeShip');
        ship.anchor.setTo(0.5, 0.5);
        ship.scale.x = 0.7;
        ship.scale.y = 0.7;
        // ship.angle = 90;
        ship.alpha = 0.6;
    }

    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    scoreString = 'Score : ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '24px Arial', fill: '#fff' });


}

function initEnemies() {
    // enemyGroup1 = game.add.group();
    // enemyGroup1.enableBody = true;
    // enemyGroup1.physicsBodyType = Phaser.Physics.ARCADE;
    //
    // // enemyGroup1.createMultiple(5, 'enemy1');
    // numberOfLivingEnemeies = 5;
    // enemyGroup1.setAll('anchor.x', 0.5);
    // enemyGroup1.setAll('anchor.y', 0.5);
    // enemyGroup1.setAll('scale.x', 0.5);
    // enemyGroup1.setAll('scale.y', 0.5);
    // enemyGroup1.setAll('outOfBoundsKill', true);
    // enemyGroup1.setAll('checkWorldBounds', true);
    //
    // enemyExplode = game.add.audio('enemyExplode');
    //
    // var startX = [650, 630, 600, 630, 650];
    // for(var i = 0; i< 5; i++){
    //     // var tempEnemy = enemyGroup1.getFirstDead();
    //     var tempEnemy = enemyGroup1.create(startX[i], 200 + i*50, 'enemy1');
    //     // tempEnemy.reset(startX[i], 200 + i*50);
    //     tempEnemy.scale.x = 0.7;
    //     tempEnemy.scale.y = 0.7;
    //     tempEnemy.body.velocity.x = -100;
    //
    // }
    //
    // enemyBullets = game.add.group();
    // enemyBullets.enableBody = true;
    // enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    // enemyBullets.createMultiple(30, 'enemyBullet');
    // enemyBullets.setAll('anchor.x', 0.5);
    // enemyBullets.setAll('anchor.y', 1);
    // enemyBullets.setAll('outOfBoundsKill', true);
    // enemyBullets.setAll('checkWorldBounds', true);



}



function update() {

    starfield.tilePosition.x -= 2;

    //  Reset the players velocity (movement)
    PLAYER.player.body.velocity.y = 0;
    PLAYER.player.body.velocity.x = 0;

    if(game.time.now > explodingTime && !PLAYER.player.visible && lives.countLiving() > 0){
        PLAYER.player.x = game.world.width/2;
        PLAYER.player.y = game.world.height/2;
        PLAYER.player.visible = true;
    }

    if (cursors.left.isDown && cursors.up.isDown) {
        //  Move up and left
        PLAYER.player.body.velocity.y = -150;
        PLAYER.player.body.velocity.x = -150;

        PLAYER.player.animations.play('upLeft');
    }
    else if (cursors.left.isDown && cursors.down.isDown) {
        //  Move down and left
        PLAYER.player.body.velocity.y = 150;
        PLAYER.player.body.velocity.x = -150;

        PLAYER.player.animations.play('downLeft');
    }
    else if (cursors.right.isDown && cursors.down.isDown) {
        //  Move down and right
        PLAYER.player.body.velocity.y = 150;
        PLAYER.player.body.velocity.x = 150;

        PLAYER.player.animations.play('downRight');
    }
    else if (cursors.right.isDown && cursors.up.isDown) {
        //  Move up and right
        PLAYER.player.body.velocity.y = -150;
        PLAYER.player.body.velocity.x = 150;
        PLAYER.player.animations.play('upRight');
    }
    else if (cursors.right.isDown) {
        //  Move right
        PLAYER.player.body.velocity.x = 150;

        PLAYER.player.animations.play('right');
    }
    else if (cursors.left.isDown) {
        //  Move left
        PLAYER.player.body.velocity.x = -150;

        PLAYER.player.animations.play('left');
    }
    else if (cursors.up.isDown) {
        //  Move up
        PLAYER.player.body.velocity.y = -150;

        PLAYER.player.animations.play('up');
    }
    else if (cursors.down.isDown) {
        //  Move down
        PLAYER.player.body.velocity.y = 150;

        PLAYER.player.animations.play('down');
    }
    else {
        //  Stand still
        PLAYER.player.animations.stop();

        PLAYER.player.frame = 5;
    }

    if (spacebar.isDown) {
        firePlayerShots();
    }

    if (game.time.now > firingTimer)
    {
        enemyFires();
    }



    //  Run collision
    game.physics.arcade.overlap(PLAYER.playerShots, ENEMY.group, collisionHandler, null, this);
    game.physics.arcade.overlap(ENEMY.bullets, PLAYER.player, enemyHitsPlayer, null, this);
    game.physics.arcade.overlap(ENEMY.group, PLAYER.player, enemyCollideWithPlayer, null, this);

    checkEnemiesAlive();

}

function firePlayerShots() {

    if (game.time.now > nextFire && PLAYER.playerShots.countDead() > 0) {
        nextFire = game.time.now + fireRate;

        var shot = PLAYER.playerShots.getFirstDead();

        shot.reset(PLAYER.player.x + 40, PLAYER.player.y + 10);

        // game.physics.arcade.moveToPointer(shot, 300);
        shot.body.velocity.x = 500;
        PLAYER.sound.play();
    }

}

function collisionHandler(shot, enemy){

    shot.kill();
    killEnemy(enemy);
}

function killEnemy(enemy){
    enemy.kill();

    score += 100;
    scoreText.text = scoreString + score;
    var explode = game.add.sprite(enemy.x, enemy.y, 'enemyExplosion');
    explode.anchor.x = 0.5;
    explode.anchor.y = 0.5;
    explode.animations.add('kaboom');
    explode.play('kaboom', 35, false, true);
    ENEMY.explode.play();

}

function enemyHitsPlayer(player, bullet) {

    if(!player.visible){
        return;
    }

    bullet.kill();
    killPlayer(player);

}

function killPlayer(player){
    live = lives.getFirstAlive();
    if (live) {
        live.kill();
    }

    var explode = game.add.sprite(player.x, player.y, 'enemyExplosion');
    explode.anchor.x = 0.5;
    explode.anchor.y = 0.5;
    explode.animations.add('kaboom');
    explode.play('kaboom', 35, false, true);
    ENEMY.explode.play();
    player.visible = false;
    explodingTime = game.time.now + 1000;

    // When the player dies
    if (lives.countLiving() < 1)
    {
        player.kill();
        ENEMY.bullets.callAll('kill');

        stateText.text="GAME OVER";
        stateText.visible = true;

        //the "click to restart" handler
        // game.input.onTap.addOnce(restart,this);
    }
}

function enemyCollideWithPlayer(player, enemy){
    if(!player.visible){
        return;
    }
    killPlayer(player);
    killEnemy(enemy);


}

function enemyFires () {

    //  Grab the first bullet we can from the pool
    enemyBullet = ENEMY.bullets.getFirstExists(false);

    livingEnemies.length=0;

    ENEMY.group.forEachAlive(function(enemy){
        livingEnemies.push(enemy);
    });


    if (PLAYER.player.visible && enemyBullet && livingEnemies.length > 0) {
        var random=game.rnd.integerInRange(0, livingEnemies.length-1);
        // randomly select one of them
        var shooter=livingEnemies[random];
        // And fire the bullet from this enemy
        enemyBullet.reset(shooter.body.x, shooter.body.y);

        game.physics.arcade.moveToObject(enemyBullet,PLAYER.player,120);
        firingTimer = game.time.now + 2000;
    }

}

function checkEnemiesAlive(){
    livingEnemies.length = 0;
    ENEMY.group.forEachAlive(function(enemy){
        if(enemy.x < -100){
            enemy.kill();
        }
        else{
            livingEnemies.push(enemy);
        }

    });

    if(livingEnemies.length == 0){
        stateText.text="You won!";
        stateText.visible = true;

    }
}
