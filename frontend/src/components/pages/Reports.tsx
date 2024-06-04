
import React, { useState, useEffect, useRef } from 'react';
import type { Waste } from '../../types';
import { WasteStatus } from '../../types';
import { getWastes } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ExportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;

const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0];
        return (
            <div className="p-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-xl text-sm">
                <p className="font-bold text-slate-800 dark:text-slate-100 mb-1" style={{ color: data.payload.fill }}>{data.name}</p>
                <p className="text-slate-600 dark:text-slate-300">
                    <span className="font-semibold">Quantity:</span> {Number(data.value).toFixed(2)} units
                </p>
                 <p className="text-slate-600 dark:text-slate-300">
                    <span className="font-semibold">Share:</span> {(data.percent * 100).toFixed(0)}%
                </p>
            </div>
        );
    }
    return null;
};

const Reports: React.FC = () => {
    const [wastes, setWastes] = useState<Waste[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const { theme } = useTheme();
    const reportRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const fetchWastes = async () => {
            if (user) {
                setLoading(true);
                const userWastes = await getWastes(user.id);
                setWastes(userWastes);
                setLoading(false);
            }
        };
        fetchWastes();
    }, [user]);

    const handleExportPDF = () => {
        const input = reportRef.current;
        if (input) {
            html2canvas(input, { 
                scale: 2,
                backgroundColor: theme === 'dark' ? '#1E293B' : '#FFFFFF',
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save("waste_report.pdf");
            });
        }
    };


    if (loading) return <div>Loading reports...</div>;

    const COLORS = {
        [WasteStatus.Recycled]: '#3B82F6', // blue
        [WasteStatus.Reused]: '#F59E0B', // amber
        [WasteStatus.Disposed]: '#EF4444', // red
    };

    const statusData = Object.values(WasteStatus).map(status => ({
        name: status.charAt(0).toUpperCase() + status.slice(1),
        value: wastes.filter(w => w.status === status).reduce((sum, item) => sum + item.quantity, 0),
        fill: COLORS[status],
    })).filter(item => item.value > 0);

    const categoryData = wastes.reduce((acc, waste) => {
        const existing = acc.find(item => item.name === waste.category);
        if (existing) {
            existing.quantity += waste.quantity;
        } else {
            acc.push({ name: waste.category, quantity: waste.quantity });
        }
        return acc;
    }, [] as { name: string; quantity: number }[]).sort((a,b) => b.quantity - a.quantity);
    
    const tickColor = theme === 'dark' ? '#94a3b8' : '#334155';
    const legendColor = theme === 'dark' ? '#cbd5e1' : '#334155';

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-slate-200">Reports</h2>
                <button onClick={handleExportPDF} className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                    <ExportIcon /> Export to PDF
                </button>
            </div>
            
            <div ref={reportRef} className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700">
                 <h3 className="text-2xl font-bold text-gray-700 dark:text-slate-200 mb-6 text-center">Waste Analysis Report</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg shadow-inner bg-slate-50 dark:bg-slate-800/50">
                        <h4 className="text-lg font-semibold text-center mb-4 text-slate-700 dark:text-slate-300">Waste by Status (in units)</h4>
                        {statusData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie 
                                  data={statusData} 
                                  cx="50%" 
                                  cy="50%" 
                                  labelLine={false} 
                                  label={{ fill: '#fff', fontSize: 14 }}
                                  outerRadius={110} 
                                  dataKey="value"
                                >
                                    {statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                                </Pie>
                                <Tooltip content={<CustomPieTooltip />} />
                                <Legend wrapperStyle={{ color: legendColor }} />
                            </PieChart>
                        </ResponsiveContainer>
                        ) : <p className="text-center text-gray-500 py-24">No data available for status chart.</p>}
                    </div>
                    <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg shadow-inner bg-slate-50 dark:bg-slate-800/50">
                        <h4 className="text-lg font-semibold text-center mb-4 text-slate-700 dark:text-slate-300">Top Waste Categories (in units)</h4>
                         {categoryData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={categoryData} margin={{ top: 5, right: 30, left: 20, bottom: 75 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
                                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} tick={{ fill: tickColor }} />
                                <YAxis tick={{ fill: tickColor }} />
                                <Tooltip 
                                    cursor={{fill: theme === 'dark' ? 'rgba(100, 116, 139, 0.3)' : 'rgba(203, 213, 225, 0.5)'}}
                                    contentStyle={{ 
                                        backgroundColor: theme === 'dark' ? '#334155' : '#fff',
                                        borderColor: theme === 'dark' ? '#475569' : '#e2e8f0'
                                    }}
                                    labelStyle={{ color: theme === 'dark' ? '#cbd5e1' : '#1e293b' }}
                                    formatter={(value) => [`${Number(value).toFixed(2)} units`, 'Quantity']}
                                />
                                <Legend verticalAlign="top" height={36} wrapperStyle={{ color: legendColor }} />
                                <Bar dataKey="quantity" fill="#16A34A" name="Quantity (units)" />
                            </BarChart>
                        </ResponsiveContainer>
                         ) : <p className="text-center text-gray-500 py-24">No data available for category chart.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;