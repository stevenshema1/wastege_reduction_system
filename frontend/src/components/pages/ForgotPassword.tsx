
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { requestPasswordReset } from '../../services/api';

const LogoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.5c.943 1.034 2.296 1.5 3.5 1.5s2.557-.466 3.5-1.5" />
    </svg>
);

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await requestPasswordReset(email);
            if (response) {
                setMessage(response.message);
            }
        } catch (error) {
            // Generic message for security
            setMessage('If an account with that email exists, a password reset link has been sent.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700">
                <div className="flex justify-center">
                    <LogoIcon />
                </div>
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-primary-600">Forgot Password</h1>
                    <p className="mt-2 text-slate-500 dark:text-slate-400">Enter your email and we'll send you a link to reset your password.</p>
                </div>

                {message && <p className="text-center text-sm font-medium text-green-700 bg-green-50 dark:bg-green-900/30 dark:text-green-300 p-3 rounded-lg">{message}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-slate-300">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all dark:bg-slate-700 dark:border-gray-600 dark:text-white dark:placeholder-slate-400"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={loading || !!message}
                            className="w-full px-4 py-2.5 font-semibold text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-300 transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </div>
                </form>

                <p className="text-sm text-center text-gray-600 dark:text-slate-400">
                    Remember your password?{' '}
                    <Link to="/login" className="font-medium text-primary-600 hover:underline">
                        Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;