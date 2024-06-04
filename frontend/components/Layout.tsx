
import React, { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../contexts/AuthContext';

const DefaultAvatar: React.FC<{ username: string; className?: string }> = ({ username, className }) => {
    const initial = username ? username.charAt(0).toUpperCase() : '?';
    return (
        <div className={`flex items-center justify-center bg-primary-500 text-white rounded-full ${className} font-semibold`}>
            <span>{initial}</span>
        </div>
    );
};

const WelcomeMessage: React.FC = () => {
    const { user } = useAuth();
    if (!user) return null;

    return (
        <div className="hidden sm:flex items-center space-x-3">
            <span className="text-gray-600 dark:text-slate-400 text-sm">Welcome back, <span className="font-semibold">{user.username}</span>!</span>
            {user.profile_picture_url ? (
                <img src={user.profile_picture_url} alt="Profile" className="w-9 h-9 rounded-full object-cover" />
            ) : (
                <DefaultAvatar username={user.username} className="w-9 h-9 text-sm" />
            )}
        </div>
    );
};

const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>


const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen md:flex">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center">
            <button 
              className="text-gray-500 focus:outline-none md:hidden mr-4"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Open sidebar"
            >
              <MenuIcon />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-slate-200">Wastage Reduction System</h1>
          </div>
          <WelcomeMessage />
        </header>
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;