import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div 
        className="flex items-center justify-between px-4 py-2.5 mt-2 text-primary-100 transition-colors duration-300 transform rounded-lg dark:text-slate-300 hover:bg-primary-700 hover:text-white dark:hover:bg-slate-700 cursor-pointer" 
        onClick={toggleTheme}
        role="button"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
        <div className="flex items-center">
             {theme === 'light' ? <SunIcon /> : <MoonIcon />}
            <span>
                {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
            </span>
        </div>
         <div className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${theme === 'light' ? 'bg-primary-500' : 'bg-slate-600'}`}>
            <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
        </div>
    </div>
  );
};

export default ThemeToggle;
