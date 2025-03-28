import "./App.css";
import AuthorizationPage from "./pages/AuthorizationPage";
import NotFound from './pages/NotFound';
import NoAccess from './pages/NoAccess';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Training from './pages/Training';
import Feedback from './pages/Feedback';
import Settings from './pages/Settings';
import AdminDashboard from './pages/admin/Dashboard';
import ModelsManagement from './pages/admin/Models';
import Communications from './pages/admin/Communications';
import Layout from "./components/Layout";
import { useAuth } from './context/AuthContext';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function ProtectedRoute({ children, userOnly = false, adminOnly = false}) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (userOnly && user?.isAdmin === true) {
    return <Navigate to="/admin/" replace />;
  }

  if (adminOnly && user?.isAdmin !== true) {
    return <Navigate to="/admin/*" replace />;
  }

  return <Layout>{children}</Layout>;
}

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthorizationPage />} />

      <Route path="/" element={<ProtectedRoute userOnly><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute userOnly><Profile /></ProtectedRoute>} />
      <Route path="/training" element={<ProtectedRoute userOnly><Training /></ProtectedRoute>} />
      <Route path="/feedback" element={<ProtectedRoute userOnly><Feedback /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute userOnly><Settings /></ProtectedRoute>} />

      <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/models" element={<ProtectedRoute adminOnly><ModelsManagement /></ProtectedRoute>} />
      <Route path="/admin/communications" element={<ProtectedRoute adminOnly><Communications /></ProtectedRoute>} />

      <Route path="/admin/*" element={<NoAccess />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
