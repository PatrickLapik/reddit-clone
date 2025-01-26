import { Link } from '@inertiajs/react';
import React from 'react';

interface Tab {
    label: string;
    route: string;
}

interface TabSelectorProps {
    tabs: Tab[];
}

const TabSelector: React.FC<TabSelectorProps> = ({ tabs }) => {
    const currentRoute = window.location.href;
    return (
        <div className="flex space-x-4">
            {tabs.map((tab) => (
                <Link
                    key={tab.route}
                    href={route(tab.route)}
                    className={`px-4 py-2 hover:border-b-2 hover:border-gray-500 hover:text-gray-300 ${currentRoute === route(tab.route) ? 'not-hover:border-b-2 text-white hover:border-white hover:text-white' : 'text-gray-500'}`}
                >
                    {tab.label}
                </Link>
            ))}
        </div>
    );
};

export default TabSelector;
