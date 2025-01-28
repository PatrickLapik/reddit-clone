import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `flex items-center justify-center rounded-3xl  bg-reddit-orange px-4 py-2 font-bold text-white transition duration-150 ease-in-out hover:bg-reddit-orange-hover focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
