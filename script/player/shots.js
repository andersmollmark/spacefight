var SHOTS = (function () {

    privateAPI = {
        game: game,
        shotDesc: undefined,
        sound: undefined,
        activeShotDescIndex: 0,
        nextFire: 0,
        getActiveShotGroup: _getActiveShotGroup,
        setSound: _setSound
    };

    service = {
        init: init,
        getPlayerShots: getPlayerShots,
        createShotgroup: createShotgroup,
        createShotDescriptions: createShotDescriptions,
        upgradeShot: upgradeShot,
        downgradeShots: downgradeShots,
        fire: fire
    };

    function init(game) {
        privateAPI.game = game;
        service.createShotDescriptions();
        for (var i = 0; i < privateAPI.shotDesc.length; i++) {
            service.createShotgroup(privateAPI.shotDesc[i]);
        }
        privateAPI.setSound();
    }

    function getPlayerShots(){
        return privateAPI.shotDesc[privateAPI.activeShotDescIndex];
    }

    function createShotgroup(shotDesc) {
        shotDesc.shotGroup = [];
        for (var i = 0; i < shotDesc.numberOfShots; i++) {
            shotDesc.shotGroup[i] = privateAPI.game.add.group();
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

    function createShotDescriptions() {
        privateAPI.shotDesc = [
            {
                name: CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_NAME,
                sound: CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_SOUND,
                speed: 300,
                xPos: [40],
                yPos: [10],
                shotGroup: undefined,
                fireRate: 300,
                numberOfShots: 1,
                damage: 1
            },
            {
                name: CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_UPGRADE_1_NAME,
                sound: CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_SOUND,
                speed: 500,
                xPos: [40],
                yPos: [10],
                shotGroup: undefined,
                fireRate: 200,
                numberOfShots: 1,
                damage: 2
            },
            {
                name: CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_UPGRADE_2_NAME,
                sound: CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_SOUND,
                speed: 500,
                xPos: [40, 40],
                yPos: [25, 5],
                shotGroup: undefined,
                fireRate: 200,
                numberOfShots: 2,
                damage: 2
            },
            {
                name: CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_UPGRADE_3_NAME,
                sound: CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_3_SOUND,
                speed: 500,
                xPos: [40],
                yPos: [3],
                shotGroup: undefined,
                fireRate: 200,
                numberOfShots: 1,
                damage: 6
            }
        ];
    }

    function upgradeShot() {
        var newShotLevel = privateAPI.activeShotDescIndex + 1;
        console.log("try to upgrade shots to nr:" + newShotLevel);
        if(newShotLevel < privateAPI.shotDesc.length) {
            privateAPI.activeShotDescIndex++;
            console.log("upgrading shots to nr:" + privateAPI.activeShotDescIndex);
            privateAPI.setSound();
        }
        return privateAPI.getActiveShotGroup();
    }

    function downgradeShots(){
        if(privateAPI.activeShotDescIndex > 0){
            privateAPI.activeShotDescIndex--;
            privateAPI.setSound();
        }
        return privateAPI.getActiveShotGroup();
    }

    function _getActiveShotGroup(){
        return privateAPI.shotDesc[privateAPI.activeShotDescIndex];
    }

    function _setSound(){
        privateAPI.sound = privateAPI.game.add.audio(privateAPI.getActiveShotGroup().sound);
    }

    function fire(player) {
        if (privateAPI.game.time.now > privateAPI.nextFire && player.visible) {

            var activeShots = privateAPI.shotDesc[privateAPI.activeShotDescIndex];
            var fireRate = 0;
            for (var i = 0; i < activeShots.shotGroup.length; i++) {
                var shotGroup = activeShots.shotGroup[i];
                if(shotGroup.countDead() > 0){
                    fireRate = shotGroup.fireRate;
                    var shot = shotGroup.getFirstDead();
                    shot.reset(player.x + shotGroup.xPos, player.y + shotGroup.yPos);
                    shot.body.velocity.x = shotGroup.shotSpeed;
                    privateAPI.sound.play();
                }
            }

            privateAPI.nextFire = privateAPI.game.time.now + fireRate;
        }
    }

    return service;

}());