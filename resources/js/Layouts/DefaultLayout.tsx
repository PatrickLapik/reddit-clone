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
                <div className="mt-16 h-full w-full ml-72 flex-col p-4">
                    <div className="flex flex-col items-center justify-center w-full">
                        <div className="flex h-full w-[1120px] flex-col px-4">
                            {header && styledHeader(header)}
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

const styledHeader = (header: any) => {
    return <div className="py-4 text-2xl font-semibold">{header}</div>;
};
