var ENEMY_SERVICE = (function () {

    var privateAPI = {
        game: undefined,
        activeEnemies: undefined
    };

    var service = {
        init: init,
        createEnemy: createEnemy,
        killEnemy: killEnemy
    };

    function init(game) {
        privateAPI.game = game;
    }

    function createEnemy(enemyTemplate) {
        activeEnemies = new Enemy();
        activeEnemies.init(enemyTemplate, privateAPI.game);
        return activeEnemies;
    }

    function killEnemy(enemy, damage, shotPos, enemyHealth){

        var score = 0;
        var killed = false;

        if(activeEnemies.life && activeEnemies.life > 0){
            activeEnemies.life = activeEnemies.life - damage;
            for(var i = 0; i < damage; i++){
                var health = enemyHealth.getFirstAlive();
                if(health){
                    health.kill();
                }
            }
            score += 100;
        }
        if(!activeEnemies.life || activeEnemies.life <= 0){
            enemy.kill();
            killed = true;
            score += 100;
            if(activeEnemies.extraScore){
                score += activeEnemies.extraScore;
            }

        }

        return {
            killed: killed,
            score: score
        };
    }


    return service;

}());
