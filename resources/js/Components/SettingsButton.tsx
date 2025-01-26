import { useState } from 'react';

export default function SettingsButton({
    title,
    value,
    ...props
}: {
    title: string;
    value: string;
} & React.HTMLAttributes<HTMLDivElement>) {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            {...props}
            className="flex w-full cursor-pointer flex-row justify-between text-gray-300 items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <p>{title}</p>
            <div className="flex flex-row items-center justify-center space-x-4">
                <p>{value}</p>
                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${isHovered ? 'bg-reddit-dark-secondary' : ''}`}
                >
                    <svg
                        fill="currentColor"
                        height="20"
                        icon-name="caret-right-outline"
                        viewBox="0 0 20 20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="m7.942 15.442-.884-.884L11.616 10 7.058 5.442l.884-.884 5 5a.624.624 0 0 1 0 .884l-5 5Z"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}
