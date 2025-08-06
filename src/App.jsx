import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Testimonials from "./pages/Testimonials";
import TrainingInfo from "./pages/TrainingInfo";
import Courses from "./pages/Courses";
import Tutorials from "./pages/Tutorials";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthLayout from "./Layout/AuthLayout";
import DashboardLayout from "./Layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLayout />} >
          <Route path="" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
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
