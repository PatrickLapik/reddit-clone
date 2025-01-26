import { PropsWithChildren } from 'react';

export default function SettingsSection({
    sectionTitle,
    children,
    ...props
}: PropsWithChildren<{ sectionTitle: string }>) {
    return (
        <div {...props} className="space-y-2">
            <h3 className="h-10 text-2xl leading-tight font-semibold">
                {sectionTitle}
            </h3>
            {children}
        </div>
    );
}
