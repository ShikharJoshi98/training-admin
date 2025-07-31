import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Pages from "./pages/Pages";
import Testimonials from "./pages/Testimonials";
import TrainingInfo from "./pages/TrainingInfo";
import Courses from "./pages/Courses";
import Tutorials from "./pages/Tutorials";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Pages />} />
          <Route path="Courses" element={<Courses />} />
          <Route path="Testimonials" element={<Testimonials />} />
          <Route path="TrainingInfo" element={<TrainingInfo />} />
          <Route path="Tutorials" element={<Tutorials />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
