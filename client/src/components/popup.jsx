import React from "react";
import "./popup.css";
function Popup({ message }) {
  return (
    <div className="container">
      <p className="message">{message}</p>
    </div>
  );
}

export default Popup;
