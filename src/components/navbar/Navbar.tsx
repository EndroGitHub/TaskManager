import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { getTodayDate } from "../Date";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  let value = "";

  if (path === "/incomplete-tasks") {
    value = "INCOMPLETE TASKS";
  }

  if (path === "/completed-tasks") {
    value = "COMPLETED TASKS";
  }

  if (path === "/overdue-tasks") {
    value = "OVERDUE TASKS";
  }

  const [destination, setDestination] = useState<string>(value);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [dateToday, setDateToday] = useState<string>(getTodayDate());

  const changeDestination = (value: number) => {
    if (value === 1) {
      setDestination("INCOMPLETE TASKS");
      navigate("/incomplete-tasks");
    }
    if (value === 2) {
      setDestination("COMPLETED TASKS");
      navigate("/completed-tasks");
    }
    if (value === 3) {
      setDestination("OVERDUE TASKS");
      navigate("/overdue-tasks");
    }
    setShowOptions(false);
  };
  return (
    <>
      {showOptions && (
        <div
          onClick={() => {
            setShowOptions(false);
          }}
          className="navbar-overlay"
        ></div>
      )}
      <nav style={showOptions ? { zIndex: 2 } : {}} className="navbar-nav">
        <div className="navbar-current">
          {destination}
          {showOptions && (
            <span className="navbar-destinatons">
              <p
                onClick={() => {
                  changeDestination(1);
                }}
              >
                INCOMPLETE TASKS
              </p>
              <p
                onClick={() => {
                  changeDestination(2);
                }}
              >
                COMPLETED TASKS
              </p>
              <p
                onClick={() => {
                  changeDestination(3);
                }}
              >
                OVERDUE TASKS
              </p>
            </span>
          )}
        </div>
        <div
          onClick={() => {
            setShowOptions(!showOptions);
          }}
          className={`navbar-arrow ${showOptions ? "up" : "down"}`}
        >{`>`}</div>
      </nav>
      <div className="navbar-date">DATE: {dateToday}</div>
      <Outlet />
    </>
  );
};

export default Navbar;
