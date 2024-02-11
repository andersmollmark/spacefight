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
    },
    {
      name: 'enemy1Mars',
      path: 'images/enemyTrans1.png'
    },
    {
      name: 'enemy2Mars',
      path: 'images/enemyTrans2.png'
    },
    {
      name: 'enemy3Mars',
      path: 'images/enemyTrans5.png'
    },
    {
      name: 'enemy4Mars',
      path: 'images/enemyTrans8.png'
    },
    {
      name: 'bossMars',
      path: 'images/bossMars2.png'
    },


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

  var service = {
    getAllPictures: getAllPictures,
    getAllBullets: getAllBullets,
    getAllSounds: getAllSounds
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

  return service;

}());
