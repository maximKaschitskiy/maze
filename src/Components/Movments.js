import React from "react";
import shortid from "shortid";
import "./Movments.css";

function Movments({ level, onChange, onStart, onRun }) {

  const pushInButton = (index) => (onRun && level.player.stepNo >= index) ? `select-arrows__button_state_used` : ``;

  const arrows = (symbol) => {
    switch (symbol) {
      case "W":
        return "🡅";
      case "A":
        return "🡄";
      case "S":
        return "🡇";
      case "D":
        return "🡆";
      default:
        break;
    }
  };

  const addToList = (event) => level.movments.movmentsList.length <= 10 ?
    onChange({
      movments: {
        movmentsList: [...level.movments.movmentsList, event],
      },
    }) : null;

  return (
    <>
      <div className="movments">
        <div className="controls-panel">
          <div className="select-arrows">
            <button
              className="select-arrows__button"
              onClick={() => addToList("W")}
              disabled={onRun}
            >
              🡅
            </button>
            <button
              className="select-arrows__button"
              onClick={() => addToList("A")}
              disabled={onRun}
            >
              🡄
            </button>
            <button
              className="select-arrows__button"
              onClick={() => addToList("S")}
              disabled={onRun}
            >
              🡇
            </button>
            <button
              className="select-arrows__button"
              onClick={() => addToList("D")}
              disabled={onRun}
            >
              🡆
            </button>
          </div>
          <div className="start-button-wrapper">
            <button className="start-button" 
              onClick={() => onStart()}
              disabled={onRun}
            >
              START
            </button>
          </div>
        </div>
        <div className="arrows-list">
          {level.movments.movmentsList.map((item, index) => (
            <button
              key={shortid.generate()}
              className={`select-arrows__button ${pushInButton(index)}`}
              onClick={(event) =>
                onChange({
                  movments: {
                    movmentsList: level.movments.movmentsList.filter(
                      (_, id) => id !== index
                    ),
                  },
                })
              }
              disabled={onRun}
            >
              {arrows(item)}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Movments;
