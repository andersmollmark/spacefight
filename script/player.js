var PLAYER = (function () {

    var privateAPI = {
        nextFire: 0,
        activeShotDesc: 0
    };

    var shotDesc = [
        {
            name: 'playerShot',
            speed: 300,
            xPos: [40],
            yPos: [10],
            shotGroup: undefined,
            fireRate: 300,
            numberOfShots: 1,
            damage: 1
        },
        {
            name: 'playerShotUpgrade',
            speed: 500,
            xPos: [40],
            yPos: [10],
            shotGroup: undefined,
            fireRate: 200,
            numberOfShots: 1,
            damage: 2
        },
        {
            name: 'playerShotUpgrade',
            speed: 500,
            xPos: [40, 40],
            yPos: [25, 5],
            shotGroup: undefined,
            fireRate: 200,
            numberOfShots: 2,
            damage: 2
        }
    ];

    var self = {
        init: init,
        player: undefined,
        playerShots: undefined,
        sound: undefined,
        move: move,
        upgradeShot: upgradeShot,
        createShotgroup: createShotgroup,
        firePlayerShots: firePlayerShots
    };


    function init(game) {

        // The player and its settings
        self.player = game.add.sprite(100, game.world.height - 150, 'ship');

        //  We need to enable physics on the player
        game.physics.arcade.enable(self.player);
        self.player.body.collideWorldBounds = true;

        for (var i = 0; i < shotDesc.length; i++) {
            self.createShotgroup(shotDesc[i], game);
        }
        privateAPI.activeShotDesc = 0;
        self.playerShots = shotDesc[privateAPI.activeShotDesc];

        self.sound = game.add.audio('photonBomb');

        self.player.animations.add('upLeft', [2], 10, true);
        self.player.animations.add('downLeft', [8], 10, true);

        self.player.animations.add('upRight', [1], 10, true);
        self.player.animations.add('downRight', [7], 10, true);

        self.player.animations.add('up', [0], 10, true);
        self.player.animations.add('down', [6], 10, true);

        self.player.animations.add('left', [5], 10, true);
        self.player.animations.add('right', [4], 10, true);
        self.player.visible = true;

    }

    function createShotgroup(shotDesc, game) {

        shotDesc.shotGroup = [];
        for (var i = 0; i < shotDesc.numberOfShots; i++) {
            shotDesc.shotGroup[i] = game.add.group();
            shotDesc.shotGroup[i].enableBody = true;
            shotDesc.shotGroup[i].physicsBodyType = Phaser.Physics.ARCADE;

            shotDesc.shotGroup[i].createMultiple(50, shotDesc.name);
            shotDesc.shotGroup[i].setAll('checkWorldBounds', true);
            shotDesc.shotGroup[i].setAll('outOfBoundsKill', true);
            shotDesc.shotGroup[i].shotSpeed = shotDesc.speed;
            shotDesc.shotGroup[i].numberOfShots = shotDesc.numberOfShots;
            shotDesc.shotGroup[i].fireRate = shotDesc.fireRate;
            shotDesc.shotGroup[i].xPos = shotDesc.xPos[i];
            shotDesc.shotGroup[i].yPos = shotDesc.yPos[i];
            shotDesc.shotGroup.damage = shotDesc.damage;

        }
    }

    function upgradeShot() {
        privateAPI.activeShotDesc++;
        console.log("upgrading shots to nr:" + privateAPI.activeShotDesc);
        console.log('number of shots before:' + self.playerShots.shotGroup.length);
        self.playerShots = shotDesc[privateAPI.activeShotDesc];
        console.log('number of shots after:' + self.playerShots.shotGroup.length);
    }


    function firePlayerShots(game) {
        if (game.time.now > privateAPI.nextFire && self.player.visible) {

            var fireRate = 0;
            // console.log('shooting with number of shots:' + self.playerShots.shotGroup.length);
            for (var i = 0; i < self.playerShots.shotGroup.length; i++) {
                var shotGroup = self.playerShots.shotGroup[i];
                if(shotGroup.countDead() > 0){
                    // console.log('and it exist bullets');
                    fireRate = shotGroup.fireRate;
                    var shot = shotGroup.getFirstDead();
                    shot.reset(self.player.x + shotGroup.xPos, self.player.y + shotGroup.yPos);
                    shot.body.velocity.x = shotGroup.shotSpeed;
                    self.sound.play();
                }
            }

            privateAPI.nextFire = game.time.now + fireRate;

        }
    }


    function move(cursors) {
        //  Reset the players velocity (movement)
        self.player.body.velocity.y = 0;
        self.player.body.velocity.x = 0;

        if (cursors.left.isDown && cursors.up.isDown) {
            //  Move up and left
            self.player.body.velocity.y = -150;
            self.player.body.velocity.x = -150;

            self.player.animations.play('upLeft');
        }
        else if (cursors.left.isDown && cursors.down.isDown) {
            //  Move down and left
            self.player.body.velocity.y = 150;
            self.player.body.velocity.x = -150;

            self.player.animations.play('downLeft');
        }
        else if (cursors.right.isDown && cursors.down.isDown) {
            //  Move down and right
            self.player.body.velocity.y = 150;
            self.player.body.velocity.x = 150;

            self.player.animations.play('downRight');
        }
        else if (cursors.right.isDown && cursors.up.isDown) {
            //  Move up and right
            self.player.body.velocity.y = -150;
            self.player.body.velocity.x = 150;
            self.player.animations.play('upRight');
        }
        else if (cursors.right.isDown) {
            //  Move right
            self.player.body.velocity.x = 150;

            self.player.animations.play('right');
        }
        else if (cursors.left.isDown) {
            //  Move left
            self.player.body.velocity.x = -150;

            self.player.animations.play('left');
        }
        else if (cursors.up.isDown) {
            //  Move up
            self.player.body.velocity.y = -150;

            self.player.animations.play('up');
        }
        else if (cursors.down.isDown) {
            //  Move down
            self.player.body.velocity.y = 150;

            self.player.animations.play('down');
        }
        else {
            //  Stand still
            self.player.animations.stop();

            self.player.frame = 5;
        }
    }

    return self;

}());
