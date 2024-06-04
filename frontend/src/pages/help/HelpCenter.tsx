import React from 'react';
import Button from '../../components/ui/Button';

const HelpCenter: React.FC = () => {
    const faqs = [
        { q: 'How do I log my waste?', a: 'Go to the Waste Management page and click "Add New Record".' },
        { q: 'Can I track multiple locations?', a: 'Yes, if you have an Organization account, you can manage multiple sites.' },
        { q: 'What is the sustainability score?', a: 'It is a proprietary metric based on your recycling-to-waste ratio and total volume.' },
    ];

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold mb-4">How can we help?</h1>
                <div className="relative max-w-xl mx-auto">
                    <input 
                        type="text" 
                        placeholder="Search for articles, guides, and more..." 
                        className="w-full pl-12 pr-4 py-4 rounded-full border shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none dark:bg-gray-800 dark:border-gray-700"
                    />
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    </div>
                    <h3 className="font-bold mb-2">Knowledge Base</h3>
                    <p className="text-sm text-gray-500 mb-4">Browse our detailed guides and tutorials.</p>
                    <Button variant="outline" size="sm">Explore</Button>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                    </div>
                    <h3 className="font-bold mb-2">Community Support</h3>
                    <p className="text-sm text-gray-500 mb-4">Ask questions and get help from other users.</p>
                    <Button variant="outline" size="sm">Join Hub</Button>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <h3 className="font-bold mb-2">Direct Message</h3>
                    <p className="text-sm text-gray-500 mb-4">Contact our support team for complex issues.</p>
                    <Button variant="outline" size="sm">Contact Us</Button>
                </div>
            </div>

            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border-b border-gray-100 dark:border-gray-700 pb-6 last:border-0">
                            <h4 className="font-bold text-lg mb-2">{faq.q}</h4>
                            <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HelpCenter;
