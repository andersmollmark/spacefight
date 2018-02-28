var PLAYER = (function () {

    var privateAPI = {
        nextFire: 0,
        immortalTimeout: undefined,
        blinkTimeout: undefined,
        explodingTimeout: undefined,
        setImmortal: _setImmortal,
        resetPlayer: _resetPlayer,
        blinkPlayer: _blinkPlayer,
        immortal: false,
        CONSTANT_SERVICE: undefined,
        prepareForNewChapter: false,
        createNewPlayer: _createNewPlayer
    };

    var self = {
        init: init,
        player: undefined,
        playerShots: undefined,
        move: move,
        upgradeShot: upgradeShot,
        firePlayerShots: firePlayerShots,
        isTemporaryImmortal: isTemporaryImmortal,
        setTemporaryImmortal: setTemporaryImmortal,
        setVisible: setVisible,
        isVisible: isVisible,
        resetPlayerForNewChapter: resetPlayerForNewChapter
    };


    function init(game, CONSTANT_SERVICE) {

        privateAPI.CONSTANT_SERVICE = CONSTANT_SERVICE;

        // The player and its settings
        self.player = game.add.sprite(100, game.world.height - 150, 'ship');

        //  We need to enable physics on the player
        game.physics.arcade.enable(self.player);
        self.player.body.collideWorldBounds = true;

        SHOTS.init(game);
        self.playerShots = SHOTS.getPlayerShots();

        // TODO fix more generic adding of animations
        self.player.animations.add('upLeft', [2], 10, true);
        self.player.animations.add('downLeft', [8], 10, true);

        self.player.animations.add('upRight', [1], 10, true);
        self.player.animations.add('downRight', [7], 10, true);

        self.player.animations.add('up', [0], 10, true);
        self.player.animations.add('down', [6], 10, true);

        self.player.animations.add('left', [5], 10, true);
        self.player.animations.add('right', [4], 10, true);

    }

    function upgradeShot() {
        console.log('number of shots before:' + self.playerShots.shotGroup.length);
        self.playerShots = SHOTS.upgradeShot();
        console.log('number of shots after:' + self.playerShots.shotGroup.length);
    }


    function firePlayerShots() {
        SHOTS.fire(self.player);
    }


    function move(cursors) {
        if(!privateAPI.prepareForNewChapter){
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
    }

    function setTemporaryImmortal(explodingTime){
        privateAPI.setImmortal(true);
        self.player.visible = false;
        privateAPI.explodingTimeout = window.setTimeout(function () {
            privateAPI.createNewPlayer();
        }, explodingTime);
    }

    function resetPlayerForNewChapter(){
        privateAPI.prepareForNewChapter = true;
        privateAPI.resetPlayer();
    }

    function _createNewPlayer(){
        privateAPI.resetPlayer();
        privateAPI.immortalTimeout = window.setTimeout(function () {
            window.clearTimeout(privateAPI.blinkTimeout);
            privateAPI.blinkTimeout = undefined;
            self.player.visible = true;
            privateAPI.setImmortal(false);
            privateAPI.immortalTimeout = undefined;
        }, 2000);

        self.playerShots = SHOTS.downgradeShots();
        privateAPI.blinkPlayer();

    }

    function _resetPlayer(){
        self.player.x = 50;
        self.player.y = 250;
        self.player.body.velocity.x = 0;
        self.player.body.velocity.y = 0;
    }

    function _blinkPlayer(){
        privateAPI.blinkTimeout = window.setTimeout(function () {
            self.player.visible = !self.player.visible;
            privateAPI.blinkPlayer();
        }, 100);
    }

    function _setImmortal(immortal){
        privateAPI.immortal = immortal;
    }

    function setVisible(visible){
        self.player.visible = visible;
    }

    function isVisible(){
        return self.player.visible;
    }

    function isTemporaryImmortal() {
        return !self.player.visible || privateAPI.immortal;
    }



    return self;

}());
