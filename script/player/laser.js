class Laser extends Abstractshot {

  static shotDesc =
    [
      {
        name: CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_NAME,
        sound: CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_SOUND,
        speed: 300,
        xPos: [40],
        yPos: [10],
        shotGroup: undefined,
        fireRate: 300,
        numberOfShots: 1,
        damage: 1
      },
      {
        name: CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_UPGRADE_1_NAME,
        sound: CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_SOUND,
        speed: 300,
        xPos: [40, 40],
        yPos: [25, 5],
        shotGroup: undefined,
        fireRate: 200,
        numberOfShots: 2,
        damage: 2
      },
      {
        name: CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_UPGRADE_2_NAME,
        sound: CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_SOUND,
        speed: 500,
        xPos: [40, 40],
        yPos: [25, 5],
        shotGroup: undefined,
        fireRate: 200,
        numberOfShots: 2,
        damage: 3
      },
      {
        name: CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_UPGRADE_3_NAME,
        sound: CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_3_SOUND,
        speed: 500,
        xPos: [40],
        yPos: [3],
        shotGroup: undefined,
        fireRate: 200,
        numberOfShots: 1,
        damage: 6
      }
    ];

  constructor(game) {
    super(game, Laser.shotDesc);

  }

}
