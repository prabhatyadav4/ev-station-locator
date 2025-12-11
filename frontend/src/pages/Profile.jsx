import { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
import { getMyBookings } from '../services/bookingService';
import { Loader, Calendar, MapPin, Zap } from 'lucide-react';

const Profile = () => {
    const { user } = useAuthStore();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getMyBookings();
                setBookings(data);
            } catch (error) {
                console.error('Failed to fetch bookings:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchBookings();
        }
    }, [user]);

    if (!user) return <div className="p-8 text-center">Please log in</div>;

    return (
        <div className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-primary">My Profile</h1>

            <div className="bg-dark-800 p-6 rounded-2xl border border-dark-700 mb-8">
                <h2 className="text-xl font-bold mb-4">Account Details</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-gray-400 text-sm">Name</label>
                        <p className="font-medium">{user.name}</p>
                    </div>
                    <div>
                        <label className="text-gray-400 text-sm">Email</label>
                        <p className="font-medium">{user.email}</p>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
            {loading ? (
                <Loader className="animate-spin text-primary mx-auto" />
            ) : bookings.length === 0 ? (
                <p className="text-gray-400">No bookings found.</p>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="bg-dark-800 p-4 rounded-xl border border-dark-700 flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div className="mb-4 md:mb-0">
                                <h3 className="font-bold text-lg mb-1">{booking.station?.name || 'Unknown Station'}</h3>
                                <div className="flex items-center text-gray-400 text-sm mb-2">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {booking.station?.address}
                                </div>
                                <div className="flex gap-4 text-sm">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1 text-primary" />
                                        {new Date(booking.startTime).toLocaleString()}
                                    </div>
                                    <div className="flex items-center">
                                        <Zap className="w-4 h-4 mr-1 text-accent" />
                                        {booking.connectorType}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase mb-2 ${booking.status === 'confirmed' ? 'bg-green-900 text-green-400' :
                                    booking.status === 'pending' ? 'bg-yellow-900 text-yellow-400' : 'bg-gray-700'
                                    }`}>
                                    {booking.status}
                                </span>
                                <span className="font-bold text-xl">₹{booking.price.toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;
