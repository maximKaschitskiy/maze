import React from "react";

import "./App.css";

import Title from "./Title";
import Popup from "./Popup";
import FieldLayer from "./FieldLayer";
import PlayerLayer from "./PlayerLayer";
import Movments from "./Movments";
import Cursor from "./Cursor";

import generateLevel from "./utils/generateLevel";

function App() {

  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [level, setLevelData] = React.useState([]);
  const [onRun, setOnRun] = React.useState(false);
  const [runAnimation, setRunAnimation] = React.useState(false);

  function closePopups() {
    setIsPopupOpen(false);
    const levelData = generateLevel();
    setLevelData(levelData);
    setRunAnimation(false);
  }

  const handleChangeLevelData = (event) => {
    setLevelData((prev) => ({ ...prev, ...event }));
  };

  const controls = {                    //shift position by directions
    W: (pos) => [pos[0], pos[1] - 1],
    A: (pos) => [pos[0] - 1, pos[1]],
    S: (pos) => [pos[0], pos[1] + 1],
    D: (pos) => [pos[0] + 1, pos[1]],
  };

  const handleMovs = () => {
    let status = true;
    const callback = (value) => (status = value);
    for (let [step, control] of level.movments.movmentsList.entries()) {
      if (status) {
        movier(step, control, callback);
      } else {
        setOnRun(false);
        break;
      }
    }
    setOnRun(true);
  };

  const gameResult = (current, step) => { //calculate win or loose
    switch (true) {
      case step + 1 === level.player.tails.length &&
        JSON.stringify(current) === JSON.stringify(level.finish):
        handleChangeLevelData({
          result: {
            status: "win",
          },
        });
        setTimeout(() => {
          setIsPopupOpen(true);
        }, 500);
        break;
      case step + 1 === level.player.tails.length &&
        JSON.stringify(current) !== JSON.stringify(level.finish):
        handleChangeLevelData({
          result: {
            status: "gameover",
          },
        });
        setTimeout(() => {
          setIsPopupOpen(true);
        }, 500);
        break;
      case current === step:
        handleChangeLevelData({
          result: {
            status: "gameover",
          },
        });
        setTimeout(() => {
          setIsPopupOpen(true);
        }, 500);
        break;
      default:
        return;
    }
  };

  const movier = (step, control, callback) => {
    setRunAnimation(true);
    const next = controls[`${control}`](level.player.current);
    handleChangeLevelData({
      movments: {
        ...level.movments,
        next: next,
      },
    });
    if (
      next.some((elem) => elem < 1) ||
      next[1] > level.field.width ||
      next[0] > level.field.height
    ) {
      callback(false);
    } else {
      level.player.current = next;
      level.player.tails = [...level.player.tails, level.player.current];
      handleChangeLevelData({
        player: {
          current: [...level.player.current],
          tails: level.player.tails,
          unit: [...level.player.unit],
        },
      });
      callback(true);
    }
  };

  React.useMemo(() => {
    const levelData = generateLevel();
    setLevelData(levelData);
  }, []);

  React.useEffect(() => {
    if (onRun) {
      if (level.player.tails.length !== 0) {
        level.player.tails.forEach((element, index) => {
          setTimeout(() => {
            handleChangeLevelData({
              player: {
                current: [...level.player.current],
                tails: [...level.player.tails],
                unit: element,
                stepNo: index,
              },
            });
            if (index + 1 === level.player.tails.length)
              gameResult(element, index);
          }, 500 * index);
        });
        setOnRun(false);
      } else {
        gameResult(0, 0);
        setOnRun(false);
      }
    }
  }, [onRun]);

  return (
    <div className="App">
      <main className="App-main">
        <Title title={"Maze Game"} />
        <Popup isOpen={isPopupOpen} onClose={closePopups} level={level} />
        <Movments
          level={level}
          onChange={(event) => handleChangeLevelData(event)}
          onStart={() => handleMovs()}
          onRun={runAnimation}
        />
        <PlayerLayer level={level} />
        <FieldLayer level={level} />
        <Cursor />
      </main>
    </div>
  );
}

export default App;
