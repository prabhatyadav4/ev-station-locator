import { twMerge } from 'tailwind-merge';

const Button = ({ children, variant = 'primary', className, ...props }) => {
    const baseStyles = 'px-4 py-2 font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary text-black hover:shadow-neon',
        secondary: 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20',
        accent: 'bg-accent text-white hover:shadow-neon-blue',
        outline: 'border-2 border-primary text-primary hover:bg-primary/10',
        ghost: 'text-gray-400 hover:text-white',
    };

    return (
        <button
            className={twMerge(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
