import { useCommunity } from '@/Contexts/CommunityContext';
import { UserProps } from '@/Contexts/UserContext';
import { Head, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from './PrimaryButton';

export default function CommunityBanner() {
    const { community } = useCommunity();
    const isJoined = usePage<UserProps>().props.isJoined;

    const { post, setData } = useForm({
        community_id: community.id,
    });

    const handleJoin = () => {
        setData('community_id', community.id);
        post(route('community.join'));
    };
    return (
        <>
            <Head title={`s/${community.name}`} />
            <div className="relative mb-12 flex w-full flex-col">
                <img
                    className="h-44 min-w-full rounded-xl object-cover"
                    src={community.banner}
                />
                <img
                    className="border-reddit-dark absolute top-32 left-10 h-28 w-28 rounded-full border-5"
                    src={community.icon}
                />
                <h1 className="absolute top-48 left-40 text-4xl font-bold">
                    s/{community.name}
                </h1>
                <div className="mt-6 flex justify-end">
                    <PrimaryButton onClick={handleJoin} disabled={isJoined}>
                        Join
                    </PrimaryButton>
                </div>
            </div>
        </>
    );
}
