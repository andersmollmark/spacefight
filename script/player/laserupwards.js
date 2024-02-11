class Laserupwards extends Abstractshot {

  static shotDesc =
    [
      {
        name: CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_UP_NAME,
        sound: CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_SOUND,
        speed: -300,
        xPos: [12],
        yPos: [-10],
        shotGroup: undefined,
        fireRate: 300,
        numberOfShots: 1,
        damage: 1
      },
      {
        name: CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_UP_NAME,
        sound: CONSTANT_SERVICE.SHOTS.PLAYER_SHOT_SOUND,
        speed: -300,
        xPos: [2, 17],
        yPos: [-10, -10],
        shotGroup: undefined,
        fireRate: 200,
        numberOfShots: 2,
        damage: 2
      },

    ];

  constructor(game) {
    super(game, Laserupwards.shotDesc);

  }

}
