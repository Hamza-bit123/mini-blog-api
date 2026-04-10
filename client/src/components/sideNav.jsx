import React, { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function SideNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidenavVisible, setSidenavVisible] = useState(true);

  return (
    <nav className="sideNav">
      <div className="icon--container">
        <div className="top">
          <div className="logo">
            <Icon.PenFill />
          </div>
          <ul className="nav--lists">
            <li
              className={
                location.pathname.includes("dashboard") ? "active" : ""
              }
            >
              <Icon.BarChartLineFill />
            </li>
            <li className={location.pathname === "/posts" ? "active" : ""}>
              <Icon.Signpost2Fill />
            </li>

            <li
              className={location.pathname === "/posts/me" ? "active" : ""}
              onClick={() => {
                navigate("/posts/me");
              }}
            >
              <Icon.SignpostFill />
            </li>
            <li
              className={location.pathname === "/posts/create" ? "active" : ""}
            >
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
              <li
                className={
                  location.pathname.includes("dashboard") ? "active" : ""
                }
                onClick={() => {
                  navigate("/");
                }}
              >
                Dashboard
              </li>
              <li
                className={location.pathname === "/posts" ? "active" : ""}
                onClick={() => {
                  navigate("/posts");
                }}
              >
                Posts
              </li>

              <li
                className={location.pathname === "/posts/me" ? "active" : ""}
                onClick={() => {
                  navigate("/posts/me");
                }}
              >
                My posts
              </li>
              <li
                className={
                  location.pathname === "/posts/create" ? "active" : ""
                }
                onClick={() => {
                  navigate("posts/create");
                }}
              >
                Create post
              </li>
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
        <Icon.CaretLeftFill size={30} color="white" />
      </button>
    </nav>
  );
}

export default SideNav;
