import React from 'react';

const ResourceCenter: React.FC = () => {
    const resources = [
        { title: 'Composting 101', type: 'Guide', readTime: '5 min', level: 'Beginner' },
        { title: 'Zero Waste Kitchen', type: 'Video', readTime: '12 min', level: 'Intermediate' },
        { title: 'Understanding Plastic Symbols', type: 'Article', readTime: '8 min', level: 'Beginner' },
        { title: 'Advanced E-Waste Recycling', type: 'Whitepaper', readTime: '20 min', level: 'Advanced' },
    ];

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Educational Resource Center</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {resources.map((res, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                        <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{res.type}</span>
                        <h3 className="mt-4 text-lg font-bold">{res.title}</h3>
                        <div className="mt-4 flex justify-between text-sm text-gray-500">
                            <span>{res.readTime}</span>
                            <span>{res.level}</span>
                        </div>
                        <button className="mt-6 w-full py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded font-medium">
                            Read More
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourceCenter;
