import { Link } from '@inertiajs/react';

export default function ApplicationLogo() {
    return (
        <Link href="/">
            <div className="flex flex-row items-center">
                <img className="mr-2 w-40" src="/shiddit.svg" alt="logo" />
            </div>
        </Link>
    );
}
