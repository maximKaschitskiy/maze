import React from "react";
import "./Menu.css";

function Title({ title }) {

  React.useMemo(() => {
    document.title = title;
  }, []);

  return;
}

export default Title;
