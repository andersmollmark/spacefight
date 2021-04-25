var ENEMY_SERVICE = (function () {

    var privateAPI = {
        game: undefined,
        activeEnemies: undefined
    };

    var service = {
        init: init,
        createEnemy: createEnemy,
        killEnemy: killEnemy
        // startNewEnemyGroup: startNewEnemyGroup
    };

    function init(game) {
        privateAPI.game = game;
    }

    // function startNewEnemyGroup(chapterObj) {
    //   chapterObj.enemyTemplate = ALL_ENEMIES.getEnemy(activeEnemyIndex);
    //   chapterObj.enemiesAlive = chapterObj.enemyTemplate.numbersAlive;
    //   chapterObj.activeEnemies = createEnemy(chapterObj);
    //   chapterObj.startNewEnemyGroup = false;
    //
    //   if (chapterObj.activeEnemies.life) {
    //     chapterObj.enemyHealth = privateAPI.game.add.group();
    //     for (var i = 0; i < chapterObj.activeEnemies.life; i++) {
    //       var health = chapterObj.enemyHealth.create(privateAPI.game.world.width - 450 + (5 * i), 520, 'healthIcon');
    //       health.anchor.setTo(0.5, 0.5);
    //       health.scale.x = 0.7;
    //       health.scale.y = 0.7;
    //     }
    //
    //   }
    // }

    function createEnemy(chapterObj) {
        activeEnemies = new Enemy();
        activeEnemies.init(chapterObj, privateAPI.game);
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
