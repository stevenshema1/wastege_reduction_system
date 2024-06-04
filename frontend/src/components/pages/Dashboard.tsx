
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Waste } from '../../types';
import { WasteStatus } from '../../types';
import { getWastes } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const TotalWasteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>;
const RecycledIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>;
const ReusedIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M5.5 9.5a7 7 0 107 7" /></svg>;
const TargetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;


const StatusActivityIcon: React.FC<{status: WasteStatus}> = ({ status }) => {
    switch (status) {
        case WasteStatus.Recycled: return <div className="p-2 bg-blue-100 rounded-full"><RecycledIcon /></div>;
        case WasteStatus.Reused: return <div className="p-2 bg-yellow-100 rounded-full"><ReusedIcon /></div>;
        case WasteStatus.Disposed: return <div className="p-2 bg-red-100 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></div>;
        default: return null;
    }
}

const DashboardCard: React.FC<{ title: string; value: string; icon: React.ReactNode; children?: React.ReactNode }> = ({ title, value, icon, children }) => (
  <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">{icon}</div>
        <div>
            <h3 className="text-lg font-medium text-gray-500 dark:text-slate-400">{title}</h3>
            <p className="text-3xl font-bold text-gray-800 dark:text-slate-100 mt-1">{value}</p>
        </div>
    </div>
    {children}
  </div>
);

const Dashboard: React.FC = () => {
  const [wastes, setWastes] = useState<Waste[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchWastes = async () => {
      if (user) {
        setLoading(true);
        const userWastes = await getWastes(user.id);
        setWastes(userWastes.sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
        setLoading(false);
      }
    };
    fetchWastes();
  }, [user]);

  if (loading) return <div className="text-center p-8">Loading dashboard...</div>;

  const totalWaste = wastes.reduce((sum, item) => sum + item.quantity, 0);
  const recycledWaste = wastes
    .filter((w) => w.status === WasteStatus.Recycled)
    .reduce((sum, item) => sum + item.quantity, 0);
  const reusedWaste = wastes
    .filter((w) => w.status === WasteStatus.Reused)
    .reduce((sum, item) => sum + item.quantity, 0);
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyWaste = wastes
      .filter(w => {
          const wasteDate = new Date(w.created_at);
          return wasteDate.getMonth() === currentMonth && wasteDate.getFullYear() === currentYear;
      })
      .reduce((sum, item) => sum + item.quantity, 0);

  const monthlyTarget = user?.monthly_target || 0;
  const progress = monthlyTarget > 0 ? Math.min((monthlyWaste / monthlyTarget) * 100, 100) : 0;


  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-slate-200 mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/waste">
            <DashboardCard title="Total Waste Recorded" value={`${totalWaste.toFixed(2)} units`} icon={<TotalWasteIcon />} />
        </Link>
        <Link to={`/waste?status=${WasteStatus.Recycled}`}>
            <DashboardCard title="Total Waste Recycled" value={`${recycledWaste.toFixed(2)} units`} icon={<RecycledIcon />} />
        </Link>
        <Link to={`/waste?status=${WasteStatus.Reused}`}>
            <DashboardCard title="Total Waste Reused" value={`${reusedWaste.toFixed(2)} units`} icon={<ReusedIcon />} />
        </Link>
        <DashboardCard title="Monthly Target Progress" value={`${monthlyWaste.toFixed(2)} / ${monthlyTarget} kg`} icon={<TargetIcon />}>
             <div className="mt-4">
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-right text-sm font-medium text-purple-800 dark:text-purple-400 mt-1">{progress.toFixed(0)}% Complete</p>
            </div>
        </DashboardCard>
      </div>
       <div className="mt-8 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
         <h3 className="text-xl font-semibold text-gray-700 dark:text-slate-300">Recent Activity</h3>
         {wastes.length > 0 ? (
            <div className="mt-4 space-y-4">
                {wastes.slice(0, 5).map(waste => (
                    <div key={waste.id} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg flex justify-between items-center transition-all hover:bg-slate-100 dark:hover:bg-slate-700">
                        <div className="flex items-center space-x-4">
                           <StatusActivityIcon status={waste.status} />
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-slate-200">{waste.type} - <span className="font-normal text-gray-600 dark:text-slate-400">{waste.quantity} {waste.unit}</span></p>
                                <p className="text-sm text-gray-500 dark:text-slate-400">{waste.location} &bull; {new Date(waste.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <span className={`capitalize px-3 py-1 text-sm font-semibold rounded-full ${
                            waste.status === 'recycled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' :
                            waste.status === 'reused' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                        }`}>{waste.status}</span>
                    </div>
                ))}
            </div>
         ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-slate-400">No recent waste records found.</p>
              <p className="text-sm text-gray-400 dark:text-slate-500 mt-2">Add a new record to get started!</p>
            </div>
         )}
       </div>
    </div>
  );
};

export default Dashboard;