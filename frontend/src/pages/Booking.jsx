import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import SlotPicker from '../components/Booking/SlotPicker';
import { createBooking } from '../services/bookingService';
import { Loader, CheckCircle } from 'lucide-react';

const Booking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { station, connector } = location.state || {};
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Generate dummy slots for demo (next 5 hours)
    const generateSlots = () => {
        const slots = [];
        const now = new Date();
        now.setMinutes(0, 0, 0);
        for (let i = 0; i < 10; i++) {
            const time = new Date(now.getTime() + i * 30 * 60000);
            slots.push({ time: time.toISOString(), available: Math.random() > 0.3 });
        }
        return slots;
    };

    const slots = generateSlots();

    const handleBooking = async () => {
        if (!selectedSlot) return;
        setLoading(true);
        try {
            await createBooking({
                stationId: station._id,
                connectorType: connector.type,
                startTime: selectedSlot.time,
                durationMins: 30,
                paymentMethod: 'mock'
            });
            setSuccess(true);
            setTimeout(() => navigate('/'), 3000);
        } catch (error) {
            alert('Booking failed: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    if (!station) return <div className="p-8">No station selected</div>;

    if (success) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
                <CheckCircle className="w-20 h-20 text-primary mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h2>
                <p className="text-gray-400">Redirecting to home...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Book Charging Slot</h1>

            <div className="bg-dark-800 p-6 rounded-2xl border border-dark-700 mb-6">
                <h3 className="text-xl font-bold text-primary mb-2">{station.name}</h3>
                <p className="text-gray-400 mb-4">{station.address}</p>
                <div className="flex justify-between items-center bg-dark-700 p-3 rounded-lg">
                    <span className="font-bold">{connector.type}</span>
                    <span className="text-accent">{connector.powerKw} kW</span>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Select Time Slot</h3>
                <SlotPicker
                    slots={slots}
                    selectedSlot={selectedSlot}
                    onSelect={setSelectedSlot}
                />
            </div>

            <div className="bg-dark-800 p-4 rounded-xl mb-6 flex justify-between items-center">
                <span className="text-gray-400">Estimated Cost (30 mins)</span>
                <span className="text-2xl font-bold text-primary">
                    ₹{(connector.powerKw * 0.5 * connector.pricePerKWh).toFixed(2)}
                </span>
            </div>

            <Button
                variant="primary"
                className="w-full py-4 text-lg"
                disabled={!selectedSlot || loading}
                onClick={handleBooking}
            >
                {loading ? <Loader className="animate-spin mx-auto" /> : 'Confirm & Pay'}
            </Button>
        </div>
    );
};

export default Booking;
