class HeroLaser extends Abstractshot {

  static shotDesc =
    [
      {
        name: CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_UP_NAME,
        sound: CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_SOUND,
        speed: 300,
        xPos: [0],
        yPos: [0],
        shotGroup: undefined,
        fireRate: 300,
        numberOfShots: 1,
        damage: 1
      },


    ];

  constructor(game) {
    super(game, HeroLaser.shotDesc);

  }

}
