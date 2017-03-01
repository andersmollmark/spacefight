var PLAYER = (function () {

    var self = {
        init: init,
        player: undefined,
        playerShots: undefined,
        sound: undefined
    };


    function init(game){

        // The player and its settings
        self.player = game.add.sprite(100, game.world.height - 150, 'ship');

        //  We need to enable physics on the player
        game.physics.arcade.enable(self.player);
        self.player.body.collideWorldBounds = true;

        self.playerShots = game.add.group();
        self.playerShots.enableBody = true;
        self.playerShots.physicsBodyType = Phaser.Physics.ARCADE;

        self.playerShots.createMultiple(50, 'playerShot');
        self.playerShots.setAll('checkWorldBounds', true);
        self.playerShots.setAll('outOfBoundsKill', true);

        self.sound = game.add.audio('photonBomb');

        self.player.animations.add('upLeft', [2], 10, true);
        self.player.animations.add('downLeft', [8], 10, true);

        self.player.animations.add('upRight', [1], 10, true);
        self.player.animations.add('downRight', [7], 10, true);

        self.player.animations.add('up', [0], 10, true);
        self.player.animations.add('down', [6], 10, true);

        self.player.animations.add('left', [5], 10, true);
        self.player.animations.add('right', [4], 10, true);
    }

    function test() {
        console.log("funkis");
    }

    return self;

}());
