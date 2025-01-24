import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavButton({
    children,
    className,
    ...props
}: InertiaLinkProps) {
    return (
        <Link
            {...props}
            className={`hover:bg-reddit-dark-secondary flex p-2 items-center justify-center rounded-full text-white ${className}`}
        >
            {children}
        </Link>
    );
}
