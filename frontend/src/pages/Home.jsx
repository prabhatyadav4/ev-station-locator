import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, Zap, Shield, Smartphone, Globe, ChevronRight, Users, Menu, X } from 'lucide-react';
import Button from '../components/UI/Button';
import useAuthStore from '../store/authStore';
import evStationImg from '../assets/ev_charging_station.png';

const Home = () => {
    const { user, logout } = useAuthStore();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            icon: <MapPin className="w-8 h-8 text-primary" />,
            title: "Real-Time Tracking",
            description: "Locate available charging stations instantly with our high-precision live map."
        },
        {
            icon: <Zap className="w-8 h-8 text-accent" />,
            title: "Fast Charging",
            description: "Filter stations by charging speed to get back on the road in record time."
        },
        {
            icon: <Shield className="w-8 h-8 text-purple-500" />,
            title: "Secure Payments",
            description: "Seamless and secure transaction processing for worry-free charging sessions."
        },
        {
            icon: <Smartphone className="w-8 h-8 text-pink-500" />,
            title: "Smart Booking",
            description: "Reserve your spot in advance and avoid waiting in queues."
        }
    ];

    const stats = [
        { value: "5000+", label: "Charging Stations" },
        { value: "120+", label: "Cities Covered" },
        { value: "50k+", label: "Happy Users" },
        { value: "99.9%", label: "Uptime" }
    ];

    return (
        <div className="min-h-screen bg-dark-900 text-white font-sans selection:bg-primary selection:text-dark-900">
            {/* Navbar */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-900/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
                            <Zap className="w-6 h-6 text-dark-900 fill-current" />
                        </div>
                        <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Ionix</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-gray-300 hover:text-primary transition-colors">Features</a>
                        <a href="#how-it-works" className="text-gray-300 hover:text-primary transition-colors">How it Works</a>
                        <Link to="/map" className="text-gray-300 hover:text-primary transition-colors">Map</Link>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link to="/profile" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center border border-white/10">
                                        <Users className="w-4 h-4" />
                                    </div>
                                    <span>{user.name}</span>
                                </Link>
                                <Button variant="ghost" onClick={logout} className="text-sm">Logout</Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Sign In</Link>
                                <Link to="/signup">
                                    <Button variant="primary" className="shadow-neon hover:shadow-neon-strong transition-all">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Nav */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="md:hidden absolute top-full left-0 w-full bg-dark-900 border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl"
                        >
                            <a href="#features" className="text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
                            <a href="#how-it-works" className="text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>How it Works</a>
                            <Link to="/map" className="text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Map</Link>
                            <div className="h-px bg-white/10 my-2"></div>
                            {user ? (
                                <>
                                    <Link to="/profile" className="text-gray-300">Profile</Link>
                                    <button onClick={logout} className="text-left text-red-400">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-gray-300">Sign In</Link>
                                    <Link to="/signup" className="text-primary">Get Started</Link>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Hero Section */}
            <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                {/* Background Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-dark-800 via-dark-900 to-black"></div>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse delay-1000"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                </div>

                <motion.div
                    style={{ opacity, scale }}
                    className="container mx-auto px-6 relative z-10 text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium mb-6 backdrop-blur-sm">
                            The Future of EV Charging is Here
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight">
                            Ionix <br />
                            <span className="bg-gradient-to-r from-primary via-white to-accent bg-clip-text text-transparent">Charge Anywhere</span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Discover thousands of charging stations, book slots in real-time, and experience the seamless way to keep your EV moving.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link to="/map">
                                <Button variant="primary" className="text-lg px-8 py-4 shadow-neon hover:shadow-neon-strong transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                                    Find Stations <ChevronRight className="w-5 h-5" />
                                </Button>
                            </Link>
                            {!user && (
                                <Link to="/signup">
                                    <Button variant="outline" className="text-lg px-8 py-4 border-white/20 hover:bg-white/5 backdrop-blur-sm">
                                        Join the Network
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </motion.div>
                </motion.div>


            </header>

            {/* Stats Section */}
            <section className="py-20 border-y border-white/5 bg-white/[0.02]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</h3>
                                <p className="text-gray-400">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Choose <span className="text-primary">Ionix</span>?</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">We provide the most comprehensive and user-friendly platform for all your electric vehicle charging needs.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 group"
                            >
                                <div className="mb-6 p-4 rounded-full bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-32 bg-dark-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-5xl font-bold mb-8">Simple Steps to <br /><span className="text-accent">Power Up</span></h2>
                            <div className="space-y-12">
                                {[
                                    { title: "Search", desc: "Find the nearest charging station on our interactive map." },
                                    { title: "Book", desc: "Reserve your slot in advance to skip the wait." },
                                    { title: "Charge", desc: "Plug in, charge up, and pay securely through the app." }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-dark-700 border border-white/10 flex items-center justify-center font-bold text-xl text-primary">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                                            <p className="text-gray-400">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <div className="relative z-10 bg-dark-900 rounded-2xl p-2 border border-white/10 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
                                <img
                                    src={evStationImg}
                                    alt="App Interface"
                                    className="rounded-xl w-full"
                                />
                                <div className="absolute -bottom-6 -left-6 bg-dark-800 p-6 rounded-xl border border-white/10 shadow-xl">
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-sm font-medium">Station Available</span>
                                    </div>
                                    <div className="text-2xl font-bold">12 mins away</div>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Start Your Journey?</h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">Join thousands of EV owners who trust Ionix for their daily charging needs.</p>
                    <Link to="/signup">
                        <Button variant="primary" className="text-xl px-10 py-5 shadow-neon hover:shadow-neon-strong">
                            Create Free Account
                        </Button>
                    </Link>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none"></div>
            </section>

            {/* Footer */}
            <footer className="bg-dark-950 border-t border-white/10 pt-20 pb-10">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-2">
                            <Link to="/" className="text-2xl font-bold flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-dark-900 fill-current" />
                                </div>
                                <span>Ionix</span>
                            </Link>
                            <p className="text-gray-400 max-w-sm leading-relaxed">
                                Empowering the electric revolution with smart, accessible, and reliable charging solutions for everyone, everywhere.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-lg">Platform</h4>
                            <ul className="space-y-4 text-gray-400">
                                <li><Link to="/map" className="hover:text-primary transition-colors">Find Stations</Link></li>
                                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                                <li><a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a></li>
                                <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-lg">Company</h4>
                            <ul className="space-y-4 text-gray-400">
                                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                                <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                                <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">© 2024 Ionix. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Globe className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-500 hover:text-white transition-colors"><div className="w-5 h-5 bg-current rounded-full"></div></a>
                            <a href="#" className="text-gray-500 hover:text-white transition-colors"><div className="w-5 h-5 bg-current rounded-sm"></div></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
