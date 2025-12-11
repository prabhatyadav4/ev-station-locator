import { Search } from 'lucide-react';
import StationCard from './StationCard';
import Input from '../UI/Input';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ stations, onSearch, onDirectionsClick, activeFilter, onFilterChange, onLocate }) => {
    return (
        <div className="w-full md:w-[400px] h-full bg-dark-900/95 backdrop-blur-xl border-r border-white/10 flex flex-col z-20 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

            <div className="p-6 border-b border-white/10 relative z-10">
                <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Find Station</h1>
                <Input
                    placeholder="Search location..."
                    endIcon={<Search className="text-primary" size={20} />}
                    onChange={(e) => onSearch(e.target.value)}
                    className="mb-4 bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 placeholder:text-gray-500"
                />

                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {[
                        { id: 'all', label: 'All Stations' },
                        { id: 'fast', label: 'Fast Charging' },
                        { id: 'available', label: 'Available' }
                    ].map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => onFilterChange(filter.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeFilter === filter.id
                                ? 'bg-primary/20 text-primary border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]'
                                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-gray-200'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar relative z-10">
                <div className="flex justify-between items-center mb-4 px-2">
                    <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
                        Results
                    </h2>
                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full border border-primary/20">
                        {stations.length} found
                    </span>
                </div>

                {stations && stations.length > 0 ? (
                    <motion.div
                        className="space-y-4"
                        layout
                    >
                        <AnimatePresence>
                            {stations.map((station, index) => (
                                <motion.div
                                    key={station._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    layout
                                >
                                    <StationCard
                                        station={station}
                                        onDirectionsClick={onDirectionsClick}
                                        onLocate={onLocate}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center h-64 text-center"
                    >
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                            <Search className="text-gray-600" size={32} />
                        </div>
                        <p className="text-gray-400 font-medium">No stations found</p>
                        <p className="text-gray-600 text-sm mt-1">Try adjusting your filters or search</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
