import Navbar from '@/Components/Navbar';
import SideBar from '@/Components/SideBar';
import { PropsWithChildren, ReactNode } from 'react';

export default function DefaultLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    return (
            <div className="bg-reddit-dark min-h-screen">
                <Navbar />
                <main className="flex h-full w-full flex-row">
                    <SideBar />
                    <div className="h-full w-full flex-col p-4">
                        {header && header}
                        {children}
                    </div>
                </main>
            </div>
    );
}
