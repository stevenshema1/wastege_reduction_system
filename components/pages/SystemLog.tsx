import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getLogs } from '../../services/api';
import type { SystemLog } from '../../types';
import { LogActionType } from '../../types';

const LogIcon: React.FC<{ action: LogActionType }> = ({ action }) => {
    const baseClass = "h-10 w-10 p-2 rounded-full flex items-center justify-center";
    let icon;
    let className = "";

    switch (action) {
        case LogActionType.WASTE_ADDED:
            icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>;
            className = "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400";
            break;
        case LogActionType.WASTE_UPDATED:
            icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;
            className = "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400";
            break;
        case LogActionType.WASTE_DELETED:
            icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
            className = "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400";
            break;
        case LogActionType.USER_LOGIN:
            icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>;
            className = "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400";
            break;
        default:
            icon = null;
    }

    return <div className={`${baseClass} ${className}`}>{icon}</div>
};


const SystemLogPage: React.FC = () => {
    const [logs, setLogs] = useState<SystemLog[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchLogs = async () => {
            if (user) {
                setLoading(true);
                const userLogs = await getLogs(user.id);
                setLogs(userLogs);
                setLoading(false);
            }
        };
        fetchLogs();
    }, [user]);

    if (loading) return <div>Loading system logs...</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-slate-200 mb-6">System Activity Log</h2>
            <div className="bg-white dark:bg-slate-800 shadow-xl rounded-lg border border-slate-200 dark:border-slate-700 p-6">
                 {logs.length > 0 ? (
                    <div className="space-y-6">
                        {logs.map(log => (
                            <div key={log.id} className="flex items-start space-x-4">
                                <LogIcon action={log.action} />
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800 dark:text-slate-200">{log.description}</p>
                                    <p className="text-sm text-gray-500 dark:text-slate-400">
                                        {new Date(log.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-slate-400">No system activity has been logged yet.</p>
                        <p className="text-sm text-gray-400 dark:text-slate-500 mt-2">Perform actions like adding or deleting waste to see logs here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SystemLogPage;