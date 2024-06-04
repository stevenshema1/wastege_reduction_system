
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LogoIcon = ({ className = "h-8 w-8 text-white" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.5c.943 1.034 2.296 1.5 3.5 1.5s2.557-.466 3.5-1.5" />
    </svg>
);

const StepIcon: React.FC<{ num: string }> = ({ num }) => (
    <div className="flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-300 rounded-full font-bold text-2xl shadow-md border-2 border-white dark:border-slate-800">
      {num}
    </div>
);
  
const QuoteIcon = () => <svg className="w-10 h-10 text-primary-500" fill="currentColor" viewBox="0 0 32 32"><path d="M9.984 20.016q0 2.305-1.617 3.922t-3.969 1.617-3.969-1.617-1.617-3.922q0-2.305 1.617-3.922t3.969-1.617q2.352 0 3.969 1.617t1.617 3.922zM22.016 20.016q0 2.305-1.617 3.922t-3.969 1.617-3.969-1.617-1.617-3.922q0-2.305 1.617-3.922t3.969-1.617q2.352 0 3.969 1.617t1.617 3.922z"></path></svg>;

const LandingPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300 font-sans">
      <header className={`fixed top-0 left-0 w-full z-30 p-4 sm:p-6 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
        <Link to="/" className="flex items-center space-x-2">
            <LogoIcon />
            <span className="text-xl font-bold text-white">WRS</span>
        </Link>
        <div className="space-x-2">
            <Link to="/login" className="px-4 py-2 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors">Login</Link>
            <Link to="/register" className="px-4 py-2 bg-white text-primary-600 font-semibold rounded-lg shadow-md hover:bg-slate-100 transition-colors transform hover:-translate-y-0.5">Sign Up</Link>
        </div>
      </header>

      <main>
        <section 
          className="relative min-h-screen flex items-center justify-center text-center bg-cover bg-center px-4" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1615897184420-4317c8525b4a?q=80&w=2070&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent"></div>
          <div className="relative z-10 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight shadow-black [text-shadow:_0_2px_4px_var(--tw-shadow-color)]">
                Turn Wastage into Opportunity
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-200 max-w-2xl mx-auto">
                Our intuitive platform helps you track, manage, and reduce waste effectively, turning sustainable practices into measurable success.
            </p>
            <div className="mt-10">
               <Link 
                 to="/register" 
                 className="px-8 py-4 bg-primary-600 text-white font-bold rounded-full text-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
               >
                 Get Started for Free
                </Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 lg:py-28 bg-white dark:bg-slate-900">
           <div className="container mx-auto px-4 text-center">
                <span className="text-primary-600 font-semibold">FEATURES</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-slate-100 mt-2">A smarter way to handle waste.</h2>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                    From your kitchen to your entire organization, our system provides the tools you need for effective waste management.
                </p>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-1 gap-12 max-w-5xl mx-auto">
                    {/* Feature 1 */}
                    <div className="grid lg:grid-cols-2 gap-8 items-center text-left">
                        <div className="rounded-lg overflow-hidden shadow-2xl">
                           <img src="https://images.unsplash.com/photo-1586776911464-a7a7c5c76062?q=80&w=2070&auto=format&fit=crop" alt="Tracking Waste" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-primary-600">Track Everything, Effortlessly</h3>
                            <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">Easily log different types of waste, from recycled plastics to composted food scraps. Our simple interface makes it easy to categorize, quantify, and track every item, giving you a clear picture of your waste stream.</p>
                        </div>
                    </div>
                    {/* Feature 2 */}
                     <div className="grid lg:grid-cols-2 gap-8 items-center text-left">
                        <div className="rounded-lg overflow-hidden shadow-2xl lg:order-2">
                           <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Analyzing Data" className="w-full h-full object-cover" />
                        </div>
                        <div className="lg:order-1">
                            <h3 className="text-2xl font-bold text-primary-600">Analyze with Insightful Reports</h3>
                            <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">Visualize your waste patterns with interactive charts and downloadable reports. Identify your biggest sources of waste, monitor trends over time, and track your progress towards sustainability goals.</p>
                        </div>
                    </div>
                     {/* Feature 3 */}
                    <div className="grid lg:grid-cols-2 gap-8 items-center text-left">
                        <div className="rounded-lg overflow-hidden shadow-2xl">
                           <img src="https://images.unsplash.com/photo-1542601906-823872424592?q=80&w=2070&auto=format&fit=crop" alt="Reducing Impact" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-primary-600">Reduce Your Environmental Impact</h3>
                            <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">Set monthly goals and use data-driven insights to make informed decisions. Our system empowers you to actively reduce your environmental footprint and celebrate your achievements.</p>
                        </div>
                    </div>
                </div>
           </div>
        </section>

        <section id="how-it-works" className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-800/50">
            <div className="container mx-auto px-4 text-center">
                 <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-slate-100">Get Started in 3 Easy Steps</h2>
                 <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
                    {/* Dashed line connector */}
                    <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 border-t-2 border-dashed border-slate-300 dark:border-slate-600"></div>
                    
                    <div className="relative flex flex-col items-center z-10">
                        <StepIcon num="1" />
                        <h3 className="mt-5 text-xl font-semibold">Create Your Account</h3>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">Sign up in seconds. It's free and easy to get started.</p>
                    </div>
                     <div className="relative flex flex-col items-center z-10">
                        <StepIcon num="2" />
                        <h3 className="mt-5 text-xl font-semibold">Log Your Waste</h3>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">Use our simple form to add and categorize your waste records.</p>
                    </div>
                     <div className="relative flex flex-col items-center z-10">
                        <StepIcon num="3" />
                        <h3 className="mt-5 text-xl font-semibold">See The Impact</h3>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">Explore your dashboard and reports to see your progress.</p>
                    </div>
                 </div>
            </div>
        </section>

        <section id="testimonials" className="py-20 lg:py-28 bg-primary-700 dark:bg-slate-900 text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl lg:text-4xl font-bold">What Our Users Say</h2>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="bg-primary-600 dark:bg-slate-800 p-8 rounded-xl shadow-lg text-left">
                        <QuoteIcon />
                        <p className="mt-4 text-primary-100 dark:text-slate-300 italic">"This system has completely changed how our family manages waste. The dashboard is fantastic for visualizing our progress and keeping us motivated!"</p>
                        <p className="mt-4 font-bold">- Sarah J., Homeowner</p>
                    </div>
                    <div className="bg-primary-600 dark:bg-slate-800 p-8 rounded-xl shadow-lg text-left">
                        <QuoteIcon />
                        <p className="mt-4 text-primary-100 dark:text-slate-300 italic">"As a small cafe owner, tracking our food waste is crucial. WRS makes it simple and the reports are invaluable for optimizing our inventory and reducing costs."</p>
                        <p className="mt-4 font-bold">- Michael B., Small Business Owner</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="cta" className="py-20 lg:py-28 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4 text-center">
                 <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-slate-100 max-w-2xl mx-auto">Ready to Make a Difference?</h2>
                 <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Join thousands of individuals and businesses committed to building a sustainable future. Create your free account today and start your journey.
                </p>
                <div className="mt-8">
                     <Link 
                        to="/register" 
                        className="px-8 py-4 bg-primary-600 text-white font-bold rounded-full text-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                    >
                        Sign Up Now
                    </Link>
                </div>
            </div>
        </section>
      </main>

      <footer className="py-8 bg-slate-800 dark:bg-slate-900/50 text-slate-400">
        <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} Wastage Reduction System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;