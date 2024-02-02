import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import IncompleteTasks from "./components/incomplete tasks/IncompleteTasks";
import CompletedTasks from "./components/completed tasks/CompletedTasks";
import OverdueTasks from "./components/overdue tasks/OverdueTasks";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route element={<Navbar />}>
          <Route path="/incomplete-tasks" element={<IncompleteTasks />} />
          <Route path="/completed-tasks" element={<CompletedTasks />} />
          <Route path="/overdue-tasks" element={<OverdueTasks />} />
        </Route>

        <Route path="*" element={<h1>Route do not exist</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
