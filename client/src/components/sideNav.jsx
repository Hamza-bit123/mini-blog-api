import React, { useState } from "react";
import * as Icon from "react-bootstrap-icons";

function SideNav() {
  const [sidenavVisible, setSidenavVisible] = useState(true);
  return (
    <nav className="sideNav">
      <div className="icon--container">
        <div className="top">
          <div className="logo">
            <Icon.PenFill />
          </div>
          <ul className="nav--lists">
            <li className="active">
              <Icon.BarChartLineFill />
            </li>
            <li>
              <Icon.SignpostFill />
            </li>
            <li>
              <Icon.NodePlusFill />
            </li>
          </ul>
        </div>
        <ul className="sidenav-bottom">
          <li>
            <Icon.GearFill />
          </li>
          <li className="sidenav--avator">
            <span>H</span>
          </li>
        </ul>
      </div>
      {sidenavVisible && (
        <div className="content--container">
          <div className="top">
            <div className="logo">Mini Blog</div>
            <ul className="nav--lists">
              <li className="active">Dashboard</li>
              <li>My posts</li>
              <li>Create post</li>
            </ul>
          </div>
          <ul className="sidenav-bottom">
            <li>Settings</li>
            <li>Hamza</li>
          </ul>
        </div>
      )}
      <button
        className={sidenavVisible ? "menu-icon" : "menu-icon open-menu"}
        onClick={() => setSidenavVisible(!sidenavVisible)}
      >
        <Icon.CaretLeftFill size={30} />
      </button>
    </nav>
  );
}

export default SideNav;
