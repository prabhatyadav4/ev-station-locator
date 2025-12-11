import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Input = forwardRef(({ label, error, className, ...props }, ref) => {
    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>}
            <div className="relative">
                <input
                    ref={ref}
                    className={twMerge(
                        'w-full bg-dark-700 border border-dark-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors',
                        error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                        props.endIcon && 'pr-10',
                        className
                    )}
                    {...props}
                />
                {props.endIcon && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {props.endIcon}
                    </div>
                )}
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
