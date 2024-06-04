import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

const LogoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.5c.943 1.034 2.296 1.5 3.5 1.5s2.557-.466 3.5-1.5" />
    </svg>
);
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const WasteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const ReportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const LogIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const ProfileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>


interface SidebarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const { logout, user } = useAuth();

    const commonLinkClass = "flex items-center px-4 py-2.5 mt-2 text-primary-100 transition-colors duration-300 transform rounded-lg dark:text-slate-300";
    const activeLinkClass = "bg-primary-700 font-semibold dark:bg-primary-600 dark:text-white";
    const inactiveLinkClass = "hover:bg-primary-700 hover:text-white dark:hover:bg-slate-700";

    const getLinkClass = ({ isActive }: { isActive: boolean }) => 
        `${commonLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`;

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-primary-600 dark:bg-slate-800 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-20 px-4 border-b border-primary-700 dark:border-slate-700">
          <div className="flex items-center">
            <LogoIcon />
            <span className="text-white text-2xl mx-2 font-bold">WRS</span>
          </div>
          <button 
            className="text-primary-200 hover:text-white md:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="flex flex-col flex-1 p-4 overflow-y-auto">
          <nav className="flex-1">
            <NavLink to="/dashboard" className={getLinkClass} onClick={() => setIsSidebarOpen(false)}>
              <DashboardIcon /> Dashboard
            </NavLink>
            <NavLink to="/waste" className={getLinkClass} onClick={() => setIsSidebarOpen(false)}>
              <WasteIcon /> Waste Records
            </NavLink>
            <NavLink to="/reports" className={getLinkClass} onClick={() => setIsSidebarOpen(false)}>
              <ReportIcon /> Reports
            </NavLink>
            <NavLink to="/log" className={getLinkClass} onClick={() => setIsSidebarOpen(false)}>
              <LogIcon /> System Log
            </NavLink>
          </nav>
          <div>
            {user && (
              <NavLink to="/profile" className={getLinkClass} onClick={() => setIsSidebarOpen(false)}>
                <ProfileIcon /> Profile
              </NavLink>
            )}
            <ThemeToggle />
            <button onClick={logout} className={`${commonLinkClass} w-full text-left`}>
              <LogoutIcon /> Logout
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;