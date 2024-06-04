import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';

// Core Pages
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import LandingPage from './components/pages/LandingPage';
import Dashboard from './components/pages/Dashboard';

// Lazy Loaded Substantial Modules
const WasteManagement = lazy(() => import('./components/pages/WasteManagement'));
const AdvancedAnalytics = lazy(() => import('./components/pages/analytics/AdvancedAnalytics'));
const CommunityHub = lazy(() => import('./components/pages/community/CommunityHub'));
const ResourceCenter = lazy(() => import('./components/pages/education/ResourceCenter'));
const OrgDashboard = lazy(() => import('./frontend/src/pages/organization/OrgDashboard'));
const SettingsPage = lazy(() => import('./frontend/src/pages/settings/SettingsPage'));
const HelpCenter = lazy(() => import('./frontend/src/pages/help/HelpCenter'));
const Profile = lazy(() => import('./components/pages/Profile'));
const SystemLog = lazy(() => import('./components/pages/SystemLog'));

const LoadingFallback = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
    </div>
);

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AppContent: React.FC = () => {
    const { user } = useAuth();
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Routes>
                <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
                <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />

                <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/waste" element={<WasteManagement />} />
                    <Route path="/analytics" element={<AdvancedAnalytics />} />
                    <Route path="/community" element={<CommunityHub />} />
                    <Route path="/education" element={<ResourceCenter />} />
                    <Route path="/organization" element={<OrgDashboard />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/help" element={<HelpCenter />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/log" element={<SystemLog />} />
                </Route>

                <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} />
            </Routes>
        </Suspense>
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
