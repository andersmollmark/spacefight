var EXTRA_LIFE = (function () {

    privateAPI = {
        theExtraLife: undefined
    };

    service = {
        create: create,
        get: get,
        remove: remove
    };

    function create(enemy, game){
        var extraLife = game.add.sprite(enemy.x, enemy.y, 'bonusLife');
        extraLife.anchor.x = 0.5;
        extraLife.anchor.y = 0.5;
        extraLife.animations.add('extraLife');
        extraLife.play('extraLife', 30, true, true);
        game.physics.arcade.enable(extraLife);
        extraLife.body.collideWorldBounds = true;

        privateAPI.theExtraLife = extraLife;
        return extraLife;
    }

    function get(){
        return privateAPI.theExtraLife;
    }

    function remove(){
        if(privateAPI.theExtraLife){
            privateAPI.theExtraLife.kill();
            privateAPI.theExtraLife = undefined;
        }
    }

    return service;
}());