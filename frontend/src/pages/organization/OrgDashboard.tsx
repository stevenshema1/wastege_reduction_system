import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import WasteTrendChart from '../../components/charts/WasteTrendChart';

interface Location {
    id: string;
    name: string;
    type: 'Office' | 'Warehouse' | 'Retail';
    wasteScore: number;
    lastAudit: string;
}

const OrgDashboard: React.FC = () => {
    const [locations] = useState<Location[]>([
        { id: '1', name: 'Downtown HQ', type: 'Office', wasteScore: 88, lastAudit: '2023-11-15' },
        { id: '2', name: 'Eastside Logistics', type: 'Warehouse', wasteScore: 65, lastAudit: '2023-11-20' },
        { id: '3', name: 'West End Outlet', type: 'Retail', wasteScore: 92, lastAudit: '2023-11-10' },
    ]);

    const trendData = [
        { label: 'Jul', value: 450 },
        { label: 'Aug', value: 380 },
        { label: 'Sep', value: 410 },
        { label: 'Oct', value: 320 },
        { label: 'Nov', value: 290 },
    ];

    return (
        <div className="p-8 space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Organization Dashboard</h1>
                    <p className="text-gray-500">Managing 3 locations across the region.</p>
                </div>
                <Button variant="secondary" size="lg">Generate Compliance Report</Button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold mb-6">Waste Reduction Trend (Aggregate)</h3>
                    <WasteTrendChart data={trendData} height={300} color="#3B82F6" />
                </div>

                <div className="space-y-6">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800">
                        <h4 className="text-emerald-800 dark:text-emerald-400 font-semibold">Overall Sustainability Score</h4>
                        <div className="mt-4 flex items-baseline">
                            <span className="text-4xl font-bold text-emerald-600">82</span>
                            <span className="ml-2 text-sm text-emerald-500">/ 100</span>
                        </div>
                        <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-500">Great progress! You are in the top 5% of organizations in your sector.</p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                        <h4 className="font-semibold mb-4">Quick Actions</h4>
                        <div className="grid grid-cols-1 gap-3">
                            <Button variant="outline" className="justify-start">Schedule New Audit</Button>
                            <Button variant="outline" className="justify-start">Invite Location Manager</Button>
                            <Button variant="outline" className="justify-start">Configure Waste Alerts</Button>
                        </div>
                    </div>
                </div>
            </div>

            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="font-semibold">Location Performance</h3>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase text-gray-500">
                        <tr>
                            <th className="px-6 py-3">Location Name</th>
                            <th className="px-6 py-3">Type</th>
                            <th className="px-6 py-3">Sustainability Score</th>
                            <th className="px-6 py-3">Last Audit</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {locations.map(loc => (
                            <tr key={loc.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium">{loc.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{loc.type}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${loc.wasteScore}%` }}></div>
                                        </div>
                                        <span className="text-sm font-semibold">{loc.wasteScore}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{loc.lastAudit}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-blue-600 hover:underline text-sm font-medium">View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default OrgDashboard;
