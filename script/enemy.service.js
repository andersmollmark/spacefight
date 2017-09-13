var ENEMY_SERVICE = (function () {

    var privateAPI = {
        game: undefined
    };

    var service = {
        init: init,
        createEnemy: createEnemy
    };

    function init(game) {
        privateAPI.game = game;
    }

    function createEnemy(enemyTemplate) {
        var enemy = new Enemy();
        enemy.init(enemyTemplate, privateAPI.game);
        return enemy;
    }

    return service;

}());
