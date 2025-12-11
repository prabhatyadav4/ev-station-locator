import Button from '../UI/Button';
import { MapPin, Zap, Crosshair } from 'lucide-react';

const StationCard = ({ station, onDirectionsClick, onLocate }) => {
    return (
        <div className="group bg-white/5 p-5 rounded-2xl border border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:bg-white/[0.07] relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors"></div>

            <div className="relative z-10 flex justify-between items-start mb-3">
                <div className="flex-1 mr-4">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors line-clamp-1">{station.name}</h3>
                        {station.category && (
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border border-white/10 text-gray-400 bg-white/5">
                                {station.category}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-400 flex items-start gap-1.5 leading-tight">
                        <MapPin size={14} className="flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{station.address}</span>
                    </p>
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${stateStyles(station.status)}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${station.status === 'Available' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    {station.status}
                </div>
            </div>

            <div className="relative z-10 flex flex-wrap gap-2 mb-4">
                {station.connectors && station.connectors.slice(0, 3).map((connector, index) => (
                    <span key={index} className="px-2.5 py-1.5 bg-dark-800/80 rounded-lg text-xs text-gray-300 flex items-center gap-1.5 border border-white/5">
                        <Zap size={10} className="text-accent" />
                        {connector.type} <span className="text-gray-500">|</span> {connector.powerKw}kW
                    </span>
                ))}
                {station.connectors && station.connectors.length > 3 && (
                    <span className="px-2 py-1 rounded text-xs text-gray-500">+{station.connectors.length - 3}</span>
                )}
            </div>

            {/* Services Preview */}
            {station.services && station.services.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide text-[10px] text-gray-500">
                    {station.services.slice(0, 4).map((s, i) => (
                        <span key={i} className="whitespace-nowrap">• {s}</span>
                    ))}
                </div>
            )}


            <div className="flex gap-3 relative z-10 w-full">
                <Button
                    variant="secondary"
                    className="flex-1 py-2.5 text-sm flex items-center justify-center gap-2 border border-white/10 hover:bg-white/10"
                    onMouseEnter={() => onLocate(station)}
                    onClick={() => onLocate(station)}
                >
                    <Crosshair size={16} />
                    Locate
                </Button>
                <Button
                    variant="primary"
                    className="flex-1 py-2.5 text-sm flex items-center justify-center gap-2 shadow-neon hover:shadow-neon-strong transition-all group-active:scale-[0.98]"
                    onClick={() => onDirectionsClick(station)}
                >
                    <MapPin size={16} />
                    Directions
                </Button>
            </div>
        </div>
    );
};

const stateStyles = (status) => {
    switch (status) {
        case 'Available': return 'bg-green-500/10 text-green-400 border-green-500/20';
        case 'Busy': return 'bg-red-500/10 text-red-400 border-red-500/20';
        default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
};

export default StationCard;
