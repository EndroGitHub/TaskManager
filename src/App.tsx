import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/trial" element={<Navbar />} />
        <Route path="/" element={<Home />}></Route>

        <Route element={<Navbar />}>
          <Route path="/incomplete-tasks" element={<h1>Incomplete Tasks</h1>} />
          <Route path="/completed-tasks" element={<h1>Completed Tasks</h1>} />
          <Route path="/overdue-tasks" element={<h1>Overdue Tasks</h1>} />
        </Route>

        <Route path="*" element={<h1>Route do not exist</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
