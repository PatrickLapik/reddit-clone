import CommunityCreateFormModal from '@/Pages/Community/CommunityCreateFormModal';
import { User } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from './ApplicationLogo';
import NavbarDropdown from './NavbarDropdown';
import SearchBar from './SearchBar';

export default function Navbar() {
    const user = usePage().props.auth.user as User & { avatar?: string };
    return (
        <nav className="border-reddit-border bg-reddit-dark sticky top-0 z-40 border-b px-4 py-1.5">
            <div className="flex flex-row items-center justify-between">
                <ApplicationLogo />
                <SearchBar />
                {user ? loggedIn(user) : guest()}
            </div>
        </nav>
    );
}

function loggedIn(user: User & { avatar?: string }) {
    return (
        <div className="flex flex-row space-x-2">
            <NavbarDropdown user={user} />
        </div>
    );
}

function guest() {
    return (
        <div className="flex flex-row space-x-2">
            <Link
                href={route('login')}
                className="bg-reddit-orange hover:bg-reddit-orange-hover m-1 flex items-center justify-center rounded-full px-4 py-1 text-white"
            >
                <div className="flex h-10 items-center justify-center">
                    <p className="text-center font-bold tracking-wide">
                        Log In
                    </p>
                </div>
            </Link>
        </div>
    );
}
