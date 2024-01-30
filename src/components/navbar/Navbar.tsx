import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";

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
      <nav className="navbar-nav">
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
      <Outlet />
    </>
  );
};

export default Navbar;
