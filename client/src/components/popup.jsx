import React from "react";
import "./popup.css";
function Popup({ message }) {
  return (
    <div className={message?.type == "error" ? "error" : "container"}>
      <p className="message">{message?.value}</p>
    </div>
  );
}

export default Popup;
