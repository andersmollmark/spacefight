
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});

var activeChapter;

var spacebar;
var playerShot;
var bonusTimeout;
var extraLifeTimeout;
var firingTimer = 0;
var numberOfKilledEnemyGroups = 0;
var newChapterText;
var music;
var bonusSound;
var extraLife;
var player;

var newChapter = {
    active: false,
    group: undefined
};

function preload() {

    game.load.spritesheet('ship', 'images/spaceship.png', 43, 39, 9);
    game.load.spritesheet('shipUpwards', 'images/spaceshipUp.png', 39, 43, 9);
    game.load.spritesheet('enemyExplosion', 'images/explosion1.png', 64, 64);
    game.load.spritesheet('bonusSprite', 'images/bonusBlob.png', 64, 64);

    game.load.spritesheet('hero', 'images/hero2.png', 30, 40);

    game.load.spritesheet('bonusLife', 'images/bonusLifeBig.jpg', 29.5, 29.5);

    game.load.image('lifeShip', 'images/lifeShip.png');
    game.load.image('healthIcon', 'images/healthIcon.png');

    game.load.image('space', 'images/Space.png');
    game.load.image('desert', 'images/desert1_big.png');

    game.load.image(CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_NAME, CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_PNG);
    game.load.image(CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_UP_NAME, CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_UP_PNG);
    game.load.image(CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_UPGRADE_1_NAME, CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_UPGRADE_1_PNG);
    game.load.image(CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_UPGRADE_2_NAME, CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_UPGRADE_2_PNG);
    game.load.image(CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_UPGRADE_3_NAME, CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_UPGRADE_3_PNG);

    game.load.audio(CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_SOUND, 'audio/photonBomb.wav');
    game.load.audio(CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_3_SOUND, 'audio/photonBomb3.wav');
    game.load.audio('bonusSound', 'audio/weaponUpgrade2.wav');
    game.load.audio('missionImpossible', 'audio/Mission_Impossible.mp3');

    game.load.image('chapter2', 'images/chapter2_mars.png');

    var allEnemyPics = ALL_ENEMIES.getAllPictures();
    for (var i = 0; i < allEnemyPics.length; i++) {
        game.load.image(allEnemyPics[i].name, allEnemyPics[i].path);
    }

    var allEnemyBullets = ALL_ENEMIES.getAllBullets();
    for (var i = 0; i < allEnemyBullets.length; i++) {
        game.load.image(allEnemyBullets[i].name, allEnemyBullets[i].path);
    }

    var allEnemySounds = ALL_ENEMIES.getAllSounds();
    for (var i = 0; i < allEnemySounds.length; i++) {
        game.load.audio(allEnemySounds[i].name, allEnemySounds[i].path);
    }


}

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    bonusSound = game.add.audio('bonusSound');

    activeChapter = new Space(game);
    activeChapter.createLifeShips(3);

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //Music
    // music = game.add.audio('missionImpossible');
    // music.play();

    newChapterText = game.add.text(game.world.centerX, game.world.centerY, ' ', {font: '30px Arial', fill: '#fff'});
    newChapterText.anchor.setTo(0.5, 0.5);
    newChapterText.visible = false;

    player = activeChapter.createNewPlayer();
}

function update() {

    if (newChapter.active) {
      startNewChapter();
    }
    else if(activeChapter.chapterStarted){

        activeChapter.updateChapter();

        player.move(cursors);
        if (spacebar.isDown) {
            player.fire();
        }
        if (game.time.now > firingTimer) {
            enemyFires();
        }

        //  Check collisions and bullets and finally if bonusblob
        var shotGroups = player.playerShots.getShotgroup();
        shotGroups.forEach(shotGroup => {
          game.physics.arcade.overlap(shotGroup, activeChapter.activeEnemies.group, shotHitsEnemy, null, this);
        });

        game.physics.arcade.overlap(activeChapter.activeEnemies.bullets, player.player, enemyShotHitsPlayer, null, this);
        game.physics.arcade.overlap(activeChapter.activeEnemies.group, player.player, enemyCollideWithPlayer, null, this);

        if (bonusTimeout) {
            game.physics.arcade.overlap(BONUS.get(), player.player, playerTakesBonus, null, this);
        }
        if (extraLife) {
            game.physics.arcade.overlap(extraLife, player.player, playerGetsExtraLife, null, this);
        }

        checkEnemiesAlive();
    }
}

function shotHitsEnemy(shot, enemy) {
  activeChapter.shotHitsEnemy(shot, enemy, player.playerShots.getDamage());
}

function enemyShotHitsPlayer(player, bullet) {
    bullet.kill();
    killPlayer(player);
}

function killPlayer() {

  if (this.player.isTemporaryImmortal()) {
      console.log('immortal');
        return;
    }

    live = activeChapter.getLivesGroup().getFirstAlive();
    if (live) {
        live.kill();
    }

    var explode = game.add.sprite(this.player.getX(), this.player.getY(), 'enemyExplosion');
    explode.anchor.x = 0.5;
    explode.anchor.y = 0.5;
    explode.animations.add('kaboom');
    explode.play('kaboom', 35, false, true);
    this.player.setVisible(false);
    activeChapter.activeEnemies.explode.play();

    // When the player dies
    if (activeChapter.getLivesGroup().countLiving() <= 0) {
        this.player.doKill();
        activeChapter.activeEnemies.bullets.callAll('kill');
        activeChapter.setStateText('GAME OVER');
    }
    else {
        this.player.setTemporaryImmortal(CONSTANT_SERVICE.EXPLODING_TIME);
        this.player.downgradeShot();
    }
}

function enemyCollideWithPlayer(playerShip, enemy) {
    if (player.isTemporaryImmortal()) {
        return;
    }
    killPlayer(playerShip);
    activeChapter.killEnemy(enemy, 1, playerShip);
}

function playerTakesBonus() {
    window.clearTimeout(bonusTimeout);
    bonusSound.play();
    player.upgradeShot({upgradeNumber: 1});
    BONUS.remove();
}

function playerGetsExtraLife(bonus, player) {
    window.clearTimeout(extraLifeTimeout);
    bonusSound.play();
    activeChapter.createLifeShips(activeChapter.getLivesGroup().countLiving() + 1);
    EXTRA_LIFE.remove();
}

function enemyFires() {

    //  Grab the first bullet we can from the pool
    enemyBullet = activeChapter.activeEnemies.bullets.getFirstExists(false);
    var livingEnemies = [];
    activeChapter.activeEnemies.group.forEachAlive(function (enemy) {
        livingEnemies.push(enemy);

        if (activeChapter.activeEnemies.stay) {
            if (enemy.body.velocity.x !== 0 && !enemy.hasStopped) {
                if (activeChapter.activeEnemies.stayX && enemy.body.x <= activeChapter.activeEnemies.stayX) {
                    enemy.body.oldvelocity = enemy.body.velocity.x;
                    enemy.body.velocity.x = 0;
                    enemy.timeToMove = game.time.now + activeChapter.activeEnemies.timeToStay;
                    enemy.hasStopped = true;
                }
                else if (!activeChapter.activeEnemies.stayX && enemy.body.x <= game.world.width / 2) {
                    enemy.body.oldvelocity = enemy.body.velocity.x;
                    enemy.body.velocity.x = 0;
                    enemy.timeToMove = game.time.now + activeChapter.activeEnemies.timeToStay;
                    enemy.hasStopped = true;
                }


            }
            else if (enemy.hasStopped && enemy.timeToMove < game.time.now) {
                // console.log(enemy.name + ' shall start again and time is:' + game.time.now);
                enemy.body.velocity.x = enemy.body.oldvelocity;
                enemy.timeToMove = 0;
            }
        }
    });
    if (player.isVisible() && enemyBullet && livingEnemies.length > 0) {
        var random = game.rnd.integerInRange(0, livingEnemies.length - 1);
        // randomly select one of them
        var shooter = livingEnemies[random];
        // And fire the bullet from this enemy
        enemyBullet.reset(shooter.body.x, shooter.body.y);

        game.physics.arcade.moveToObject(enemyBullet, player.player, activeChapter.activeEnemies.bulletSpeed);
        firingTimer = game.time.now + activeChapter.activeEnemies.firingSpeed;
    }
}

function checkEnemiesAlive() {
    var livingEnemies = [];
    activeChapter.activeEnemies.group.forEachAlive(function (enemy) {
        if (activeChapter.isEnemyOutsideScreen(enemy)) {
            enemy.kill();
        }
        else {
            livingEnemies.push(enemy);
        }

    });

    if (livingEnemies.length == 0) {
        if (!activeChapter.startNewEnemyGroup) {
            numberOfKilledEnemyGroups++;
            if (activeChapter.getNumberOfEnemies() <= numberOfKilledEnemyGroups) {
                prepareNewChapter(); // TODO how to switch between chapters
            }
            else {
              activeChapter.startNewEnemyGroup = true;
              activeChapter.startNewEnemyGroupTime = game.time.now + 3000;
              activeChapter.setActiveEnemyIndex(activeChapter.activeEnemyIndex + 1);
            }
        }
    }
}

function prepareNewChapter() {
    newChapterText.text = activeChapter.getNextChaptertext();
    newChapterText.visible = true;
    activeChapter.startNewEnemyGroup = false;
    newChapter.active = true;
}

function startNewChapter() {
    newChapter.active = false;
    newChapterText.text = "";
    newChapterText.visible = false;
    var oldChapter = activeChapter;
    activeChapter = oldChapter.createNextChapter();
    activeChapter.addScore(oldChapter.getScore());
    activeChapter.createLifeShips(oldChapter.getLivesGroup().countLiving());
    numberOfKilledEnemyGroups = 0;
    player = activeChapter.createNewPlayer();
}

