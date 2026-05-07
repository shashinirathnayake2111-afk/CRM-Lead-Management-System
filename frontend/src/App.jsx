import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LeadList from './pages/LeadList';
import LeadForm from './pages/LeadForm';
import LeadDetail from './pages/LeadDetail';
import Management from './pages/Management';
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
    </div>
  );
  
  return user ? <Layout>{children}</Layout> : <Navigate to="/auth" />;
};

const LandingRedirect = () => {
  const { user, loading } = useAuth();
  const hasVisited = localStorage.getItem('hasVisited');

  if (loading) return null;
  if (user) return <Navigate to="/" />;
  
  // If first time visiting, show signup. If returning, show login.
  return hasVisited ? <Navigate to="/login" /> : <Navigate to="/signup" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<LandingRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/leads" element={<PrivateRoute><LeadList /></PrivateRoute>} />
          <Route path="/management" element={<PrivateRoute><Management /></PrivateRoute>} />
          <Route path="/leads/new" element={<PrivateRoute><LeadForm /></PrivateRoute>} />
          <Route path="/leads/:id" element={<PrivateRoute><LeadDetail /></PrivateRoute>} />
          <Route path="/leads/:id/edit" element={<PrivateRoute><LeadForm /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
