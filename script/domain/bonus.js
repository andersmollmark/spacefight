var BONUS = (function () {

    privateAPI = {
        theBonus: undefined
    };

    service = {
        create: create,
        get: get,
        remove: remove
    };

    function create(enemy, game){
        var theBonus = game.add.sprite(enemy.x, enemy.y, 'bonusSprite');
        theBonus.anchor.x = 0.5;
        theBonus.anchor.y = 0.5;
        theBonus.animations.add('bonus');
        theBonus.play('bonus', 30, true, true);
        game.physics.arcade.enable(theBonus);
        theBonus.body.collideWorldBounds = true;

        privateAPI.theBonus = theBonus;
        return theBonus;
    }

    function get(){
        return privateAPI.theBonus;
    }

    function remove(){
        if(privateAPI.theBonus){
            privateAPI.theBonus.kill();
            privateAPI.theBonus = undefined;
        }
    }

    return service;
}());