import React, { useState } from 'react';
import Button from '../../components/ui/Button';

const SettingsPage: React.FC = () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
            
            <div className="space-y-12">
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">Profile Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Display Name</label>
                            <input type="text" className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700" defaultValue="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                            <input type="email" className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700" defaultValue="john@example.com" disabled />
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">Preferences</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Push Notifications</p>
                                <p className="text-sm text-gray-500">Receive alerts about waste collection and goals.</p>
                            </div>
                            <button 
                                onClick={() => setNotifications(!notifications)}
                                className={`w-12 h-6 rounded-full transition-colors ${notifications ? 'bg-emerald-500' : 'bg-gray-300'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notifications ? 'translate-x-7' : 'translate-x-1'}`} />
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Dark Mode</p>
                                <p className="text-sm text-gray-500">Switch between light and dark themes.</p>
                            </div>
                            <button 
                                onClick={() => setDarkMode(!darkMode)}
                                className={`w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-emerald-500' : 'bg-gray-300'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${darkMode ? 'translate-x-7' : 'translate-x-1'}`} />
                            </button>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-red-600">Danger Zone</h2>
                    <div className="p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/10">
                        <p className="font-medium text-red-800 dark:text-red-400">Delete Account</p>
                        <p className="text-sm text-red-600 dark:text-red-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                        <Button variant="danger">Permanently Delete Account</Button>
                    </div>
                </section>

                <div className="flex justify-end pt-8">
                    <Button size="lg">Save Changes</Button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
