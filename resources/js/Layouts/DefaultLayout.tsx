import Navbar from '@/Components/Navbar';
import SideBar from '@/Components/SideBar';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode } from 'react';

export default function DefaultLayout({
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    return (
        <div className="bg-reddit-dark min-h-screen">
            <Navbar user={user} />
            <main className="flex h-full w-full flex-row">
                <SideBar />
                <div className="h-full w-full">{children}</div>
            </main>
        </div>
    );
}
