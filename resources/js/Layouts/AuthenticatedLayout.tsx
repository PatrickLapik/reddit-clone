import ApplicationLogo from '@/Components/ApplicationLogo';
import SearchBar from '@/Components/SearchBar';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="bg-reddit-dark min-h-screen">
            <nav className="border-reddit-border bg-reddit-dark border-b px-4 py-1.5">
                <div className="flex flex-row items-center justify-between">
                    <Link href="/">
                        <ApplicationLogo />
                    </Link>
                    <SearchBar/>
                    <div/>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
