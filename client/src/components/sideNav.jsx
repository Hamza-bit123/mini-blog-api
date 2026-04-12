import React, { useContext, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/userContext";
import "./sideNav.css";
function SideNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidenavVisible, setSidenavVisible] = useState(true);
  const { user } = useContext(UserContext);
  const [dark, setDark] = useState(true);

  console.log(user?.role);
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
                location.pathname.includes("dashboard") ||
                location.pathname.includes("admin")
                  ? "active"
                  : ""
              }
              onClick={() => {
                navigate("/");
              }}
            >
              <Icon.BarChartLineFill />
            </li>
            <li
              className={location.pathname === "/posts" ? "active" : ""}
              onClick={() => {
                navigate("/posts");
              }}
            >
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
            {user?.role === "admin" && (
              <li
                className={
                  location.pathname === "/posts/management" ? "active" : ""
                }
                onClick={() => {
                  navigate("/posts/management");
                }}
              >
                <Icon.PersonWorkspace />
              </li>
            )}
            {/* {user?.role === "admin" && (
              <li
                className={
                  location.pathname === "/admin/userManagement" ? "active" : ""
                }
              >
                <Icon.PersonBoundingBox />
              </li>
            )} */}

            <li
              className={location.pathname === "/posts/create" ? "active" : ""}
              onClick={() => {
                navigate("/posts/create");
              }}
            >
              <Icon.NodePlusFill />
            </li>
          </ul>
        </div>
        <ul className="sidenav-bottom">
          <li
            onClick={() => {
              setDark(!dark);
            }}
          >
            {dark ? (
              <Icon.SunFill color="yellow" />
            ) : (
              <Icon.MoonFill color="yellow" />
            )}
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
                  location.pathname.includes("dashboard") ||
                  location.pathname.includes("admin")
                    ? "active"
                    : ""
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
              {user?.role === "admin" && (
                <li
                  onClick={() => {
                    navigate("/posts/management");
                  }}
                  className={
                    location.pathname === "/posts/management" ? "active" : ""
                  }
                >
                  Posts Management
                </li>
              )}
              {/* {user?.role === "admin" && (
                <li
                  onClick={() => {
                    navigate("/admin/userManagement");
                  }}
                  className={
                    location.pathname === "/admin/userManagement"
                      ? "active"
                      : ""
                  }
                >
                  Users Management
                </li>
              )} */}

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
            <li></li>
            <li>{user?.username}</li>
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
