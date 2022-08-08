import React from "react";
import "./Cursor.css";

function Cursor() {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [clicked, setClicked] = React.useState(false);

  React.useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
  }, []);

  const isMobile = () => {
    const ua = navigator.userAgent;
    return /Android|Mobi/i.test(ua);
  };

  if (typeof navigator !== "undefined" && isMobile()) return null;

  const addEventListeners = () => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
  };

  const removeEventListeners = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mousedown", onMouseDown);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const onMouseDown = () => {
    setClicked(true);
  };

  const onMouseUp = () => {
    setClicked(false);
  };

  return (
    <div className={`cursor ${clicked ? `cursor_clicked` : ``}`}
      style={{ 
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}

export default Cursor;
