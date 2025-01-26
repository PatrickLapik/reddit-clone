import TabSelector from '@/Components/TabSelector';
import { Head } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import DefaultLayout from './DefaultLayout';

const tab = [
    { label: 'Account', route: 'settings.account' },
    { label: 'Profile', route: 'settings.profile' },
];

export default function SettingsLayout({
    title,
    children,
    ...props
}: PropsWithChildren<{ title: string }>) {
    return (
        <DefaultLayout
            header={
                <h2 className="mx-auto w-[1120px] text-4xl leading-tight font-semibold">
                    Settings
                </h2>
            }
        >
            <Head title={'Settings - ' + title} />

            <div {...props} className="py-4">
                <div className="mx-auto w-[1120px] space-y-4">
                    <TabSelector tabs={tab} />
                    {children}
                </div>
            </div>
        </DefaultLayout>
    );
}
