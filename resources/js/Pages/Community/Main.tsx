import CommunityBanner from '@/Components/CommunityBanner';
import CommunityDescription from '@/Components/CommunityDescription';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { Head, usePage } from '@inertiajs/react';

interface Community {
    id: number;
    name: string;
    description: string;
    icon: string;
    banner: string;
}

interface PageProps extends InertiaPageProps {
    community: Community[];
}

export default function Community() {
    const { props } = usePage<PageProps>();
    console.log(props)
    const community: Community = props.community[0];

    return (
        <DefaultLayout>
            <Head title={`r/${community.name}`} />

            <div className="flex flex-col items-center justify-center">
                <div className="flex h-screen w-[1120px] flex-col px-4">
                    <CommunityBanner name={community.name} icon={community.icon} banner={community.banner} />
                    <div className="flex w-full flex-row">
                        <div className='w-full'></div>
                        <CommunityDescription title={community}/>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
