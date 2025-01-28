import { PropsWithChildren } from 'react';

interface NavButtonProps extends PropsWithChildren {
    className?: string;
    onClick?: () => void;
}

export default function NavButton({
    children,
    className,
    ...props
}: NavButtonProps) {
    return (
        <button
            {...props}
            className={`hover:bg-reddit-dark-secondary cursor-pointer flex px-4 py-1 m-1 items-center justify-center rounded-full text-white ${className}`}
        >
            {children}
        </button>
    );
}
