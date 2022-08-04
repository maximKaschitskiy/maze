import React from 'react';
import shortid from "shortid";
import './FieldLayer.css';

import FieldUnit from './FieldUnit';

function FieldLayer({level}) {

  const fieldBoard = 
    new Array(level.field.width)
      .fill()
      .map(()=><></>)
      .map((_, index_X) => 
        new Array(level.field.height)
          .fill().map((_, index_Y) => 
            <FieldUnit
              key={shortid.generate()}
              level={level}
              coord={[index_Y + 1, index_X + 1]}
            />
          )
      );

  return (
    <ul className='field-grid' style={{
        gridTemplateColumns: `repeat(${level.field.height}, 5vmax)`,
        gridTemplateRows: `repeat(${level.field.width}, 5vmax)`
      }}>
        {fieldBoard}
    </ul>
  );
}

export default FieldLayer;
