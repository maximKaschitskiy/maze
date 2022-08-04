import React from "react";

import "./Popup.css";

import succsessIcon from "./images/success.svg";
import failIcon from "./images/fail.svg";

function Popup({ isOpen, onClose, level }) {

  const statusImage = () => {
    let dataObj = {};
    switch (level.result.status) {
      case "win":
        dataObj = {
            icon: succsessIcon,
            mainMessage: 'You Win',
            altCaption: 'You Win',
        };
        return dataObj;
      case "gameover":
        dataObj = {
            icon: failIcon,
            mainMessage: 'You lost $100',
            altCaption: 'Gameover',
        };
        return dataObj;
      default:
        return '';
    }
  };

  const getStatus = statusImage();

  return (
    <>
      <section
        className={`popup-overlay ${isOpen ? "popup-overlay_active" : ""}`}
        onClick={() => onClose()}
      ></section>
      <section className={`popup ${isOpen ? "popup_active" : ""}`}>
        <div className="popup__window">
          <button
            className="popup__close-button"
            type="button"
            onClick={() => onClose()}
          ></button>
          <div className="popup__content">
            <img
              className="popup__icon popup__icon_state_success-message"
              src={
                getStatus.icon
              }
              alt={
                getStatus.altCaption
              }
            />
            <p className="popup__content-caption">
              {
                getStatus.mainMessage
              }
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Popup;
