
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const LogoIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-12 w-12 text-primary-600"} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        <path d="M13 8.41l-1.59-1.59L10 8.24l2.83 2.83 1.41-1.41-2.24-2.25zM15.41 14.59c.78.78.78 2.05 0 2.83s-2.05.78-2.83 0L7 11.83l1.41-1.41L15.41 14.59z"/>
        <path d="M11.5 15a.5.5 0 01-.5-.5v-2a.5.5 0 011 0v2a.5.5 0 01-.5.5z"/>
    </svg>
);
const FeatureIcon = ({ children }: { children: React.ReactNode }) => <div className="p-2 bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-300 rounded-full">{children}</div>;
const DashboardFeatureIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const ReportFeatureIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>;
const TrackFeatureIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setEmailError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setEmailError('Please enter a valid email address.');
        return;
    }

    const success = await login(email, password, rememberMe);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
      <div className="flex w-full max-w-5xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden m-2 sm:m-4">
        {/* Left Side */}
        <div className="hidden md:flex w-1/2 p-10 flex-col justify-between bg-gradient-to-br from-primary-600 to-primary-700 dark:from-slate-800 dark:to-slate-900 text-white">
            <div>
                <div className="flex items-center space-x-3">
                    <LogoIcon className="h-10 w-10 text-white" />
                    <span className="text-3xl font-bold">Wastage Reduction System</span>
                </div>
                <p className="mt-4 text-primary-200 dark:text-slate-400 text-lg">
                    Track. Analyze. Reduce. Make an Impact.
                </p>
            </div>
            <div className="space-y-6">
                <div className="flex items-start space-x-4">
                    <FeatureIcon><DashboardFeatureIcon /></FeatureIcon>
                    <div>
                        <h3 className="font-semibold">Insightful Dashboard</h3>
                        <p className="text-sm text-primary-200 dark:text-slate-400">Visualize your waste patterns at a glance.</p>
                    </div>
                </div>
                 <div className="flex items-start space-x-4">
                    <FeatureIcon><TrackFeatureIcon /></FeatureIcon>
                    <div>
                        <h3 className="font-semibold">Easy Tracking</h3>
                        <p className="text-sm text-primary-200 dark:text-slate-400">Log recycled, reused, and disposed items in seconds.</p>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <FeatureIcon><ReportFeatureIcon /></FeatureIcon>
                    <div>
                        <h3 className="font-semibold">Detailed Reports</h3>
                        <p className="text-sm text-primary-200 dark:text-slate-400">Generate and export comprehensive reports to meet your goals.</p>
                    </div>
                </div>
            </div>
             <p className="text-sm text-primary-300 dark:text-slate-500">&copy; {new Date().getFullYear()} WRS. All rights reserved.</p>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Welcome Back</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Enter your credentials to access your account.</p>

            {error && <p className="mt-4 text-red-600 text-center bg-red-100 p-3 rounded-lg border border-red-200">{error}</p>}
            
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-slate-300">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  required
                  className="w-full px-4 py-3 mt-1 bg-slate-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all dark:bg-slate-700 dark:border-gray-600 dark:text-white dark:placeholder-slate-400"
                  placeholder="you@example.com"
                />
                {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-slate-300">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 mt-1 bg-slate-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all dark:bg-slate-700 dark:border-gray-600 dark:text-white dark:placeholder-slate-400"
                  placeholder="••••••••"
                />
              </div>
               <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-slate-600 dark:border-gray-500" />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-slate-300">Remember me</label>
                    </div>
                    <div className="text-sm">
                        <Link to="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">Forgot your password?</Link>
                    </div>
                </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-300 transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  {loading ? 'Logging in...' : 'Sign In'}
                </button>
              </div>
            </form>
            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400">Or continue with</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
               <button className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"><img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" /> <span className="dark:text-slate-200">Google</span></button>
               <button className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"><img className="h-5 w-5 mr-2 dark:invert" src="https://www.svgrepo.com/show/511384/apple-173.svg" alt="Apple" /> <span className="dark:text-slate-200">Apple</span></button>
            </div>
            <p className="mt-8 text-sm text-center text-gray-600 dark:text-slate-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-primary-600 hover:underline">
                Sign up for free
              </Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
