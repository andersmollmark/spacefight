class Enemygroup {

  constructor(enemytemplate, game) {
    this.me = enemytemplate;
    this.game = game;

    this.group = game.add.group();
    this.group.enableBody = true;
    this.group.physicsBodyType = Phaser.Physics.ARCADE;

    this.numbersAlive = enemytemplate.numbersAlive;
    this.group.setAll('anchor.x', 0.5);
    this.group.setAll('anchor.y', 0.5);
    this.group.setAll('scale.x', enemytemplate.groupXScale);
    this.group.setAll('scale.y', enemytemplate.groupYScale);
    this.group.setAll('outOfBoundsKill', true);
    this.group.setAll('checkWorldBounds', true);

    this.explode = game.add.audio(enemytemplate.explodeName);

    for (var i = 0; i < this.numbersAlive; i++) {
      var tempEnemy = this.group.create(
        enemytemplate.startXpos[i],
        enemytemplate.startYpos[i],
        enemytemplate.pictureName
      );
      tempEnemy.scale.x = enemytemplate.xScale;
      tempEnemy.scale.y = enemytemplate.yScale;
      tempEnemy.body.velocity.x = enemytemplate.xSpeed;
      tempEnemy.body.velocity.y = enemytemplate.ySpeed;
      tempEnemy.name = 'nisse' + i;
      console.log('enemy:' + tempEnemy);
    }

    this.bullets = game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(enemytemplate.numberOfBullets, enemytemplate.bulletName);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
    this.bulletSpeed = enemytemplate.bulletSpeed;
    this.firingSpeed = enemytemplate.firingSpeed;
    this.stay = enemytemplate.stay;
    this.timeToStay = enemytemplate.timeToStay;
    this.life = enemytemplate.life;
    this.damage = enemytemplate.damage;
    this.extraScore = enemytemplate.extraScore;

    this.extraMovement = enemytemplate.extraMovement;
    this.stayX = enemytemplate.stayX;
    this.moveUpY = enemytemplate.moveUpY;
    this.moveDownY = enemytemplate.moveDownY;
  }

  killEnemy(enemy, damage, shotPos, enemyHealth) {
    let killResult = this.killEnemyInGroup(enemy, damage, shotPos, enemyHealth);
    // var explode = this.game.add.sprite(enemy.position.x, enemy.position.y, 'enemyExplosion');
    let explode = this.game.add.sprite(enemy.position.x, shotPos.position.y, 'enemyExplosion');
    explode.anchor.x = 0.5;
    explode.anchor.y = 0.5;
    explode.animations.add('kaboom');
    explode.play('kaboom', 35, false, true);
    // this.explode.play();
    return killResult;
  }

  killEnemyInGroup(enemy, damage, shotPos, enemyHealth){
    var score = 0;
    var killed = false;

    if(this.life && this.life > 0){
      this.life = this.life - damage;
      for(var i = 0; i < damage; i++){
        var health = enemyHealth.getFirstAlive();
        if(health){
          health.kill();
        }
      }
      score += 100;
    }
    if(!this.life || this.life <= 0){
      enemy.kill();
      killed = true;
      score += 100;
      if(this.extraScore){
        score += this.extraScore;
      }

    }

    return {
      killed: killed,
      score: score
    };
  }
}
