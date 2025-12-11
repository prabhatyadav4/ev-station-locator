import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import useAuthStore from '../../store/authStore';
import api from '../../services/api';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        try {
            const response = await api.post('/auth/signup', data);
            login(response.data, response.data.accessToken);
            navigate('/');
        } catch (error) {
            console.error('Signup failed:', error.response?.data?.message || error.message);
            alert('Signup failed: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-dark-800 p-8 rounded-2xl shadow-neon border border-dark-700">
                <h2 className="text-3xl font-bold text-center mb-6 text-primary">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        label="Name"
                        {...register('name', { required: 'Name is required' })}
                        error={errors.name?.message}
                    />
                    <Input
                        label="Email"
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        error={errors.email?.message}
                    />
                    <Input
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 chars' } })}
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
                    <Button type="submit" className="w-full">Create Account</Button>
                </form>
                <p className="mt-4 text-center text-gray-400">
                    Already have an account? <Link to="/login" className="text-accent hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
