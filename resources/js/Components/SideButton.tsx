import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function SideButton({ children, ...props }: InertiaLinkProps) {
    return (
        <Link
            {...props}
            className="hover:bg-reddit-dark-secondary flex flex-row space-x-4 px-4 py-2.5 rounded-xl"
        >
            {children}
        </Link>
    );
}
