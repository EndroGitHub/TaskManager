import { Outlet } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home-outer">
        <div className="home-content">
          <h1>WELCOME TO TASK MANAGER</h1>
          <p>View and manage your tasks online</p>
          <button>START</button>
        </div>
      </div>
    </>
  );
};

export default Home;
