MARS_ENEMIES = (function () {

  var enemy1 = {
    numbersAlive: 5,
    explodeName: ALL_ENEMIES.getAllSounds()[0].name,
    startXpos: [70, 170, 270, 370, 470],
    startYpos: [-10, -50, -50, -10, -50],
    pictureName: ALL_ENEMIES.getAllPictures()[5].name,
    picturePath: ALL_ENEMIES.getAllPictures()[5].path,
    xSpeed: 0,
    ySpeed: 50,
    numberOfBullets: 30,
    bulletName: ALL_ENEMIES.getAllBullets()[0].name,
    bulletPath: ALL_ENEMIES.getAllBullets()[0].path,
    bulletSpeed: 120,
    firingSpeed: 2000,
    xScale: 0.2,
    yScale: 0.2,
    groupXScale: 0.5,
    groupYScale: 0.5,
    bonus: true,
    stay: false
  };
  var enemy2 = {
    numbersAlive: 5,
    explodeName: ALL_ENEMIES.getAllSounds()[0].name,
    startXpos: [100, 250, 300, 450, 500],
    startYpos: [-10, -50, -50, -10, -50],
    pictureName: ALL_ENEMIES.getAllPictures()[6].name,
    picturePath: ALL_ENEMIES.getAllPictures()[6].path,
    xSpeed: 0,
    ySpeed: 60,
    numberOfBullets: 30,
    bulletName: ALL_ENEMIES.getAllBullets()[0].name,
    bulletPath: ALL_ENEMIES.getAllBullets()[0].path,
    bulletSpeed: 220,
    firingSpeed: 1000,
    xScale: 0.15,
    yScale: 0.15,
    groupXScale: 0.2,
    groupYScale: 0.2,
    bonus: false,
    stay: false
  };
  var enemy3 = {
    numbersAlive: 5,
    explodeName: ALL_ENEMIES.getAllSounds()[0].name,
    startXpos: [70, 250, 350, 500, 600],
    startYpos: [-10, -100, -50, -100, -10],
    pictureName: ALL_ENEMIES.getAllPictures()[7].name,
    picturePath: ALL_ENEMIES.getAllPictures()[7].path,
    xSpeed: 0,
    ySpeed: 80,
    numberOfBullets: 30,
    bulletName: ALL_ENEMIES.getAllBullets()[0].name,
    bulletPath: ALL_ENEMIES.getAllBullets()[0].path,
    bulletSpeed: 250,
    firingSpeed: 1200,
    xScale: 0.15,
    yScale: 0.15,
    groupXScale: 0.2,
    groupYScale: 0.2,
    bonus: false,
    stay: false
  };
  var enemy4 = {
    numbersAlive: 5,
    explodeName: ALL_ENEMIES.getAllSounds()[0].name,
    startXpos: [100, 250, 300, 450, 500],
    startYpos: [-10, -50, -50, -10, -50],
    pictureName: ALL_ENEMIES.getAllPictures()[8].name,
    picturePath: ALL_ENEMIES.getAllPictures()[8].path,
    xSpeed: 0,
    ySpeed: 60,
    numberOfBullets: 30,
    bulletName: ALL_ENEMIES.getAllBullets()[0].name,
    bulletPath: ALL_ENEMIES.getAllBullets()[0].path,
    bulletSpeed: 220,
    firingSpeed: 1000,
    xScale: 0.35,
    yScale: 0.35,
    groupXScale: 0.3,
    groupYScale: 0.3,
    bonus: false,
    stay: false
  };

  var bossMars = {
    numbersAlive: 1,
    explodeName: ALL_ENEMIES.getAllSounds()[0].name,
    startXpos: [150],
    startYpos: [-100],
    pictureName: ALL_ENEMIES.getAllPictures()[9].name,
    picturePath: ALL_ENEMIES.getAllPictures()[9].path,
    xSpeed: 0,
    ySpeed: 50,
    numberOfBullets: 5,
    bulletName: ALL_ENEMIES.getAllBullets()[0].name,
    bulletPath: ALL_ENEMIES.getAllBullets()[0].path,
    bulletSpeed: 300,
    firingSpeed: 500,
    xScale: 0.5,
    yScale: 0.5,
    groupXScale: 0.5,
    groupYScale: 0.5,
    bonus: false,
    bonusLife: true,
    stay: true,
    timeToStay: 50000,
    life: 15,
    extraScore: 2000,
    extraMovement: true,
    stayY: 100,
    moveUpY: -100,
    moveDownY: 100,
    isBoss: true,
    shotX: 200,
    shotY: 100
  };

  var privateAPI = {
    enemyArray: [enemy1, enemy2, enemy3, enemy4, bossMars]
    // enemyArray: [bossMars]
  };

  var service = {
    getNumberOfEnemies: getNumberOfEnemies,
    getEnemy: getEnemy
  };

  function getEnemy(index) {
    console.log("trying to fetch enemytemplate nr:" + index);
    return privateAPI.enemyArray[index];
  }

  function getNumberOfEnemies() {
    return privateAPI.enemyArray.length;
  }

  return service;

}());
