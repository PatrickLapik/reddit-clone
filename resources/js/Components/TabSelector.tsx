import { Link } from '@inertiajs/react';
import { ReactNode, useState } from 'react';

export interface TabHref {
    label: string;
    route: string;
}

export interface TabSelectorHrefProps {
    tabs: TabHref[];
}

export interface TabSpa {
    label: string;
    key: string;
}

export interface TabSelectorSpaProps {
    tabs: TabSpa[];
    children?: { [key: string]: ReactNode };
}

export function TabSelectorHref({ tabs }: TabSelectorHrefProps) {
    const currentRoute = window.location.href;
    return (
        <div className="flex space-x-4">
            {tabs.map((tab) => (
                <Link
                    key={tab.route}
                    href={route(tab.route)}
                    className={`px-4 py-2 hover:border-b-2 hover:border-gray-500 hover:text-gray-300 ${currentRoute === route(tab.route) ? 'text-white not-hover:border-b-2 hover:border-white hover:text-white' : 'text-gray-500'}`}
                >
                    {tab.label}
                </Link>
            ))}
        </div>
    );
}

export function TabSelectorSpa({ tabs, children }: TabSelectorSpaProps) {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');

    const [activeTab, setActiveTab] = useState(key || 'text');

    return (
        <>
        <div className="flex space-x-4">
            {tabs.map((tab) => (
                <button
                    type="button"
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2 hover:border-b-2 hover:border-gray-500 hover:text-gray-300 ${activeTab === tab.key ? 'text-white not-hover:border-b-2 hover:border-white hover:text-white' : 'text-gray-500'}`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
        <div>
            <div>{children?.[activeTab] || 'ehmpty'}</div>
        </div>
        </>
    );
}
