import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStationById } from '../services/stationService';
import Button from '../components/UI/Button';
import { Loader, MapPin, Zap, Star } from 'lucide-react';

const StationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [station, setStation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStation = async () => {
            try {
                const data = await getStationById(id);
                setStation(data);
            } catch (error) {
                console.error('Failed to fetch station:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStation();
    }, [id]);

    if (loading) return <div className="flex justify-center items-center h-screen"><Loader className="animate-spin text-primary" /></div>;
    if (!station) return <div className="text-center p-8">Station not found</div>;

    return (
        <div className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">← Back</Button>

            <div className="bg-dark-800 rounded-2xl overflow-hidden shadow-lg border border-dark-700">
                <div className="h-64 bg-gray-700 relative">
                    {station.images && station.images.length > 0 ? (
                        <img src={station.images[0]} alt={station.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-dark-700 text-gray-500">No Image</div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-900 to-transparent p-6">
                        <h1 className="text-3xl font-bold text-white mb-2">{station.name}</h1>
                        <div className="flex items-center text-gray-300">
                            <MapPin className="w-4 h-4 mr-2 text-primary" />
                            {station.address}
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center bg-dark-700 px-3 py-1 rounded-full">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="font-bold">{station.rating}</span>
                        </div>
                        <div className="text-sm text-gray-400">Open 24/7</div>
                    </div>

                    <h3 className="text-xl font-bold mb-4 text-accent">Connectors</h3>
                    <div className="grid gap-4 md:grid-cols-2 mb-8">
                        {station.connectors.map((connector, idx) => (
                            <div key={idx} className="bg-dark-700 p-4 rounded-xl border border-dark-600 flex justify-between items-center">
                                <div>
                                    <div className="flex items-center mb-1">
                                        <Zap className="w-5 h-5 text-primary mr-2" />
                                        <span className="font-bold text-lg">{connector.type}</span>
                                    </div>
                                    <div className="text-sm text-gray-400">{connector.powerKw} kW • ₹{connector.pricePerKWh}/kWh</div>
                                </div>
                                <Button
                                    variant="primary"
                                    onClick={() => navigate('/booking', { state: { station, connector } })}
                                >
                                    Book
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StationDetail;
