
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import type { User } from '../../types';

const DefaultAvatar: React.FC<{ username: string; className?: string }> = ({ username, className }) => {
    const initial = username ? username.charAt(0).toUpperCase() : '?';
    return (
        <div className={`flex items-center justify-center bg-primary-500 text-white rounded-full ${className} text-4xl font-bold`}>
            <span>{initial}</span>
        </div>
    );
};

const Profile: React.FC = () => {
    const { user, updateUserProfile } = useAuth();
    const [monthlyTarget, setMonthlyTarget] = useState<number>(0);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (user) {
            setMonthlyTarget(user.monthly_target || 0);
            if (!imageFile) {
                setImagePreview(user.profile_picture_url || null);
            }
        }
    }, [user, imageFile]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file (PNG, JPG, GIF).');
                return;
            }
            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };
    
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage(null);

        const updateData: Partial<Pick<User, 'monthly_target' | 'profile_picture_url'>> = {
            monthly_target: monthlyTarget,
        };

        if (imageFile) {
            try {
                const base64Image = await fileToBase64(imageFile);
                updateData.profile_picture_url = base64Image;
            } catch (error) {
                console.error("Failed to process image file.", error);
                setLoading(false);
                return;
            }
        }

        const success = await updateUserProfile(updateData);
        
        if (success) {
            setSuccessMessage("Your profile has been updated successfully!");
            setImageFile(null);
            setTimeout(() => setSuccessMessage(null), 3000);
        }
        setLoading(false);
    };

    if (!user) {
        return <div>Loading profile...</div>;
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-slate-200 mb-6">User Profile</h2>
            <div className="max-w-2xl mx-auto">
                 <form onSubmit={handleSave}>
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                            <div className="relative shrink-0">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-primary-200 dark:border-primary-700 shadow-md" />
                                ) : (
                                    <DefaultAvatar username={user.username} className="w-28 h-28" />
                                )}
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all transform hover:scale-110"
                                    aria-label="Change profile picture"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    accept="image/png, image/jpeg, image/gif"
                                    className="hidden"
                                />
                            </div>
                            <div className="text-center sm:text-left">
                                 <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100">{user.username}</h3>
                                 <p className="text-gray-500 dark:text-slate-400">{user.email}</p>
                                 <p className="mt-2 text-sm text-gray-500 dark:text-slate-500">Update your photo and personal details.</p>
                            </div>
                        </div>

                        <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                            <h3 className="text-xl font-semibold text-gray-700 dark:text-slate-300 mb-2">Goals & Settings</h3>
                            <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">Set your personal goals to track your progress effectively.</p>
                            
                            <div className="space-y-2">
                                <label htmlFor="monthlyTarget" className="text-sm font-medium text-gray-600 dark:text-slate-400">Monthly Waste Reduction Target (kg)</label>
                                 <input
                                    id="monthlyTarget"
                                    type="number"
                                    value={monthlyTarget}
                                    onChange={(e) => setMonthlyTarget(parseFloat(e.target.value) || 0)}
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                    placeholder="e.g., 50"
                                />
                                <p className="text-xs text-gray-500 dark:text-slate-500">This target will be reflected on your dashboard.</p>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-end border-t border-slate-200 dark:border-slate-700 pt-6">
                             <div className="h-6 mr-auto">
                                {successMessage && <p className="text-sm text-green-600 dark:text-green-400">{successMessage}</p>}
                             </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2.5 font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-300 transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;