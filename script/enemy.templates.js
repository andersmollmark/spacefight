ALL_ENEMIES = (function () {

    var allPictures = [
        {
            name: 'enemy1',
            path: 'images/enemy1small.png'
        },
        {
            name: 'enemy2',
            path: 'images/enemy2.png'
        },
        {
            name: 'enemy3',
            path: 'images/enemy3_small.png'
        },
        {
            name: 'enemy4',
            path: 'images/enemy4.png'
        },
        {
            name: 'boss1',
            path: 'images/boss1.png'
        }


    ];

    var allBullets = [
        {
            name: 'enemyBullet',
            path: 'images/enemyBullet1.png'
        },
        {
            name: 'enemyBullet3',
            path: 'images/enemyBullet3.png'
        }
    ];

    var allSounds = [
        {
            name: 'enemyExplode',
            path: 'audio/enemyExplode.wav'
        }
    ];

    var enemy1 = {
        numbersAlive: 5,
        explodeName: allSounds[0].name,
        startXpos: [850, 830, 800, 830, 850],
        startYpos: 200,
        yDistance: 50,
        pictureName: allPictures[0].name,
        picturePath: allPictures[0].path,
        xSpeed: -100,
        numberOfBullets: 30,
        bulletName: allBullets[0].name,
        bulletPath: allBullets[0].path,
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
        explodeName: allSounds[0].name,
        startXpos: [950, 930, 900, 930, 950],
        startYpos: 150,
        yDistance: 80,
        pictureName: allPictures[1].name,
        picturePath: allPictures[1].path,
        xSpeed: -140,
        numberOfBullets: 30,
        bulletName: allBullets[0].name,
        bulletPath: allBullets[0].path,
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
        explodeName: allSounds[0].name,
        startXpos: [950, 1130, 900, 1130, 950],
        startYpos: 150,
        yDistance: 80,
        pictureName: allPictures[2].name,
        picturePath: allPictures[2].path,
        xSpeed: -180,
        numberOfBullets: 30,
        bulletName: allBullets[1].name,
        bulletPath: allBullets[1].path,
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
        explodeName: allSounds[0].name,
        startXpos: [950, 1330, 900, 1330, 1950],
        startYpos: 150,
        yDistance: 80,
        pictureName: allPictures[3].name,
        picturePath: allPictures[3].path,
        xSpeed: -200,
        numberOfBullets: 30,
        bulletName: allBullets[1].name,
        bulletPath: allBullets[1].path,
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
        explodeName: allSounds[0].name,
        startXpos: [1430],
        startYpos: 250,
        yDistance: 50,
        pictureName: allPictures[4].name,
        picturePath: allPictures[4].path,
        xSpeed: -200,
        numberOfBullets: 30,
        bulletName: allBullets[0].name,
        bulletPath: allBullets[0].path,
        bulletSpeed: 300,
        firingSpeed: 500,
        xScale: 1,
        yScale: 1,
        groupXScale: 1,
        groupYScale: 1,
        bonus: false,
        stay: true,
        timeToStay: 50000,
        life: 80,
        extraScore: 2000
    };

    //
    // var privateAPI = {
    //     enemyArray: [enemy1, enemy2, enemy3, enemy2, enemy4, boss1]
    // };

    var privateAPI = {
        enemyArray: [enemy1, enemy3, boss1]
    };

    var service = {
        getAllPictures: getAllPictures,
        getAllBullets: getAllBullets,
        getAllSounds: getAllSounds,
        getEnemy: getEnemy,
        getNumberOfEnemies: privateAPI.enemyArray.length
    };

    function getAllPictures() {
        return allPictures;
    }

    function getAllBullets() {
        return allBullets;
    }

    function getAllSounds() {
        return allSounds;
    }

    function getEnemy(index) {
        console.log("trying to fetch enemytemplate nr:" + index);
        return privateAPI.enemyArray[index];
    }

    return service;

}());
