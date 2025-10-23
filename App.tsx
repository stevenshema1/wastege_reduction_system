import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import WasteManagement from './components/pages/WasteManagement';
import Reports from './components/pages/Reports';
import Layout from './components/Layout';
import SystemLog from './components/pages/SystemLog';
import Profile from './components/pages/Profile';
import LandingPage from './components/pages/LandingPage';
import ForgotPassword from './components/pages/ForgotPassword';
import ResetPassword from './components/pages/ResetPassword';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AppContent: React.FC = () => {
    const { user } = useAuth();
    return (
        <Routes>
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
            <Route path="/forgot-password" element={user ? <Navigate to="/dashboard" /> : <ForgotPassword />} />
            <Route path="/reset-password" element={user ? <Navigate to="/dashboard" /> : <ResetPassword />} />
            
            <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />

            <Route 
                path="/dashboard" 
                element={
                    <PrivateRoute>
                        <Layout>
                            <Dashboard />
                        </Layout>
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/waste" 
                element={
                    <PrivateRoute>
                        <Layout>
                            <WasteManagement />
                        </Layout>
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/reports" 
                element={
                    <PrivateRoute>
                        <Layout>
                            <Reports />
                        </Layout>
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/log" 
                element={
                    <PrivateRoute>
                        <Layout>
                            <SystemLog />
                        </Layout>
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/profile" 
                element={
                    <PrivateRoute>
                        <Layout>
                            <Profile />
                        </Layout>
                    </PrivateRoute>
                } 
            />
            <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} />
        </Routes>
    )
}

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
          <HashRouter>
              <AppContent />
          </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;