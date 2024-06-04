import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Waste } from '../../types';
import { WasteStatus } from '../../types';
import { getWastes, addWaste, updateWaste, deleteWaste } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;
const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>;
const FilterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;


const WasteManagement: React.FC = () => {
    const [wastes, setWastes] = useState<Waste[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentWaste, setCurrentWaste] = useState<Partial<Waste> | null>(null);
    const [wasteToDelete, setWasteToDelete] = useState<Waste | null>(null);
    const { user } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof Waste; direction: 'asc' | 'desc' }>({ key: 'created_at', direction: 'desc' });
    
    const statusFilter = searchParams.get('status');

    const fetchWastes = useCallback(async () => {
        if(user) {
            setLoading(true);
            const userWastes = await getWastes(user.id);
            setWastes(userWastes);
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchWastes();
    }, [fetchWastes]);

    const processedWastes = useMemo(() => {
        let processed = [...wastes];

        // Filter by status from URL
        if (statusFilter) {
            processed = processed.filter(w => w.status === statusFilter);
        }

        // Filter by search term
        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            processed = processed.filter(waste => 
                waste.type.toLowerCase().includes(lowercasedTerm) ||
                waste.category.toLowerCase().includes(lowercasedTerm) ||
                waste.location.toLowerCase().includes(lowercasedTerm)
            );
        }

        // Sort
        processed.sort((a, b) => {
            const key = sortConfig.key;
            if (key === 'type') {
                return sortConfig.direction === 'asc' ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type);
            }
            if (key === 'quantity') {
                return sortConfig.direction === 'asc' ? a.quantity - b.quantity : b.quantity - a.quantity;
            }
            if (key === 'created_at') {
                return sortConfig.direction === 'asc' 
                    ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime() 
                    : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            }
            return 0;
        });

        return processed;
    }, [wastes, statusFilter, searchTerm, sortConfig]);

    const handleSort = (key: keyof Waste) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleOpenModal = (waste: Partial<Waste> | null = null) => {
        setCurrentWaste(waste ? { ...waste } : { status: WasteStatus.Disposed, quantity: 0, type: '', unit: '', category: '', location: '', notes: '' });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentWaste(null);
    };

    const handleSave = async () => {
        if (!currentWaste || !user) return;
        
        const wasteData: Omit<Waste, 'id' | 'created_at' | 'user_id'> = {
            type: currentWaste.type || '',
            quantity: currentWaste.quantity || 0,
            unit: currentWaste.unit || '',
            category: currentWaste.category || '',
            status: currentWaste.status || WasteStatus.Disposed,
            location: currentWaste.location || '',
            notes: currentWaste.notes || '',
        }

        if(!wasteData.type || !wasteData.unit || !wasteData.category || !wasteData.location || wasteData.quantity <= 0) {
            alert("Please fill in all required fields (Type, Quantity, Unit, Category, Location) and ensure quantity is positive.");
            return;
        }

        if (currentWaste.id) {
            await updateWaste(currentWaste.id, wasteData);
        } else {
            await addWaste({ ...wasteData, user_id: user.id });
        }
        await fetchWastes();
        handleCloseModal();
    };
    
    const handleOpenDeleteModal = (waste: Waste) => {
        setWasteToDelete(waste);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setWasteToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (wasteToDelete) {
            await deleteWaste(wasteToDelete.id);
            await fetchWastes();
            handleCloseDeleteModal();
        }
    };

    if (loading) return <div>Loading waste records...</div>;

    const SortableHeader: React.FC<{ columnKey: keyof Waste; title: string; className?: string }> = ({ columnKey, title, className = '' }) => {
        const isSorted = sortConfig.key === columnKey;
        const sortIcon = isSorted ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '';
        return (
            <th className={`p-4 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors ${className}`} onClick={() => handleSort(columnKey)}>
                <div className="flex items-center">
                    {title}
                    <span className="ml-2 text-xs w-3">{sortIcon}</span>
                </div>
            </th>
        );
    };


    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-slate-200">Waste Records</h2>
                <button onClick={() => handleOpenModal()} className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                    <PlusIcon/> Add New Waste
                </button>
            </div>
            
            <div className="mb-4 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                </div>
                <input
                    type="text"
                    placeholder="Search by type, category, or location..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-10 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"
                />
            </div>

            {statusFilter && (
                <div className="mb-4 p-3 bg-blue-100 border border-blue-200 text-blue-800 rounded-lg flex items-center justify-between dark:bg-blue-900/30 dark:border-blue-800/50 dark:text-blue-300">
                    <div className="flex items-center">
                        <FilterIcon />
                        <span className="font-semibold">Filtered by status:</span>
                        <span className="ml-2 capitalize px-2 py-0.5 bg-blue-200 text-blue-900 rounded-md text-sm dark:bg-blue-800 dark:text-blue-100">{statusFilter}</span>
                    </div>
                    <button onClick={() => setSearchParams({})} className="font-semibold text-sm hover:underline">Clear Filter</button>
                </div>
            )}

            <div className="bg-white dark:bg-slate-800 shadow-xl rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-slate-100 dark:bg-slate-700">
                            <tr className="text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                <SortableHeader columnKey="type" title="Type" />
                                <SortableHeader columnKey="quantity" title="Quantity" />
                                <th className="p-4">Location</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Status</th>
                                <SortableHeader columnKey="created_at" title="Date" />
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {processedWastes.map((waste) => (
                                <tr key={waste.id} className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-slate-700/50">
                                    <td className="p-4 text-sm text-slate-800 dark:text-slate-200 font-medium">{waste.type}</td>
                                    <td className="p-4 text-sm text-slate-700 dark:text-slate-300">{waste.quantity} {waste.unit}</td>
                                    <td className="p-4 text-sm text-slate-700 dark:text-slate-300">{waste.location}</td>
                                    <td className="p-4 text-sm text-slate-700 dark:text-slate-300">{waste.category}</td>
                                    <td className="p-4 text-sm">
                                        <span className={`capitalize px-3 py-1 text-xs font-semibold rounded-full ${
                                            waste.status === 'recycled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' :
                                            waste.status === 'reused' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' :
                                            'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                                        }`}>{waste.status}</span>
                                    </td>
                                    <td className="p-4 text-sm text-slate-700 dark:text-slate-300">{new Date(waste.created_at).toLocaleDateString()}</td>
                                    <td className="p-4 text-sm text-center">
                                        <div className="flex justify-center items-center space-x-2">
                                            <button onClick={() => handleOpenModal(waste)} title="Edit" className="p-2 text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-full transition-colors"><EditIcon/></button>
                                            <button onClick={() => handleOpenDeleteModal(waste)} title="Delete" className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full transition-colors"><DeleteIcon/></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 {processedWastes.length === 0 && <p className="p-8 text-center text-gray-500 dark:text-slate-400">No waste records found. Try adjusting your search or filters, or click "Add New Waste" to get started!</p>}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-2xl w-full max-w-lg">
                        <h3 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">{currentWaste?.id ? 'Edit' : 'Add'} Waste Record</h3>
                        <div className="space-y-4">
                            <input type="text" placeholder="Type (e.g., Plastic Bottles)" value={currentWaste?.type || ''} onChange={e => setCurrentWaste(w => ({ ...w, type: e.target.value }))} className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"/>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input type="number" placeholder="Quantity" value={currentWaste?.quantity || ''} onChange={e => setCurrentWaste(w => ({ ...w, quantity: parseFloat(e.target.value) || 0 }))} className="md:col-span-2 w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"/>
                                <input type="text" placeholder="Unit (e.g., kg)" value={currentWaste?.unit || ''} onChange={e => setCurrentWaste(w => ({ ...w, unit: e.target.value }))} className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"/>
                            </div>
                            <input type="text" placeholder="Category (e.g., Food Waste)" value={currentWaste?.category || ''} onChange={e => setCurrentWaste(w => ({ ...w, category: e.target.value }))} className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"/>
                            <input type="text" placeholder="Location (e.g., Kitchen)" value={currentWaste?.location || ''} onChange={e => setCurrentWaste(w => ({ ...w, location: e.target.value }))} className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"/>
                            <select value={currentWaste?.status || ''} onChange={e => setCurrentWaste(w => ({ ...w, status: e.target.value as WasteStatus }))} className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                                {Object.values(WasteStatus).map(status => (
                                    <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                                ))}
                            </select>
                             <textarea placeholder="Notes (optional)" value={currentWaste?.notes || ''} onChange={e => setCurrentWaste(w => ({ ...w, notes: e.target.value }))} className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 h-24 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"/>
                        </div>
                        <div className="mt-8 flex justify-end gap-4">
                            <button onClick={handleCloseModal} className="px-5 py-2.5 bg-slate-200 text-slate-800 font-semibold rounded-md hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500 transition-colors">Cancel</button>
                            <button onClick={handleSave} className="px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg">Save Record</button>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && wasteToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
                        <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">Confirm Deletion</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            Are you sure you want to permanently delete the record for <strong className="text-slate-900 dark:text-slate-200">{wasteToDelete.quantity} {wasteToDelete.unit} of {wasteToDelete.type}</strong>? This action cannot be undone.
                        </p>
                        <div className="mt-8 flex justify-end gap-4">
                            <button onClick={handleCloseDeleteModal} className="px-5 py-2.5 bg-slate-200 text-slate-800 font-semibold rounded-md hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500 transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleConfirmDelete} className="px-5 py-2.5 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors shadow-md hover:shadow-lg">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WasteManagement;
