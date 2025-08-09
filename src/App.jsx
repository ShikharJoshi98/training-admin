import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Testimonials from "./pages/Testimonials";
import TrainingInfo from "./pages/TrainingInfo";
import Courses from "./pages/Courses";
import Tutorials from "./pages/Tutorials";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthLayout from "./Layout/AuthLayout";
import DashboardLayout from "./Layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import authStore from "./store/authStore";
import { Children, useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const isCheckingAuth = authStore((state) => state.isCheckingAuth);

  if (isCheckingAuth) return <LoadingSpinner />;

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const isCheckingAuth = authStore((state) => state.isCheckingAuth);

  if (isCheckingAuth) return <LoadingSpinner />;

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return children;
};


function App() {
  const checkAuth = authStore((state) => state.checkAuth);
  const isCheckingAuth = authStore((state) => state.isCheckingAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if (isCheckingAuth) {
    return <LoadingSpinner />
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLayout />} >
          <Route path="" element={<RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser>} />
          <Route path="/register" element={<RedirectAuthenticatedUser><Register /></RedirectAuthenticatedUser>} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="Courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
          <Route path="Testimonials" element={<ProtectedRoute><Testimonials /></ProtectedRoute>} />
          <Route path="TrainingInfo" element={<ProtectedRoute><TrainingInfo /></ProtectedRoute>} />
          <Route path="Tutorials" element={<ProtectedRoute><Tutorials /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
