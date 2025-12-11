import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Home';
import MapView from './pages/MapView';
import StationDetail from './pages/StationDetail';
import Booking from './pages/Booking';
import Profile from './pages/Profile';
import useAuthStore from './store/authStore';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-dark-900 text-white">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/map" element={<MapView />} />
                    <Route path="/station/:id" element={<StationDetail />} />
                    <Route
                        path="/booking"
                        element={
                            <PrivateRoute>
                                <Booking />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
