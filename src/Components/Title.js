import React from "react";

function Title({ title }) {

  React.useMemo(() => {
    document.title = title;
  }, []);

  return;
}

export default Title;
