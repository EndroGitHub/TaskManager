import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import IncompleteTasks from "./components/incomplete tasks/IncompleteTasks";
import CustomAlert from "./components/custom components/custom alert/CustomAlert";

const App = () => {
  const cancelFunc = () => {
    console.log("cancel alert");
  };

  const optionFunc = (value: boolean) => {
    if (value) {
      console.log("yes");
    } else {
      console.log("no");
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route
          path="/trial"
          element={
            <CustomAlert
              msg="Due date should be today's or future date"
              type="option"
              optionFunc={optionFunc}
            />
          }
        /> */}
        <Route path="/" element={<Home />}></Route>

        <Route element={<Navbar />}>
          <Route path="/incomplete-tasks" element={<IncompleteTasks />} />
          <Route path="/completed-tasks" element={<h1>Completed Tasks</h1>} />
          <Route path="/overdue-tasks" element={<h1>Overdue Tasks</h1>} />
        </Route>

        <Route path="*" element={<h1>Route do not exist</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
