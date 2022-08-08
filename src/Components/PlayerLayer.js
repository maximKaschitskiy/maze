import React from 'react';
import './PlayerLayer.css';

function PlayerLayer({level}) {

  const statusImage = () => {
    let dataObj = {};
    switch (level.result.status) {
      case "win":
        dataObj = {
          styles: 'player_lights'
        };
        return dataObj;
      case "gameover":
        dataObj = {
            styles: 'player_shake'
        };
        return dataObj;
      default:
        return '';
    }
  };

  const getStatus = statusImage();
  
  return (
    <ul className='player-grid' style={{
      gridTemplateColumns: `repeat(${level.field.height}, 5vmax)`,
      gridTemplateRows: `repeat(${level.field.width}, 5vmax)`
     }}>
      <li className={`player ${getStatus.styles}`}
        style={{
          gridColumn: `${level.player.unit[0]}`,
          gridRow: `${level.player.unit[1]}`
         }}
      ></li>
    </ul>
  );
}

export default PlayerLayer;
