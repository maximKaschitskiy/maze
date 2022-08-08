import React from "react";
import "./Menu.css";

function Menu({level, onChange}) {

  return (
    <div className="menu">
      <input
        type="number"
        min="3"
        max="10"
        id="width"
        name="width"
        value={level.field.width}
        onChange={(event) =>
            onChange({field: {
                ...level.field,
                [event.target.name]: Number(event.target.value)}
            })
        }
      />
      <input
        type="number"
        min="3"
        max="10"
        id="height"
        name="height"
        value={level.field.height}
        onChange={(event) =>
            onChange({field: {
                ...level.field,
                [event.target.name]: Number(event.target.value)}
            })
        }
      />
    </div>
  );
}

export default Menu;
