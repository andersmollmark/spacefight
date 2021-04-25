
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});

var activeChapter;

var spacebar;
var playerShot;
var lives;
var bonusTimeout;
var extraLifeTimeout;
var firingTimer = 0;
var numberOfKilledEnemyGroups = 0;
var stateText;
var newChapterText;
var score = 0;
var scoreString;
var music;
var bonusSound;
var extraLife;

var newChapter = {
    active: false,
    group: undefined
};

function preload() {

    game.load.spritesheet('ship', 'images/spaceship.png', 43, 39, 9);
    game.load.spritesheet('enemyExplosion', 'images/explosion1.png', 64, 64);
    game.load.spritesheet('bonusSprite', 'images/bonusBlob.png', 64, 64);

    game.load.spritesheet('hero', 'images/hero2.png', 30, 40);

    game.load.spritesheet('bonusLife', 'images/bonusLifeBig.jpg', 29.5, 29.5);

    game.load.image('lifeShip', 'images/lifeShip.png');
    game.load.image('healthIcon', 'images/healthIcon.png');

    game.load.image('space', 'images/Space.png');
    game.load.image('desert', 'images/desert1_big.png');

    game.load.image(CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_NAME, CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_PNG);
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
    ENEMY_SERVICE.init(game);
    bonusSound = game.add.audio('bonusSound');

    activeChapter = new Space(game);

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //Music
    music = game.add.audio('missionImpossible');
    music.play();

    //  Lives
    lives = game.add.group();
    game.add.text(game.world.width - 200, 10, 'Lives : ', {font: '24px Arial', fill: '#fff'});

    createLiveShips(3);

    stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', {font: '84px Arial', fill: '#fff'});
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    newChapterText = game.add.text(game.world.centerX, game.world.centerY, ' ', {font: '30px Arial', fill: '#fff'});
    newChapterText.anchor.setTo(0.5, 0.5);
    newChapterText.visible = false;

    scoreString = 'Score : ';
    scoreText = game.add.text(10, 10, scoreString + score, {font: '24px Arial', fill: '#fff'});

    PLAYER.init(game, CONSTANT_SERVICE);

}

function createLiveShips(numberOfShips) {
    console.log("number alive before:" + lives.countLiving());
    for (var i = numberOfShips; i > 0; i--) {
        var xpos = game.world.width - 230 + (30 * i);
        console.log('adding life at :' + xpos + ' and i=' + i);
        var ship = lives.create(xpos, 60, 'lifeShip');
        ship.anchor.setTo(0.5, 0.5);
        ship.scale.x = 0.7;
        ship.scale.y = 0.7;
        ship.alpha = 0.6;
    }
}


function update() {

    if (newChapter.active) {
        game.physics.arcade.overlap(newChapter.group, PLAYER.player, startNewChapter, null, this);
    }
    else {

      //   activeChapter.backgroundImage.tilePosition.x -= activeChapter.backgroundXmovement;
      // activeChapter.backgroundImage.tilePosition.y -= activeChapter.backgroundYmovement;
      //
      //   if (activeChapter.startNewEnemyGroup && game.time.now > activeChapter.startNewEnemyGroupTime) {
      //       activeChapter.doStartNewEnemyGroup();
      //   }
        activeChapter.updateChapter();

        PLAYER.move(cursors);
        if (spacebar.isDown) {
            PLAYER.firePlayerShots();
        }
        if (game.time.now > firingTimer) {
            enemyFires();
        }

        //  Check collisions and bullets and finally if bonusblob
        game.physics.arcade.overlap(PLAYER.playerShots.shotGroup, activeChapter.activeEnemies.group, shotHitsEnemy, null, this);
        game.physics.arcade.overlap(activeChapter.activeEnemies.bullets, PLAYER.player, enemyShotHitsPlayer, null, this);
        game.physics.arcade.overlap(activeChapter.activeEnemies.group, PLAYER.player, enemyCollideWithPlayer, null, this);

        if (bonusTimeout) {
            game.physics.arcade.overlap(BONUS.get(), PLAYER.player, playerTakesBonus, null, this);
        }
        if (extraLife) {
            game.physics.arcade.overlap(extraLife, PLAYER.player, playerGetsExtraLife, null, this);
        }

        checkEnemiesAlive();
    }
}

function shotHitsEnemy(shot, enemy) {

    shot.kill();
    // console.log('shooting with damage:' + PLAYER.playerShots.shotGroup.damage);
    killEnemy(enemy, PLAYER.playerShots.shotGroup.damage, shot);
}

function killEnemy(enemy, damage, shotPos) {

    var killResult = ENEMY_SERVICE.killEnemy(enemy, damage, shotPos, activeChapter.enemyHealth);

    scoreText.text = scoreString + killResult.score;
    // console.log('enemy.x:' + enemy.x + ' enemy.y:' + enemy.y + ' shot.x:' + (pos.x + 35) + ' shot.y:' + pos.y);
    var explode = game.add.sprite(shotPos.x + 20, shotPos.y, 'enemyExplosion');
    explode.anchor.x = 0;
    explode.anchor.y = 0.5;
    explode.animations.add('kaboom');
    explode.play('kaboom', 35, false, true);
    activeChapter.activeEnemies.explode.play();

    if (killResult.killed) {
        activeChapter.removeEnemy(enemy);
    }
}

// function removeEnemy(enemy) {
//     activeChapter.enemiesAlive--;
//     if (activeChapter.enemiesAlive === 0 && activeChapter.enemyTemplate.bonus) {
//         addBonusBlob(enemy);
//     }
//     else if (activeChapter.enemiesAlive === 0 && activeChapter.enemyTemplate.bonusLife) {
//         addExtraLife(enemy);
//     }
// }
//
// function addBonusBlob(enemy) {
//     BONUS.create(enemy, game);
//     bonusTimeout = window.setTimeout(function () {
//         BONUS.remove();
//         bonusTimeout = undefined;
//
//     }, 8000);
//
// }
//
// function addExtraLife(enemy) {
//     EXTRA_LIFE.create(enemy, game);
//     extraLifeTimeout = window.setTimeout(function () {
//         EXTRA_LIFE.remove();
//         extraLifeTimeout = undefined;
//     }, 8000);
//
// }

function enemyShotHitsPlayer(player, bullet) {
    bullet.kill();
    killPlayer(player);
}

function killPlayer(player) {

    if (PLAYER.isTemporaryImmortal()) {
        console.log('immortal');
        return;
    }

    live = lives.getFirstAlive();
    if (live) {
        live.kill();
    }

    var explode = game.add.sprite(player.x, player.y, 'enemyExplosion');
    explode.anchor.x = 0.5;
    explode.anchor.y = 0.5;
    explode.animations.add('kaboom');
    explode.play('kaboom', 35, false, true);
    PLAYER.setVisible(false);
    activeChapter.activeEnemies.explode.play();

    // When the player dies
    if (lives.countLiving() < 0) {
        player.kill();
        activeChapter.activeEnemies.bullets.callAll('kill');

        stateText.text = "GAME OVER";
        stateText.visible = true;

    }
    else {
        PLAYER.setTemporaryImmortal(CONSTANT_SERVICE.EXPLODING_TIME);
    }
}

function enemyCollideWithPlayer(player, enemy) {
    if (PLAYER.isTemporaryImmortal()) {
        return;
    }
    killPlayer(player);
    killEnemy(enemy, 1, player);
}

function playerTakesBonus(bonus, player) {
    window.clearTimeout(bonusTimeout);
    bonusSound.play();
    PLAYER.upgradeShot({upgradeNumber: 1});
    BONUS.remove();
}

function playerGetsExtraLife(bonus, player) {
    window.clearTimeout(extraLifeTimeout);
    bonusSound.play();

    //recreate all live-ships
    var newNumberOfLives = lives.countLiving() + 1;
    while (lives.countLiving() > 0) {
        live = lives.getFirstAlive();
        if (live) {
            live.kill();
        }
    }

    createLiveShips(newNumberOfLives);
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


    if (PLAYER.isVisible() && enemyBullet && livingEnemies.length > 0) {
        var random = game.rnd.integerInRange(0, livingEnemies.length - 1);
        // randomly select one of them
        var shooter = livingEnemies[random];
        // And fire the bullet from this enemy
        enemyBullet.reset(shooter.body.x, shooter.body.y);

        game.physics.arcade.moveToObject(enemyBullet, PLAYER.player, activeChapter.activeEnemies.bulletSpeed);
        firingTimer = game.time.now + activeChapter.activeEnemies.firingSpeed;
    }


}

function checkEnemiesAlive() {
    var livingEnemies = [];


    activeChapter.activeEnemies.group.forEachAlive(function (enemy) {
        if (enemy.x < -100) {
            enemy.kill();
        }
        else {
            livingEnemies.push(enemy);
        }

    });

    if (livingEnemies.length == 0) {

        if (!activeChapter.startNewEnemyGroup) {
            numberOfKilledEnemyGroups++;
            if (ALL_ENEMIES.getNumberOfEnemies <= numberOfKilledEnemyGroups) {
                // console.log('number of enemies:' + ALL_ENEMIES.getNumberOfEnemies + ' killed enemies:' + numberOfKilledEnemyGroups);
                // stateText.text="You won!";
                // stateText.visible = true;
                // startNewEnemyGroup = false;

                prepareNewChapter(1); // TODO how to switch between chapters
            }
            else {
              activeChapter.startNewEnemyGroup = true;
              activeChapter.startNewEnemyGroupTime = game.time.now + 3000;
                activeChapter.activeEnemyIndex++;
            }

        }

    }
}

function prepareNewChapter(chapterNo) {
    newChapterText.text = "Land on mars and destroy enemy base";
    newChapterText.visible = true;
  activeChapter.startNewEnemyGroup = false;

    PLAYER.resetPlayerForNewChapter();
    newChapter.active = true;
    newChapter.group = game.add.group();
    newChapter.group.enableBody = true;
    newChapter.group.physicsBodyType = Phaser.Physics.ARCADE;

    var chapter = newChapter.group.create(900, 10, 'chapter2');
    chapter.scale.x = 1;
    chapter.scale.y = 1;
    chapter.body.velocity.x = -100;

}

function startNewChapter() {
    newChapter.active = false;
    newChapterText.text = "";
    newChapterText.visible = false;
  activeChapter.startNewEnemyGroup = true;
    activeChapter.backgroundImage = game.add.tileSprite(0, 0, 800, 600, 'desert');
    activeChapter.backgroundImage.tileScale.x = 1.7;
    activeChapter.backgroundXmovement = 0;
    activeChapter.backgroundYmovement = -0.5;

}

