import { useEffect, useState } from 'react';
import LeafletMap from '../components/Map/LeafletMap';
import Sidebar from '../components/Map/Sidebar';
import { getStations } from '../services/stationService';
import { Loader } from 'lucide-react';

const MapView = () => {
    const [stations, setStations] = useState([]);
    const [filteredStations, setFilteredStations] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'fast', 'available'
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [center, setCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Default India

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const data = await getStations({});
                setStations(data.stations);
                setFilteredStations(data.stations);
            } catch (error) {
                console.error('Failed to fetch stations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStations();

        // Get User Location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCenter({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.log('Geolocation denied or failed', error);
                }
            );
        }
    }, []);

    // Filter Logic
    useEffect(() => {
        let result = stations;

        // 1. Search Filter
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(station =>
                station.name.toLowerCase().includes(lowerQuery) ||
                station.address.toLowerCase().includes(lowerQuery)
            );
        }

        // 2. Category/Status Filter
        if (activeFilter === 'fast') {
            result = result.filter(station =>
                station.connectors.some(c => c.powerKw >= 50)
            );
        } else if (activeFilter === 'available') {
            result = result.filter(station => station.status === 'Available');
        }

        setFilteredStations(result);
    }, [stations, searchQuery, activeFilter]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleDirectionsClick = (station) => {
        setCenter({
            lat: station.location.coordinates[1],
            lng: station.location.coordinates[0]
        });
        // Ideally, this would also open a route on the map or external map
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${station.location.coordinates[1]},${station.location.coordinates[0]}`, '_blank');
    };

    const handleLocate = (station) => {
        setCenter({
            lat: station.location.coordinates[1],
            lng: station.location.coordinates[0]
        });
    };

    return (
        <div className="flex h-screen overflow-hidden"> {/* Full screen height */}
            {loading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-dark-900/80">
                    <Loader className="w-12 h-12 text-primary animate-spin" />
                </div>
            )}

            <Sidebar
                stations={filteredStations}
                onSearch={handleSearch}
                onDirectionsClick={handleDirectionsClick}
                onLocate={handleLocate}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
            />

            <div className="flex-1 relative">
                <div className="absolute inset-0">
                    <LeafletMap
                        stations={filteredStations}
                        center={center}
                        zoom={5}
                        onDirectionsClick={handleDirectionsClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default MapView;
