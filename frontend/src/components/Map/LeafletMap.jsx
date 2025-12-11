import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import Button from '../UI/Button';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon missing in React Leaflet
// Using online URLs for markers to avoid bundler issues with local assets
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map center updates
const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView([center.lat, center.lng], zoom);
        }
    }, [center, zoom, map]);
    return null;
};

const LeafletMap = ({ stations, center, zoom, onDirectionsClick }) => {
    // Default center if none provided (India)
    const defaultCenter = { lat: 20.5937, lng: 78.9629 };
    const mapCenter = center || defaultCenter;

    return (
        <MapContainer
            center={[mapCenter.lat, mapCenter.lng]}
            zoom={zoom}
            scrollWheelZoom={true}
            className="w-full h-full z-0" // Added z-0 to ensure it doesn't overlap sidebar
        >
            <ChangeView center={center} zoom={zoom} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {stations && stations.map((station) => (
                <Marker key={station._id} position={[station.location.coordinates[1], station.location.coordinates[0]]}>
                    <Popup>
                        <div className="relative">
                            {/* Header Gradient Background */}
                            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-primary/20 to-transparent -z-10"></div>

                            <div className="p-5">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-xl text-white leading-tight pr-6">{station.name}</h3>
                                </div>

                                <div className="flex items-center gap-2 mb-3">
                                    {station.category && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-primary">
                                            {station.category}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1 text-[10px] font-medium text-gray-400 border border-white/10 px-2 py-0.5 rounded-full bg-white/5">
                                        <span className={`w-1.5 h-1.5 rounded-full ${station.status === 'Available' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`}></span>
                                        {station.status}
                                    </span>
                                </div>

                                <p className="text-gray-300 text-xs mb-4 leading-relaxed opacity-90 border-b border-white/10 pb-3">
                                    {station.address}
                                </p>

                                <div className="mb-3">
                                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-2">Connectors</span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {station.connectors && station.connectors.map((c, idx) => (
                                            <div key={idx} className="flex flex-col bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 min-w-[60px] text-center">
                                                <span className="text-xs font-bold text-white">{c.type}</span>
                                                <span className="text-[10px] text-primary">{c.powerKw}kW</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {station.services && station.services.length > 0 && (
                                    <div className="mb-4">
                                        <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest block mb-2">Amenities</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {station.services.map((service, idx) => (
                                                <span key={idx} className="text-[10px] text-gray-300 bg-white/5 px-2 py-1 rounded border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                                                    {service}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <Button
                                    variant="primary"
                                    className="w-full py-2 text-xs flex items-center justify-center gap-2 shadow-neon hover:shadow-neon-strong transition-all active:scale-[0.98]"
                                    onClick={() => onDirectionsClick(station)}
                                >
                                    <MapPin size={14} />
                                    Get Directions
                                </Button>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))
            }
        </MapContainer >
    );
};

export default LeafletMap;
