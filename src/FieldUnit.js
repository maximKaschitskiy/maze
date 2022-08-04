import React from 'react';
import './FieldUnit.css';

function FieldUnit({level, coord}) {

  const start = () => JSON.stringify(level.start) == JSON.stringify(coord) ? "unit_start" : ""
  const finish = () => JSON.stringify(level.finish) == JSON.stringify(coord) ? "unit_finish" : ""

  return (
    <li className={`unit ${start()} ${finish()}`}/>
  );
}

export default FieldUnit;