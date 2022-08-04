import getRandomInt from "./getRandom";

const generateLevel = () => {  //init main object with all game values
    const data = {
      player: {
        current: [],
        tails: [],
        unit: [],
        stepNo: null
      },
      start: [],
      finish: [],
      movments: {
        movmentsList: [],
        current: [],
        next: [],
      },
      field: {
        width: getRandomInt(3, 8),
        height: getRandomInt(3, 8),
      },
      animation: {
        shake: false,
        lights: false,
      },
      result: {
        status: "",
        score: null,
      },
    };

    let startPoint = [
      getRandomInt(1, data.field.height),
      getRandomInt(1, data.field.width),
    ];
    let endPoint = [
      getRandomInt(1, data.field.height),
      getRandomInt(1, data.field.width),
    ];

    while (startPoint.every((value, index) => value === endPoint[index])) {
      startPoint = [
        getRandomInt(1, data.field.height),
        getRandomInt(1, data.field.width),
      ];
      endPoint = [
        getRandomInt(1, data.field.height),
        getRandomInt(1, data.field.width),
      ];
    }

    data.player.current = startPoint;
    data.player.unit = startPoint;
    data.start = startPoint;
    data.finish = endPoint;
    return data;
  };

export default generateLevel;