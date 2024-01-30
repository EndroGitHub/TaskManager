import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/incomplete-tasks" element={<h1>Incomplete Tasks</h1>} />
        <Route path="/completed-tasks" element={<h1>Completed Tasks</h1>} />
        <Route path="/overdue-tasks" element={<h1>Overdue Tasks</h1>} />

        <Route path="*" element={<h1>Route do not exist</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
