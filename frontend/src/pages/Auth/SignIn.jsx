import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import useAuthStore from '../../store/authStore';
import axios from 'axios';

const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/auth/login', data);
            login(response.data, response.data.accessToken);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || error.message);
            alert('Login failed: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-dark-800 p-8 rounded-2xl shadow-neon border border-dark-700">
                <h2 className="text-3xl font-bold text-center mb-6 text-primary">Sign In</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        error={errors.email?.message}
                    />
                    <Input
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', { required: 'Password is required' })}
                        error={errors.password?.message}
                        endIcon={
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-400 hover:text-white focus:outline-none"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        }
                    />
                    <Button type="submit" className="w-full">Sign In</Button>
                </form>
                <p className="text-gray-400">
                    Don&apos;t have an account?{' '}
                    <Link to="/signup" className="text-primary hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
