SPACE_ENEMIES = (function () {

  var enemy1 = {
    numbersAlive: 5,
    explodeName: ALL_ENEMIES.getAllSounds()[0].name,
    startXpos: [850, 830, 800, 830, 850],
    startYpos: [200, 250, 300, 350, 400],
    pictureName: ALL_ENEMIES.getAllPictures()[0].name,
    picturePath: ALL_ENEMIES.getAllPictures()[0].path,
    xSpeed: -100,
    ySpeed: 0,
    numberOfBullets: 30,
    bulletName: ALL_ENEMIES.getAllBullets()[0].name,
    bulletPath: ALL_ENEMIES.getAllBullets()[0].path,
    bulletSpeed: 120,
    firingSpeed: 2000,
    xScale: 0.7,
    yScale: 0.7,
    groupXScale: 0.5,
    groupYScale: 0.5,
    bonus: true,
    stay: false
  };
  var enemy2 = {
    numbersAlive: 5,
    explodeName: ALL_ENEMIES.getAllSounds()[0].name,
    startXpos: [950, 930, 900, 930, 950],
    startYpos: [150, 230, 310, 390, 470],
    pictureName: ALL_ENEMIES.getAllPictures()[1].name,
    picturePath: ALL_ENEMIES.getAllPictures()[1].path,
    xSpeed: -140,
    ySpeed: 0,
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
    startXpos: [950, 1130, 900, 1130, 950],
    startYpos: [150, 230, 310, 390, 470],
    pictureName: ALL_ENEMIES.getAllPictures()[2].name,
    picturePath: ALL_ENEMIES.getAllPictures()[2].path,
    xSpeed: -180,
    ySpeed: 0,
    numberOfBullets: 30,
    bulletName: ALL_ENEMIES.getAllBullets()[1].name,
    bulletPath: ALL_ENEMIES.getAllBullets()[1].path,
    bulletSpeed: 270,
    firingSpeed: 500,
    xScale: 0.25,
    yScale: 0.25 ,
    groupXScale: 0.2,
    groupYScale: 0.2,
    bonus: true,
    stay: false
  };

  var enemy4 = {
    numbersAlive: 5,
    explodeName: ALL_ENEMIES.getAllSounds()[0].name,
    startXpos: [950, 1330, 900, 1330, 1950],
    startYpos: [150, 230, 310, 390, 470],
    pictureName: ALL_ENEMIES.getAllPictures()[3].name,
    picturePath: ALL_ENEMIES.getAllPictures()[3].path,
    xSpeed: -200,
    ySpeed: 0,
    numberOfBullets: 30,
    bulletName: ALL_ENEMIES.getAllBullets()[1].name,
    bulletPath: ALL_ENEMIES.getAllBullets()[1].path,
    bulletSpeed: 300,
    firingSpeed: 500,
    xScale: 0.25,
    yScale: 0.25 ,
    groupXScale: 0.2,
    groupYScale: 0.2,
    bonus: false,
    stay: true,
    timeToStay: 4000
  };

  var boss1 = {
    numbersAlive: 1,
    explodeName: ALL_ENEMIES.getAllSounds()[0].name,
    startXpos: [1430],
    startYpos: [200],
    pictureName: ALL_ENEMIES.getAllPictures()[4].name,
    picturePath: ALL_ENEMIES.getAllPictures()[4].path,
    xSpeed: -200,
    ySpeed: 0,
    numberOfBullets: 0,
    bulletName: ALL_ENEMIES.getAllBullets()[0].name,
    bulletPath: ALL_ENEMIES.getAllBullets()[0].path,
    bulletSpeed: 300,
    firingSpeed: 500,
    xScale: 1,
    yScale: 1,
    groupXScale: 1,
    groupYScale: 1,
    bonus: false,
    bonusLife: true,
    stay: true,
    timeToStay: 50000,
    life: 15,
    extraScore: 2000,
    extraMovement: true,
    stayX: 550,
    moveUpY: 100,
    moveDownY: 300,
    isBoss: true,
    shotX: 0,
    shotY: 100
  };

  var privateAPI = {
    enemyArray: [enemy1, enemy2, enemy3, enemy2, enemy4, boss1  ]
    // enemyArray: [boss1]
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
