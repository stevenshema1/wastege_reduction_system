import React from 'react';

const CommunityHub: React.FC = () => {
    const leaderboards = [
        { id: 1, name: 'Eco Warrior', score: 1250, rank: 1 },
        { id: 2, name: 'Green Master', score: 1100, rank: 2 },
        { id: 3, name: 'Recycle King', score: 980, rank: 3 },
    ];

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                    Community Impact Hub
                </h2>
                <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
                    Join thousands of users making a difference. Compete, collaborate, and share your journey.
                </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Global Leaderboard</h3>
                        <div className="mt-5">
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                {leaderboards.map((user) => (
                                    <li key={user.id} className="py-4 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <span className="text-lg font-bold text-blue-600 mr-4">#{user.rank}</span>
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</span>
                                        </div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">{user.score} pts</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-teal-600 overflow-hidden shadow rounded-lg text-white">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium">Community Achievements</h3>
                        <p className="mt-2 text-sm">Together, we have diverted over 500,000 kg of waste from landfills this year!</p>
                        <div className="mt-6">
                            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-white hover:bg-teal-50">
                                Share My Impact
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityHub;
