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
    initPlayer();
    initEnemies();
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

function initPlayer() {
    // The player and its settings
    player = game.add.sprite(100, game.world.height - 150, 'ship');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    playerShots = game.add.group();
    playerShots.enableBody = true;
    playerShots.physicsBodyType = Phaser.Physics.ARCADE;

    playerShots.createMultiple(50, 'playerShot');
    playerShots.setAll('checkWorldBounds', true);
    playerShots.setAll('outOfBoundsKill', true);

    playerShotSound = game.add.audio('photonBomb');

    player.animations.add('upLeft', [2], 10, true);
    player.animations.add('downLeft', [8], 10, true);

    player.animations.add('upRight', [1], 10, true);
    player.animations.add('downRight', [7], 10, true);

    player.animations.add('up', [0], 10, true);
    player.animations.add('down', [6], 10, true);

    player.animations.add('left', [5], 10, true);
    player.animations.add('right', [4], 10, true);

}

function initEnemies() {
    enemyGroup1 = game.add.group();
    enemyGroup1.enableBody = true;
    enemyGroup1.physicsBodyType = Phaser.Physics.ARCADE;

    // enemyGroup1.createMultiple(5, 'enemy1');
    numberOfLivingEnemeies = 5;
    enemyGroup1.setAll('anchor.x', 0.5);
    enemyGroup1.setAll('anchor.y', 0.5);
    enemyGroup1.setAll('scale.x', 0.5);
    enemyGroup1.setAll('scale.y', 0.5);
    enemyGroup1.setAll('outOfBoundsKill', true);
    enemyGroup1.setAll('checkWorldBounds', true);

    enemyExplode = game.add.audio('enemyExplode');

    var startX = [650, 630, 600, 630, 650];
    for(var i = 0; i< 5; i++){
        // var tempEnemy = enemyGroup1.getFirstDead();
        var tempEnemy = enemyGroup1.create(startX[i], 200 + i*50, 'enemy1');
        // tempEnemy.reset(startX[i], 200 + i*50);
        tempEnemy.scale.x = 0.7;
        tempEnemy.scale.y = 0.7;
        tempEnemy.body.velocity.x = -100;

    }

    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, 'enemyBullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);



}



function update() {

    starfield.tilePosition.x -= 2;

    //  Reset the players velocity (movement)
    player.body.velocity.y = 0;
    player.body.velocity.x = 0;

    if(game.time.now > explodingTime && !player.visible && lives.countLiving() > 0){
        player.x = game.world.width/2;
        player.y = game.world.height/2;
        player.visible = true;
    }

    if (cursors.left.isDown && cursors.up.isDown) {
        //  Move up and left
        player.body.velocity.y = -150;
        player.body.velocity.x = -150;

        player.animations.play('upLeft');
    }
    else if (cursors.left.isDown && cursors.down.isDown) {
        //  Move down and left
        player.body.velocity.y = 150;
        player.body.velocity.x = -150;

        player.animations.play('downLeft');
    }
    else if (cursors.right.isDown && cursors.down.isDown) {
        //  Move down and right
        player.body.velocity.y = 150;
        player.body.velocity.x = 150;

        player.animations.play('downRight');
    }
    else if (cursors.right.isDown && cursors.up.isDown) {
        //  Move up and right
        player.body.velocity.y = -150;
        player.body.velocity.x = 150;
        player.animations.play('upRight');
    }
    else if (cursors.right.isDown) {
        //  Move right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else if (cursors.left.isDown) {
        //  Move left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.up.isDown) {
        //  Move up
        player.body.velocity.y = -150;

        player.animations.play('up');
    }
    else if (cursors.down.isDown) {
        //  Move down
        player.body.velocity.y = 150;

        player.animations.play('down');
    }
    else {
        //  Stand still
        player.animations.stop();

        player.frame = 5;
    }

    if (spacebar.isDown) {
        firePlayerShots();
    }

    if (game.time.now > firingTimer)
    {
        enemyFires();
    }



    //  Run collision
    game.physics.arcade.overlap(playerShots, enemyGroup1, collisionHandler, null, this);
    game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);

    checkEnemiesAlive();

}

function firePlayerShots() {

    if (game.time.now > nextFire && playerShots.countDead() > 0) {
        nextFire = game.time.now + fireRate;

        var shot = playerShots.getFirstDead();

        shot.reset(player.x + 40, player.y + 10);

        // game.physics.arcade.moveToPointer(shot, 300);
        shot.body.velocity.x = 500;
        playerShotSound.play();
    }

}

function collisionHandler(shot, enemy){

    shot.kill();
    enemy.kill();

    score += 100;
    scoreText.text = scoreString + score;
    var explode = game.add.sprite(enemy.x, enemy.y, 'enemyExplosion');
    explode.anchor.x = 0.5;
    explode.anchor.y = 0.5;
    explode.animations.add('kaboom');
    explode.play('kaboom', 35, false, true);
    enemyExplode.play();

}

function enemyHitsPlayer(player, bullet) {

    if(!player.visible){
        return;
    }

    bullet.kill();

    live = lives.getFirstAlive();

    if (live)
    {
        live.kill();
    }

    var explode = game.add.sprite(player.x, player.y, 'enemyExplosion');
    explode.anchor.x = 0.5;
    explode.anchor.y = 0.5;
    explode.animations.add('kaboom');
    explode.play('kaboom', 35, false, true);
    enemyExplode.play();
    player.visible = false;
    explodingTime = game.time.now + 1000;

    // When the player dies
    if (lives.countLiving() < 1)
    {
        player.kill();
        enemyBullets.callAll('kill');

        stateText.text="GAME OVER";
        stateText.visible = true;

        //the "click to restart" handler
        // game.input.onTap.addOnce(restart,this);
    }

}

function enemyFires () {

    //  Grab the first bullet we can from the pool
    enemyBullet = enemyBullets.getFirstExists(false);

    livingEnemies.length=0;

    enemyGroup1.forEachAlive(function(enemy){
        livingEnemies.push(enemy);
    });


    if (player.visible && enemyBullet && livingEnemies.length > 0) {
        var random=game.rnd.integerInRange(0,livingEnemies.length-1);
        // randomly select one of them
        var shooter=livingEnemies[random];
        // And fire the bullet from this enemy
        enemyBullet.reset(shooter.body.x, shooter.body.y);

        game.physics.arcade.moveToObject(enemyBullet,player,120);
        firingTimer = game.time.now + 2000;
    }

}

function checkEnemiesAlive(){
    livingEnemies.length = 0;
    enemyGroup1.forEachAlive(function(enemy){
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
