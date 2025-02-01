import Break from '@/Components/Break';
import CommunityBanner from '@/Components/CommunityBanner';
import CommunityDescription from '@/Components/CommunityDescription';
import PostCard from '@/Components/PostCard';
import { CommunityProvider } from '@/Contexts/CommunityContext';
import type { UserProps } from '@/Contexts/UserContext';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { usePage } from '@inertiajs/react';

export default function Community() {
    const { posts } = usePage<UserProps>().props;
    return (
        <DefaultLayout>
            <CommunityProvider>
                <CommunityBanner />
                <div className="flex w-full flex-row space-x-2">
                    <div className="w-full">
                        {posts?.map((post) => (
                            <>
                                <PostCard
                                    post={post}
                                    author={post.user}
                                    href={route('post.show', {
                                        name: post.user.name,
                                        post: post.id,
                                    })}
                                />
                                <Break />
                            </>
                        ))}
                    </div>
                    <CommunityDescription />
                </div>
            </CommunityProvider>
        </DefaultLayout>
    );
}
